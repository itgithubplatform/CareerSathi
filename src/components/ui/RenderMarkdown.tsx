"use client"
import React from 'react'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link';

export default function RenderMarkdown({children}: {children: string}) {
  return (
    <ReactMarkdown components={{
                        p: ({ children }) => <p className="mb-3 text-gray-800 leading-6">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc ml-5 mb-3 text-gray-800">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal ml-5 mb-3 text-gray-800">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        h1: ({ children }) => <h1 className="text-2xl font-bold mt-2 mb-4 text-gray-900">{children}</h1>,
                        h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-base font-semibold mt-3 mb-1 text-gray-900">{children}</h4>,
                        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        a: ({ children, href }) => {
                          if (!href) return <span>{children}</span>;

                          const isExternal = href.startsWith("http");

                          if (isExternal) {
                            return (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {children}
                              </a>
                            );
                          }

                          return (
                            <Link href={href} className="text-blue-600 hover:underline">
                              {children}
                            </Link>
                          );
                        }
                      }} remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
  )
}
