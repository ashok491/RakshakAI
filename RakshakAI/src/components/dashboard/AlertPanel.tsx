import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react';
import type { AlertData } from '../../types';

interface AlertPanelProps {
  alerts: AlertData[];
  onAcknowledge: (id: string) => void;
  onResolve: (id: string) => void;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onAcknowledge, onResolve }) => {
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };
  
  const getSeverityColor = (severity: AlertData['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusColor = (status: AlertData['status']) => {
    switch (status) {
      case 'new': return 'bg-red-500';
      case 'acknowledged': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const handleSelectAlert = (alert: AlertData) => {
    setSelectedAlert(alert);
  };

  return (
    <div className="bg-[#1A1A1A] rounded-lg h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center">
        <AlertTriangle className="h-5 w-5 text-[#D13438] mr-2" />
        <h2 className="text-white font-medium">Alert Management</h2>
        <div className="ml-auto flex space-x-2">
          <span className="text-xs px-2 py-1 rounded-full bg-red-900/50 text-red-400">
            {alerts.filter(a => a.status === 'new').length} New
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-yellow-900/50 text-yellow-400">
            {alerts.filter(a => a.status === 'acknowledged').length} Active
          </span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Alert list */}
        <div className="md:w-1/2 overflow-y-auto border-r border-gray-800">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className={`p-3 border-b border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-colors ${
                selectedAlert?.id === alert.id ? 'bg-gray-800/50' : ''
              }`}
              onClick={() => handleSelectAlert(alert)}
            >
              <div className="flex items-center mb-1">
                <span className={`h-2 w-2 rounded-full ${getSeverityColor(alert.severity)} mr-2`}></span>
                <h3 className="text-white text-sm font-medium flex-1 truncate">{alert.description}</h3>
                <span className="text-gray-400 text-xs">{formatTime(alert.timestamp)}</span>
              </div>
              
              <div className="flex items-center text-xs text-gray-400">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{alert.location}</span>
                <span className={`ml-auto px-1.5 py-0.5 rounded-full text-white text-[10px] ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </div>
            </div>
          ))}
          
          {alerts.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <p>No alerts to display</p>
            </div>
          )}
        </div>
        
        {/* Alert details */}
        <div className="md:w-1/2 p-4 bg-[#232323] overflow-y-auto">
          {selectedAlert ? (
            <div>
              <div className="flex items-center mb-4">
                <span className={`h-3 w-3 rounded-full ${getSeverityColor(selectedAlert.severity)} mr-2`}></span>
                <h3 className="text-white font-medium">{selectedAlert.description}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#1A1A1A] p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <h4 className="text-gray-300 text-sm">Timeline</h4>
                  </div>
                  <p className="text-gray-400 text-xs">
                    Detected at {selectedAlert.timestamp.toLocaleString('en-IN')}
                  </p>
                </div>
                
                <div className="bg-[#1A1A1A] p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <h4 className="text-gray-300 text-sm">Location</h4>
                  </div>
                  <p className="text-gray-400 text-xs">{selectedAlert.location}</p>
                  <div className="mt-2 bg-gray-800 h-40 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Map Placeholder</span>
                  </div>
                </div>
                
                <div className="bg-[#1A1A1A] p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-4 w-4 text-gray-400 mr-2" />
                    <h4 className="text-gray-300 text-sm">Severity Level</h4>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded text-xs text-white ${getSeverityColor(selectedAlert.severity)}`}>
                      {selectedAlert.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {selectedAlert.status === 'new' && (
                    <button 
                      onClick={() => onAcknowledge(selectedAlert.id)}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                  
                  {selectedAlert.status !== 'resolved' && (
                    <button 
                      onClick={() => onResolve(selectedAlert.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Select an alert to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertPanel;