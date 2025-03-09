'use client'
import { useState } from 'react'

export default function VideoUpload({handleVideoSelect}: {handleVideoSelect: (url: string | null) => void}) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true);
      handleVideoSelect(null);
      const formData = new FormData()
      formData.append('file', file)

      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/api/upload')

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress((event.loaded / event.total) * 100)
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.response)
          handleVideoSelect(response.url)
        }
        setIsUploading(false)
      }

      xhr.send(formData)
    } catch (error) {
      console.error('Upload failed:', error)
      setIsUploading(false)
    }finally{
        e.target.value = '';
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-sm">Select video</span>
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleUpload}
          disabled={isUploading}
        />
      </label>

      {isUploading && (
        <div className="mt-4 h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

    </div>
  )
}