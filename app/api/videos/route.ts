import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Video {
  id: string;
  title: string;
  src: string;
  thumbnail?: string;
  description?: string;
}

// This is a simple mock of video data
// In a real application, you would fetch this from a database
const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    description: 'Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself.'
  },
  {
    id: '2',
    title: 'Elephant Dream',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    description: 'The first Blender Open Movie from 2006.'
  },
  {
    id: '3',
    title: 'Sintel',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    description: 'Third Blender Open Movie.'
  }
];

// Function to get uploaded videos from the public/uploads directory
function getUploadedVideos(): Video[] {
  const uploadsDir = path.join(process.cwd(), 'public/uploads');
  
  // Check if the directory exists
  if (!fs.existsSync(uploadsDir)) {
    return [];
  }

  try {
    // Get all files in the uploads directory
    const files = fs.readdirSync(uploadsDir);
    
    // Filter for video files and map to the Video interface
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        // Common video extensions
        return ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'].includes(ext);
      })
      .map((file, index) => {
        return {
          id: `uploaded-${index + 1}`,
          title: file.replace(/\.[^/.]+$/, ''), // Remove file extension
          src: `/uploads/${file}`,
          description: `Uploaded video: ${file}`
        };
      });
  } catch (error) {
    console.error('Error reading uploads directory:', error);
    return [];
  }
}

export async function GET() {
  // Combine sample videos with uploaded videos
  const uploadedVideos = getUploadedVideos();
  const allVideos = [...sampleVideos, ...uploadedVideos];
  
  return NextResponse.json(allVideos);
}
