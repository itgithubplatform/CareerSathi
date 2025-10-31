"use client";
import { Loader2, X } from "lucide-react";
import React, { useEffect } from "react";
import RenderMarkdown from "../ui/RenderMarkdown"; // Assuming this component exists

export default function ProjectORSkillInfo({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  const [info, setInfo] = React.useState<null | string>(null);
  const [error, setError] = React.useState<null | string>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (text) {
      fetchInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/roadmap/info`, {
        method: "POST",
        body: JSON.stringify({
          text: text,
        }),
      });
      if (!res.ok) {
        setError("Failed to fetch info.");
      }
      const data = await res.json();
      setInfo(data.text);
    } catch (error) {
      setError("Something went wrong while fetching info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black/30 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl h-[83vh] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
    
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black p-1 rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl md:text-2xl font-semibold text-blue-700 p-6 pb-4">
          Explanation & Learning Guide
        </h2>
        <div className="flex-1 overflow-y-auto px-8 py-6 pt-0">
          {loading && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <Loader2
                className="w-12 h-12 text-blue-600 animate-spin mb-4"
                aria-label="Loading"
              />
              <p className="text-lg font-semibold text-center text-gray-700">
                Crafting your personalized insights with AI...
              </p>
              <p className="text-sm text-gray-500 text-center mt-1">
                This might take a moment.
              </p>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-lg font-semibold text-center mt-10">
              {error}
            </div>
          )}
          {info && !loading && !error && (
            <RenderMarkdown>{info}</RenderMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}