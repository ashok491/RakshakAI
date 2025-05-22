import React, { useState } from 'react';
import VideoFeed from '../components/dashboard/VideoFeed';
import AlertPanel from '../components/dashboard/AlertPanel';
import ThreatMap from '../components/dashboard/ThreatMap';
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
import { mockAlerts, mockFeeds, mockMapMarkers, mockAnalytics } from '../data/mockData';
import { AlertCircle } from 'lucide-react';
import type { AlertData } from '../types';

const Dashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertData[]>(mockAlerts);
  
  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'acknowledged' } : alert
    ));
  };
  
  const handleResolveAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, status: 'resolved' } : alert
    ));
  };
  
  return (
    <section id="dashboard" className="bg-[#232323] min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Command Center</h1>
          <p className="text-gray-400">Real-time surveillance and threat detection dashboard</p>
          
          {/* Status bar */}
          <div className="mt-6 bg-[#1A1A1A] p-3 rounded-lg flex items-center">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
              <span className="text-white text-sm">System Status: Operational</span>
            </div>
            
            <div className="ml-6 flex items-center">
              <span className="text-gray-400 text-sm">Threat Level:</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-600 text-white">Elevated</span>
            </div>
            
            <div className="ml-auto flex items-center">
              <AlertCircle className="h-4 w-4 text-[#D13438] mr-1" />
              <span className="text-[#D13438] text-sm font-medium">
                {alerts.filter(a => a.status === 'new').length} New Alerts
              </span>
            </div>
          </div>
        </div>
        
        {/* Main dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video feeds section - takes up 2 columns */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockFeeds.map(feed => (
              <VideoFeed 
                key={feed.id} 
                id={feed.id}
                name={feed.name} 
                location={feed.location}
                type={feed.type}
              />
            ))}
          </div>
          
          {/* Alert panel section */}
          <div className="lg:col-span-1 h-[542px]">
            <AlertPanel 
              alerts={alerts}
              onAcknowledge={handleAcknowledgeAlert}
              onResolve={handleResolveAlert}
            />
          </div>
          
          {/* Threat map section */}
          <div className="lg:col-span-2 h-[450px]">
            <ThreatMap markers={mockMapMarkers} />
          </div>
          
          {/* Analytics dashboard section */}
          <div className="lg:col-span-1">
            <AnalyticsDashboard data={mockAnalytics} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;