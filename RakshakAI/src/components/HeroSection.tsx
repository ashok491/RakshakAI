import React from 'react';
import { Shield, Eye, AlertTriangle, Map } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/7366/startup-photos.jpg)',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] to-transparent opacity-90"></div>
      </div>

      {/* Animated radar effect */}
      <div className="absolute top-1/2 right-1/3 transform -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] opacity-20 z-0">
        <div className="absolute inset-0 rounded-full border-2 border-[#0078D7] animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute inset-0 rounded-full border-2 border-[#0078D7] animate-ping" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute inset-0 rounded-full border-2 border-[#0078D7] animate-ping" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-[#D13438]">Rakshak</span>AI
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-6">
              AI-Powered Defence Surveillance & Threat Alert System
            </h2>
            <p className="text-lg mb-8 text-gray-300 max-w-lg">
              Empowering Indian security forces with intelligent, real-time surveillance and 
              AI-driven threat detection for enhanced national defense.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#D13438] hover:bg-red-700 text-white py-3 px-6 rounded-md transition-colors duration-300 flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Live Demo
              </button>
              <button className="border border-[#4D5D53] hover:bg-[#4D5D53]/30 text-white py-3 px-6 rounded-md transition-colors duration-300 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Learn More
              </button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="md:w-1/2 mt-12 md:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1A1A1A]/80 backdrop-blur-sm p-6 rounded-lg border-l-4 border-[#0078D7] hover:transform hover:translate-y-[-5px] transition-transform duration-300">
              <div className="rounded-full bg-[#0078D7]/20 w-12 h-12 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-[#0078D7]" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Real-time Surveillance</h3>
              <p className="text-gray-300 text-sm">
                Advanced monitoring from CCTV and drone feeds with AI-enhanced object detection.
              </p>
            </div>
            
            <div className="bg-[#1A1A1A]/80 backdrop-blur-sm p-6 rounded-lg border-l-4 border-[#D13438] hover:transform hover:translate-y-[-5px] transition-transform duration-300">
              <div className="rounded-full bg-[#D13438]/20 w-12 h-12 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-[#D13438]" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Threat Detection</h3>
              <p className="text-gray-300 text-sm">
                Intelligent algorithms that identify potential security threats in real-time.
              </p>
            </div>
            
            <div className="bg-[#1A1A1A]/80 backdrop-blur-sm p-6 rounded-lg border-l-4 border-[#4D5D53] hover:transform hover:translate-y-[-5px] transition-transform duration-300">
              <div className="rounded-full bg-[#4D5D53]/20 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-[#4D5D53]" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Facial Recognition</h3>
              <p className="text-gray-300 text-sm">
                Advanced biometric matching against database of known persons of interest.
              </p>
            </div>
            
            <div className="bg-[#1A1A1A]/80 backdrop-blur-sm p-6 rounded-lg border-l-4 border-[#0078D7] hover:transform hover:translate-y-[-5px] transition-transform duration-300">
              <div className="rounded-full bg-[#0078D7]/20 w-12 h-12 flex items-center justify-center mb-4">
                <Map className="h-6 w-6 text-[#0078D7]" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Geofencing</h3>
              <p className="text-gray-300 text-sm">
                Set virtual boundaries and receive alerts when perimeters are breached.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;