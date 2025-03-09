/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { formatTime } from '@/app/lib/utils'
import { useState } from 'react'
import {
    FaCompress,
    FaExpand,
    FaPause,
    FaPlay,
    FaVolumeMute,
    FaVolumeUp
} from 'react-icons/fa'
interface ControlsProps {
  isPlaying: boolean
  volume: number
  isMuted: boolean
  currentTime: number
  duration: number
  playbackRate: number
  onPlayPause: () => void
  onVolumeChange: (volume: number) => void
  onSeek: (time: number) => void
  onPlaybackRateChange: (rate: number) => void
  onToggleFullscreen: () => void
  isFullscreen: boolean
}

export default function Controls({
  isPlaying,
  volume,
  isMuted,
  currentTime,
  duration,
  playbackRate,
  onPlayPause,
  onVolumeChange,
  onSeek,
  onPlaybackRateChange,
  onToggleFullscreen,
  isFullscreen,
}: ControlsProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2]

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Timeline */}
      <div className="relative h-2 mb-4 bg-gray-700 rounded-full cursor-pointer">
        <div 
          className="absolute h-full bg-red-600 rounded-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onPlayPause}
            className="text-white hover:text-gray-300 transition-colors"
          >
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>

          <div className="flex items-center gap-2 text-white">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => onVolumeChange(isMuted ? 0.5 : 0)}
              className="text-white hover:text-gray-300"
            >
              {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="px-2 py-1 text-white bg-black/50 rounded hover:bg-black/70"
            >
              {playbackRate}x
            </button>
            {showSpeedMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-black/80 rounded overflow-hidden">
                {speedOptions.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      onPlaybackRateChange(speed)
                      setShowSpeedMenu(false)
                    }}
                    className="block w-full px-4 py-2 text-white hover:bg-white/10"
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onToggleFullscreen}
            className="text-white hover:text-gray-300"
          >
            {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}