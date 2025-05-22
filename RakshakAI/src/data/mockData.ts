import { AlertData, FeedData, MapMarker, AnalyticsData } from '../types';

// Mock alerts data
export const mockAlerts: AlertData[] = [
  {
    id: 'alert-001',
    timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    severity: 'critical',
    location: 'North Perimeter, Sector 7',
    description: 'Unauthorized vehicle detected approaching checkpoint',
    status: 'new',
    coordinates: [0.25, 0.35],
  },
  {
    id: 'alert-002',
    timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
    severity: 'high',
    location: 'Eastern Boundary, Outpost B',
    description: 'Multiple thermal signatures detected in restricted zone',
    status: 'acknowledged',
    coordinates: [0.75, 0.25],
  },
  {
    id: 'alert-003',
    timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
    severity: 'medium',
    location: 'Southern Approach, Watchtower 3',
    description: 'Drone detected outside authorized flight path',
    status: 'new',
    coordinates: [0.65, 0.85],
  },
  {
    id: 'alert-004',
    timestamp: new Date(Date.now() - 3 * 60 * 60000), // 3 hours ago
    severity: 'low',
    location: 'Western Gate, Main Entrance',
    description: 'Tailgating attempt at personnel entry point',
    status: 'resolved',
    coordinates: [0.15, 0.65],
  },
  {
    id: 'alert-005',
    timestamp: new Date(Date.now() - 4 * 60 * 60000), // 4 hours ago
    severity: 'high',
    location: 'Command Center, Server Room Access',
    description: 'Repeated failed access attempts with invalid credentials',
    status: 'acknowledged',
    coordinates: [0.45, 0.45],
  },
];

// Mock video feeds data
export const mockFeeds: FeedData[] = [
  {
    id: 'feed-001',
    name: 'North Perimeter Camera',
    location: 'Sector 7, Checkpoint Alpha',
    status: 'online',
    type: 'cctv',
    detections: [],
  },
  {
    id: 'feed-002',
    name: 'Eastern Boundary Drone',
    location: 'Patrol Route E-5',
    status: 'online',
    type: 'drone',
    detections: [],
  },
  {
    id: 'feed-003',
    name: 'Southern Approach Thermal',
    location: 'Watchtower 3',
    status: 'online',
    type: 'thermal',
    detections: [],
  },
  {
    id: 'feed-004',
    name: 'Western Gate Camera',
    location: 'Main Entrance',
    status: 'offline',
    type: 'cctv',
    detections: [],
  },
];

// Mock map markers
export const mockMapMarkers: MapMarker[] = [
  {
    id: 'marker-001',
    coordinates: [0.25, 0.35],
    type: 'alert',
    status: 'active',
    label: 'Critical Alert',
  },
  {
    id: 'marker-002',
    coordinates: [0.75, 0.25],
    type: 'alert',
    status: 'active',
    label: 'High Alert',
  },
  {
    id: 'marker-003',
    coordinates: [0.32, 0.18],
    type: 'camera',
    status: 'active',
    label: 'CCTV-North',
  },
  {
    id: 'marker-004',
    coordinates: [0.68, 0.42],
    type: 'camera',
    status: 'active',
    label: 'CCTV-East',
  },
  {
    id: 'marker-005',
    coordinates: [0.55, 0.65],
    type: 'drone',
    status: 'active',
    label: 'Patrol Drone',
  },
  {
    id: 'marker-006',
    coordinates: [0.22, 0.72],
    type: 'personnel',
    status: 'active',
    label: 'Patrol Team A',
  },
  {
    id: 'marker-007',
    coordinates: [0.82, 0.78],
    type: 'personnel',
    status: 'active',
    label: 'Patrol Team B',
  },
];

// Mock analytics data
export const mockAnalytics: AnalyticsData = {
  detections: {
    daily: 127,
    weekly: 843,
    monthly: 3254,
  },
  incidents: {
    daily: 14,
    weekly: 87,
    monthly: 356,
  },
  threats: {
    critical: 5,
    high: 23,
    medium: 48,
    low: 94,
  },
  recognitionAccuracy: 0.94,
};