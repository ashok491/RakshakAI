import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, PlayCircle, AlertCircle } from 'lucide-react';
import type { Detection } from '../../types';

interface VideoFeedProps {
  id: string;
  name: string;
  location: string;
  type: 'cctv' | 'drone' | 'thermal';
}

const VideoFeed: React.FC<VideoFeedProps> = ({ id, name, location, type }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Simulate random detections
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newDetection: Detection = {
          id: Math.random().toString(36).substring(2, 9),
          type: ['person', 'vehicle', 'weapon', 'intrusion'][Math.floor(Math.random() * 4)] as Detection['type'],
          confidence: Math.random() * 0.5 + 0.5, // 50-100% confidence
          boundingBox: [
            Math.random() * 0.6 + 0.2, // x between 20-80%
            Math.random() * 0.6 + 0.2, // y between 20-80%
            Math.random() * 0.3 + 0.1, // width between 10-40%
            Math.random() * 0.3 + 0.1, // height between 10-40%
          ],
          timestamp: new Date(),
        };
        
        setDetections(prev => [...prev.slice(-4), newDetection]);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Determines the feed source based on type and id
  const getFeedSource = () => {
    // In a real app, these would be actual video feeds
    const sources = {
      cctv: [
        'https://images.pexels.com/photos/1557547/pexels-photo-1557547.jpeg',
        'https://images.pexels.com/photos/1108822/pexels-photo-1108822.jpeg',
      ],
      drone: [
        'https://images.pexels.com/photos/37403/bora-bora-french-polynesia-sunset-ocean.jpg',
        'https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg',
      ],
      thermal: [
        'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg',
        'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg',
      ],
    };
    
    const index = parseInt(id.substring(id.length - 1), 10) % 2;
    return sources[type][index];
  };

  return (
    <div className={`bg-[#1A1A1A] rounded-lg overflow-hidden transition-all duration-300 ${
      isExpanded ? 'fixed top-0 left-0 w-full h-full z-50 rounded-none' : 'h-[260px]'
    }`}>
      <div className="p-3 bg-[#1A1A1A] flex justify-between items-center">
        <div>
          <h3 className="text-white font-medium">{name}</h3>
          <p className="text-gray-400 text-xs">{location}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="text-gray-300 hover:text-white"
          >
            <PlayCircle className={`h-5 w-5 ${isPlaying ? 'text-green-500' : 'text-gray-500'}`} />
          </button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-300 hover:text-white"
          >
            {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      <div className="relative h-full">
        {/* Feed display (in a real app, this would be a video stream) */}
        <div className="relative w-full h-[200px] bg-black overflow-hidden">
          <img 
            src={getFeedSource()} 
            alt={`${name} feed`} 
            className="w-full h-full object-cover"
          />
          
          {/* Detection overlays */}
          {detections.map((detection) => (
            <div 
              key={detection.id}
              className={`absolute border-2 ${
                detection.type === 'person' ? 'border-blue-500' : 
                detection.type === 'vehicle' ? 'border-green-500' :
                detection.type === 'weapon' ? 'border-red-500' : 'border-yellow-500'
              }`}
              style={{
                left: `${detection.boundingBox[0] * 100}%`,
                top: `${detection.boundingBox[1] * 100}%`,
                width: `${detection.boundingBox[2] * 100}%`,
                height: `${detection.boundingBox[3] * 100}%`,
              }}
            >
              <div className={`absolute -top-5 left-0 text-xs px-1 py-0.5 ${
                detection.type === 'person' ? 'bg-blue-500' : 
                detection.type === 'vehicle' ? 'bg-green-500' :
                detection.type === 'weapon' ? 'bg-red-500' : 'bg-yellow-500'
              } text-white`}>
                {detection.type.charAt(0).toUpperCase() + detection.type.slice(1)} {(detection.confidence * 100).toFixed(0)}%
              </div>
            </div>
          ))}
          
          {/* Status indicator */}
          <div className="absolute bottom-2 right-2 flex items-center bg-black/70 px-2 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
            <span className="text-white text-xs">Live</span>
          </div>
          
          {/* Feed type indicator */}
          <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
            {type.toUpperCase()}
          </div>
        </div>
        
        {/* Recent detections panel (only visible when expanded) */}
        {isExpanded && detections.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-black/80 p-3 rounded-lg max-w-xs">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-4 w-4 text-[#D13438] mr-2" />
              <h4 className="text-white text-sm font-medium">Recent Detections</h4>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {detections.map((detection) => (
                <div key={detection.id} className="flex items-center text-xs text-white">
                  <span className={`h-2 w-2 rounded-full mr-2 ${
                    detection.type === 'person' ? 'bg-blue-500' : 
                    detection.type === 'vehicle' ? 'bg-green-500' :
                    detection.type === 'weapon' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></span>
                  <span>{detection.type.charAt(0).toUpperCase() + detection.type.slice(1)}</span>
                  <span className="ml-auto">{detection.timestamp.toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoFeed;