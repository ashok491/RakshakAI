import React, { useState, useEffect } from 'react';
import { Map, Locate, Layers } from 'lucide-react';
import type { MapMarker } from '../../types';

interface ThreatMapProps {
  markers?: MapMarker[];
}

const ThreatMap: React.FC<ThreatMapProps> = ({ markers = [] }) => {
  const [mapType, setMapType] = useState<'satellite' | 'terrain' | 'hybrid'>('satellite');
  const [showLabels, setShowLabels] = useState(true);
  
  const getMarkerColor = (type: MapMarker['type']) => {
    switch (type) {
      case 'alert': return '#D13438';
      case 'camera': return '#0078D7';
      case 'drone': return '#4D5D53';
      case 'personnel': return '#FFB900';
      default: return '#FFFFFF';
    }
  };

  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden h-full flex flex-col">
      <div className="p-3 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center">
          <Map className="h-5 w-5 text-[#0078D7] mr-2" />
          <h2 className="text-white font-medium">Threat Intelligence Map</h2>
        </div>
        <div className="flex space-x-2">
          <div className="flex bg-gray-800 rounded-md overflow-hidden">
            <button 
              onClick={() => setMapType('satellite')}
              className={`px-2 py-1 text-xs ${mapType === 'satellite' ? 'bg-[#0078D7] text-white' : 'text-gray-400'}`}
            >
              Satellite
            </button>
            <button 
              onClick={() => setMapType('terrain')}
              className={`px-2 py-1 text-xs ${mapType === 'terrain' ? 'bg-[#0078D7] text-white' : 'text-gray-400'}`}
            >
              Terrain
            </button>
            <button 
              onClick={() => setMapType('hybrid')}
              className={`px-2 py-1 text-xs ${mapType === 'hybrid' ? 'bg-[#0078D7] text-white' : 'text-gray-400'}`}
            >
              Hybrid
            </button>
          </div>
          <button 
            onClick={() => setShowLabels(!showLabels)}
            className={`p-1 rounded-md ${showLabels ? 'bg-[#0078D7]' : 'bg-gray-800'}`}
          >
            <Layers className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        {/* Map placeholder - in a real app, this would be an actual map component */}
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg)`,
            filter: mapType === 'terrain' ? 'sepia(0.3)' : mapType === 'hybrid' ? 'contrast(1.1)' : 'none'
          }}
        >
          {/* Render markers */}
          {markers.map((marker) => (
            <div 
              key={marker.id}
              className="absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{ 
                left: `${marker.coordinates[0] * 100}%`, 
                top: `${marker.coordinates[1] * 100}%`,
                animationDuration: marker.type === 'alert' ? '1s' : '2s'
              }}
            >
              <div 
                className="h-full w-full rounded-full"
                style={{ 
                  backgroundColor: `${getMarkerColor(marker.type)}`,
                  boxShadow: `0 0 0 2px #1A1A1A, 0 0 0 4px ${getMarkerColor(marker.type)}80`
                }}
              ></div>
              
              {showLabels && marker.label && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/80 px-2 py-0.5 rounded text-white text-xs whitespace-nowrap">
                  {marker.label}
                </div>
              )}
            </div>
          ))}
          
          {/* Heat overlay for high activity areas */}
          <div 
            className="absolute inset-0 bg-gradient-radial from-red-500/20 to-transparent"
            style={{ 
              left: '30%', 
              top: '40%', 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              opacity: 0.7 
            }}
          ></div>
          
          <div 
            className="absolute inset-0 bg-gradient-radial from-yellow-500/20 to-transparent"
            style={{ 
              left: '70%', 
              top: '30%', 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              opacity: 0.5 
            }}
          ></div>
        </div>
        
        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="bg-[#1A1A1A] p-2 rounded-full shadow-lg">
            <Locate className="h-5 w-5 text-white" />
          </button>
          <button className="bg-[#1A1A1A] text-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-xl font-bold">
            +
          </button>
          <button className="bg-[#1A1A1A] text-white w-8 h-8 rounded-full shadow-lg flex items-center justify-center text-xl font-bold">
            -
          </button>
        </div>
        
        {/* Map legend */}
        <div className="absolute bottom-4 left-4 bg-[#1A1A1A]/90 p-2 rounded-md">
          <h4 className="text-white text-xs mb-1">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-[#D13438] mr-2"></span>
              <span className="text-white text-xs">Alert</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-[#0078D7] mr-2"></span>
              <span className="text-white text-xs">Camera</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-[#4D5D53] mr-2"></span>
              <span className="text-white text-xs">Drone</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-[#FFB900] mr-2"></span>
              <span className="text-white text-xs">Personnel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;