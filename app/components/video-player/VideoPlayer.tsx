'use client'
import { useState, useRef, useEffect } from 'react'
import Controls from './Controls'

interface VideoPlayerProps {
  src: string
  poster?: string
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  

  // Video controls functions
  const togglePlay = () => {
    if (!videoRef.current) return
    isPlaying ? videoRef.current.pause() : videoRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const handleVolume = (newVolume: number) => {
    if (!videoRef.current) return
    const volumeValue = Math.min(Math.max(newVolume, 0), 1)
    videoRef.current.volume = volumeValue
    setVolume(volumeValue)
    setIsMuted(volumeValue === 0)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    // effect to change src when src prop changes
    if (videoRef.current) {
      videoRef.current.src = src
      videoRef.current.load()
      setIsPlaying(false)
    }
  },[src])
  return (
    <div 
      ref={containerRef}
      className="w-full relative group bg-black rounded-lg overflow-hidden"
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onLoadedData={() => setDuration(videoRef.current?.duration || 0)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      <Controls
        isPlaying={isPlaying}
        volume={volume}
        isMuted={isMuted}
        currentTime={currentTime}
        duration={duration}
        playbackRate={playbackRate}
        onPlayPause={togglePlay}
        onVolumeChange={handleVolume}
        onSeek={(time) => {
          if (videoRef.current) videoRef.current.currentTime = time
        }}
        onPlaybackRateChange={(rate) => {
          if (videoRef.current) videoRef.current.playbackRate = rate
          setPlaybackRate(rate)
        }}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
    </div>
  )
}