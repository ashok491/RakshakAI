export interface AlertData {
  id: string;
  timestamp: Date;
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  description: string;
  status: 'new' | 'acknowledged' | 'resolved';
  coordinates: [number, number];
}

export interface FeedData {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  type: 'cctv' | 'drone' | 'thermal';
  detections: Detection[];
}

export interface Detection {
  id: string;
  type: 'person' | 'vehicle' | 'weapon' | 'intrusion';
  confidence: number;
  boundingBox: [number, number, number, number]; // [x, y, width, height]
  timestamp: Date;
}

export interface MapMarker {
  id: string;
  coordinates: [number, number];
  type: 'alert' | 'camera' | 'drone' | 'personnel';
  status?: 'active' | 'inactive';
  label?: string;
}

export interface AnalyticsData {
  detections: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  incidents: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  threats: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  recognitionAccuracy: number;
}