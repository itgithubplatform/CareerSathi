"use client"
import { useSearchParams } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import React, { use } from "react"

export default function Pagination({totalPages}: {totalPages: number}) {
  const q = useSearchParams().get("q")
  const currentPage = Number(useSearchParams().get("page") || 1)
  const router = useRouter()
  const getPages = () => {
    const pages: (number | string)[] = []

    pages.push(1)

    if (currentPage > 3) {
      pages.push("...")
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push("...")
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="w-full flex justify-center items-center py-6">
      <div className="flex gap-2">
        <button
          className="px-3 py-1 rounded-lg border bg-white shadow-sm hover:bg-gray-100 disabled:opacity-40"
          disabled={currentPage === 1}
          onClick={() => currentPage>1 && router.push(`/jobs?q=${q}&page=${currentPage-1}`)}
        >
          Prev
        </button>

        {getPages().map((page, idx) =>
          typeof page === "number" ? (
            <button
              key={idx}
              className={`px-3 py-1 rounded-lg border shadow-sm transition ${
                page === currentPage
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => router.push(`/jobs?q=${q}&page=${page}`)}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="px-3 py-1 text-gray-500">
              {page}
            </span>
          )
        )}

        <button
          className="px-3 py-1 rounded-lg border bg-white shadow-sm hover:bg-gray-100 disabled:opacity-40"
          disabled={currentPage === totalPages}
          onClick={()=>currentPage<totalPages && router.push(`/jobs?q=${q}&page=${currentPage+1}`)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
