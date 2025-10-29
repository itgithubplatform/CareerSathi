import { v4 as uuidv4 } from 'uuid';

// Define a type for the search result structure, since we no longer have SDK types
export type QdrantSearchResult = {
    id: string | number;
    score: number;
    payload: {
        user_id: string;
        chat_id: string;
        text_content: string;
        timestamp: string;
        [key: string]: any;
    };
    vector?: number[];
}[];

export class VectorDb {
    private static instance: VectorDb;
    private baseUrl: string;
    private collectionName: string;
    private headers: Headers;

    private constructor() {
        const qdrantUrl = process.env.QDRANT_URL;
        this.collectionName = process.env.QDRANT_COLLECTION_NAME!;
        const qdrantApiKey = process.env.QDRANT_API_KEY;

        if (!qdrantUrl || !this.collectionName) {
            throw new Error(
                'QDRANT_URL and QDRANT_COLLECTION_NAME must be defined in .env'
            );
        }

        // Base URL for the REST API endpoint (e.g., 'http://localhost:6333')
        this.baseUrl = `${qdrantUrl}/collections/${this.collectionName}/points`;

        // Configure headers for all requests
        this.headers = new Headers({
            'Content-Type': 'application/json',
            // Add API Key header if it exists
            ...(qdrantApiKey && { 'api-key': qdrantApiKey }),
        });
        
        console.log(`VectorDb client configured for REST calls to: ${this.baseUrl}`);
    }

    public static getInstance(): VectorDb {
        if (!VectorDb.instance) {
            VectorDb.instance = new VectorDb();
        }
        return VectorDb.instance;
    }

    // --- Save/Upsert Data (POST /collections/{collection_name}/points/upsert) ---
    async saveToVectorDb(
        userId: string,
        vector: number[],
        text: string,
        chatId: string
    ): Promise<void> {
        const id = uuidv4();
        
        const upsertBody = {
            points: [{
                id: id,
                vector: vector,
                payload: {
                    user_id: userId,
                    chat_id: chatId,
                    text_content: text,
                    timestamp: new Date().toISOString(),
                },
            }],
            wait: true // Wait for the operation to complete
        };

        try {
            
            const response = await fetch(`${this.baseUrl}`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(upsertBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`REST API Error: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Error upserting vector to Qdrant via REST:', error);
            throw new Error('Failed to save vector data. (Does the collection exist?)');
        }
    }

    // --- Search Data (POST /collections/{collection_name}/points/search) ---
    async getFromVectorDb(
        userId: string,
        queryVector: number[],
        chatId: string,
        topK: number = 5
    ): Promise<QdrantSearchResult> {        
        
        const searchBody = {
            vector: queryVector,
            limit: topK,
            filter: {
                must: [
                    { key: 'user_id', match: { value: userId } },
                    { key: 'chat_id', match: { value: chatId } },
                ],
            },
            with_payload: true,
        };

        try {
            const response = await fetch(`${this.baseUrl}/search`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(searchBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`REST API Error: ${response.status} - ${errorText}`);
            }

            const jsonResponse = await response.json();
            return jsonResponse.result as QdrantSearchResult;

        } catch (error) {
            console.error('Error querying Qdrant via REST:', error);
            throw new Error('Failed to retrieve vector data. (Does the collection exist?)');
        }
    }
}