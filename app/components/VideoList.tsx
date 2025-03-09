"use client";
import { useState, useEffect } from "react";
import { Video } from "../types/video";
import Image from "next/image";

interface VideoListProps {
  onVideoSelect: (videoUrl: string) => void;
}

const VideoList = ({ onVideoSelect }: VideoListProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="p-4">Loading videos...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Available Videos</h2>
      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="p-3 border rounded-md bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onVideoSelect(video.src)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-20 h-12 relative">
                {video.thumbnail && (
                  <Image
                    fill
                    src={video.thumbnail}
                    alt={video.title}
                    className="object-cover rounded"
                  />
                )}
              </div>
              <div>
                <h3 className="font-medium">{video.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {video.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
