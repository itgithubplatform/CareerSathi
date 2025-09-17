import { Filter, Search } from 'lucide-react'
import React from 'react'
import { 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  Select, 
  SelectValue 
} from '../ui/select'
import { Input } from '../ui/input'
import { motion } from 'framer-motion'
import { Card } from '../ui/card'

export default function RoadmapSearchAndFilter({ 
  searchQuery, 
  setSearchQuery, 
  sortBy, 
  setSortBy 
}: {
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  sortBy: "newest" | "oldest" | "name",
  setSortBy: React.Dispatch<React.SetStateAction<"newest" | "oldest" | "name">>
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-4 shadow-none mb-6 bg-transparent border-none backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search roadmaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl bg-white "
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <Filter className="text-gray-400" size={18} />
            <Select value={sortBy} onValueChange={(value: "newest" | "oldest" | "name") => setSortBy(value)}>
              <SelectTrigger className="w-[140px] rounded-xl">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}