import React from 'react';
import { BarChart, PieChart, Activity, Users, AlertCircle } from 'lucide-react';
import type { AnalyticsData } from '../../types';

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data }) => {
  return (
    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
      <div className="p-3 border-b border-gray-800 flex items-center">
        <Activity className="h-5 w-5 text-[#0078D7] mr-2" />
        <h2 className="text-white font-medium">Surveillance Analytics</h2>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Detection Statistics */}
          <div className="bg-[#232323] p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <BarChart className="h-4 w-4 text-[#0078D7] mr-2" />
              <h3 className="text-white text-sm font-medium">Detection Analytics</h3>
            </div>
            
            <div className="flex justify-between mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{data.detections.daily}</div>
                <div className="text-xs text-gray-400">Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{data.detections.weekly}</div>
                <div className="text-xs text-gray-400">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{data.detections.monthly}</div>
                <div className="text-xs text-gray-400">This Month</div>
              </div>
            </div>
            
            {/* Bar chart visualization */}
            <div className="h-32 flex items-end space-x-2">
              <div className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-600 rounded-t"
                  style={{ height: `${(data.detections.daily / data.detections.monthly) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-1">D</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-600 rounded-t"
                  style={{ height: `${(data.detections.weekly / data.detections.monthly) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-1">W</span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-600 rounded-t"
                  style={{ height: `100%` }}
                ></div>
                <span className="text-xs text-gray-400 mt-1">M</span>
              </div>
            </div>
          </div>
          
          {/* Threat Level Distribution */}
          <div className="bg-[#232323] p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <PieChart className="h-4 w-4 text-[#D13438] mr-2" />
              <h3 className="text-white text-sm font-medium">Threat Distribution</h3>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="w-20 h-20 relative rounded-full overflow-hidden">
                {/* Simplified pie chart visualization */}
                <div 
                  className="absolute bg-red-600"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(2 * Math.PI * data.threats.critical / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}% ${50 - 50 * Math.sin(2 * Math.PI * data.threats.critical / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}%)` 
                  }}
                ></div>
                <div 
                  className="absolute bg-orange-500"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * data.threats.critical / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}% ${50 - 50 * Math.sin(2 * Math.PI * data.threats.critical / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}%, ${50 + 50 * Math.cos(2 * Math.PI * (data.threats.critical + data.threats.high) / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}% ${50 - 50 * Math.sin(2 * Math.PI * (data.threats.critical + data.threats.high) / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}%)` 
                  }}
                ></div>
                <div 
                  className="absolute bg-yellow-500"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * (data.threats.critical + data.threats.high) / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}% ${50 - 50 * Math.sin(2 * Math.PI * (data.threats.critical + data.threats.high) / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}%, ${50 + 50 * Math.cos(2 * Math.PI * (data.threats.critical + data.threats.high + data.threats.medium) / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}% ${50 - 50 * Math.sin(2 * Math.PI * (data.threats.critical + data.threats.high + data.threats.medium) / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}%)` 
                  }}
                ></div>
                <div 
                  className="absolute bg-blue-500"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * (data.threats.critical + data.threats.high + data.threats.medium) / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}% ${50 - 50 * Math.sin(2 * Math.PI * (data.threats.critical + data.threats.high + data.threats.medium) / (data.threats.critical + data.threats.high + data.threats.medium + data.threats.low))}%, 50% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 0%, 50% 0%)` 
                  }}
                ></div>
              </div>
              
              <div className="ml-6 space-y-1">
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-red-600 rounded-sm mr-2"></span>
                  <span className="text-white text-xs">Critical ({data.threats.critical})</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-orange-500 rounded-sm mr-2"></span>
                  <span className="text-white text-xs">High ({data.threats.high})</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-yellow-500 rounded-sm mr-2"></span>
                  <span className="text-white text-xs">Medium ({data.threats.medium})</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-blue-500 rounded-sm mr-2"></span>
                  <span className="text-white text-xs">Low ({data.threats.low})</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recognition Accuracy */}
          <div className="bg-[#232323] p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Users className="h-4 w-4 text-[#4D5D53] mr-2" />
              <h3 className="text-white text-sm font-medium">Recognition Accuracy</h3>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#4a5568"
                    strokeWidth="8"
                  />
                  
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={data.recognitionAccuracy > 0.9 ? "#48bb78" : data.recognitionAccuracy > 0.7 ? "#ecc94b" : "#f56565"}
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45 * data.recognitionAccuracy} ${2 * Math.PI * 45 * (1 - data.recognitionAccuracy)}`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                    transform="rotate(-90, 50, 50)"
                  />
                  
                  {/* Text */}
                  <text
                    x="50"
                    y="50"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    {Math.round(data.recognitionAccuracy * 100)}%
                  </text>
                </svg>
              </div>
              
              <div className="ml-4">
                <p className="text-gray-400 text-xs mb-2">Recognition accuracy has improved by 4% over the last month.</p>
                <div className="flex items-center">
                  <span className={`px-2 py-0.5 rounded text-xs ${data.recognitionAccuracy > 0.9 ? "bg-green-700 text-green-100" : data.recognitionAccuracy > 0.7 ? "bg-yellow-700 text-yellow-100" : "bg-red-700 text-red-100"}`}>
                    {data.recognitionAccuracy > 0.9 ? "Excellent" : data.recognitionAccuracy > 0.7 ? "Good" : "Needs Improvement"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Incident Stats */}
          <div className="bg-[#232323] p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <AlertCircle className="h-4 w-4 text-[#D13438] mr-2" />
              <h3 className="text-white text-sm font-medium">Incident Analytics</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-400">Daily Incidents</span>
                  <span className="text-xs text-white">{data.incidents.daily}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-[#D13438] h-2 rounded-full"
                    style={{ width: `${(data.incidents.daily / data.incidents.monthly) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-400">Weekly Incidents</span>
                  <span className="text-xs text-white">{data.incidents.weekly}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-[#D13438] h-2 rounded-full"
                    style={{ width: `${(data.incidents.weekly / data.incidents.monthly) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-400">Monthly Incidents</span>
                  <span className="text-xs text-white">{data.incidents.monthly}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-[#D13438] h-2 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;