import { VertexAI } from "@google-cloud/vertexai";
import axios from "axios";
import { GoogleAuth } from "google-auth-library";
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";

export async function askVertex(prompt: string): Promise<string> {
  const vertex = new VertexAI({
    project: process.env.GOOGLE_PROJECT_ID!,
    // location: "asia-south1",
    // googleAuthOptions: {
    //   keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // file path
    // },
  });
  
   const careerModel = vertex.getGenerativeModel({
    model: "gemini-2.5-flash",
  });
  const resp = await careerModel.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    tools:[
      {
        // @ts-ignore
        googleSearch: {}
        
      }
    ]
  });
   console.log(resp.response.candidates?.[0]?.content?.parts);   
  return resp.response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

function GCloudStreamToReadableStream(
  stream: AsyncGenerator<any>,
): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await stream.next();

      if (done) {
        controller.close();
        return;
      }

      const textChunk = value.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      if (textChunk) {
        controller.enqueue(encoder.encode(textChunk));
      }
    },
  });
}

let cachedToken: { token: string | null | undefined; expiry: number } = {
  token: null,
  expiry: 0,
};

export async function getValidToken() {
  const now = Date.now();
  if (cachedToken.token && cachedToken.expiry > (now + 5 * 60 * 1000)) {
    return cachedToken.token;
  }
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const client = (await auth.getClient()) as OAuth2Client; 
  const res = await client.getAccessToken();
  
  cachedToken = {
    token: res.token,
    expiry: res.res?.data.expiry_date || 0,
  };
  
  return cachedToken.token;
}

export async function textEmbedding(text: string) {
  const projectId = process.env.GOOGLE_PROJECT_ID!;
  const location = "asia-south1";
  const model = "text-embedding-004";

  const token = await getValidToken();

  const endpoint = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:predict`;

  try {
    const response = await axios.post(
      endpoint,
      { instances: [{ content: text }] },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      }
    );
    const embedding = response.data.predictions[0].embeddings.values as number[];
    return embedding;
  } catch (err: any) {
    console.error("Embedding request failed:", err.response?.data || err.message);
    throw err;
  }
}
