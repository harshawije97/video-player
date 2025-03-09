"use client"
import { useState } from "react";
import VideoUpload from "./components/VideoUpload";
import VideoPlayer from "./components/video-player/VideoPlayer";
import VideoList from "./components/VideoList";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleVideoSelect = (url: string |null) => {
    setVideoUrl(url);
  };

  console.log(videoUrl);
  
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-[30vw_70vw] gap-4`">
        <div className="flex flex-col gap-4 w-full  p-4 ">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Video Player</h1>
          <VideoUpload handleVideoSelect={handleVideoSelect}/>
          <div className="mt-6">
            <VideoList onVideoSelect={handleVideoSelect} />
          </div>
        </div>
        <div className="w-full  p-4 ">
          {videoUrl && (
            <div className="mt-8 w-full">
              <VideoPlayer src={videoUrl} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
