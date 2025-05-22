import React, { useState, useEffect } from 'react';
import { Shield, Bell, Menu, X, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1A1A1A] shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-[#D13438]" />
            <span className="ml-2 text-xl font-bold text-white">RakshakAI</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#dashboard" className="text-white hover:text-[#0078D7] transition-colors">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#surveillance" className="text-white hover:text-[#0078D7] transition-colors">
                    Surveillance
                  </a>
                </li>
                <li>
                  <a href="#analytics" className="text-white hover:text-[#0078D7] transition-colors">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="#alerts" className="text-white hover:text-[#0078D7] transition-colors">
                    Alerts
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="text-white text-right">
              <div className="text-sm opacity-70">{formatDate(currentTime)}</div>
              <div className="text-base font-mono">{formatTime(currentTime)}</div>
            </div>
            <div className="relative">
              <Bell className="h-6 w-6 text-white cursor-pointer hover:text-[#D13438] transition-colors" />
              <span className="absolute -top-1 -right-1 bg-[#D13438] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="bg-[#4D5D53] p-1 rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-gray-800">
          <nav className="px-4 py-2">
            <ul className="space-y-2">
              <li>
                <a
                  href="#dashboard"
                  className="block py-2 text-white hover:text-[#0078D7] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#surveillance"
                  className="block py-2 text-white hover:text-[#0078D7] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Surveillance
                </a>
              </li>
              <li>
                <a
                  href="#analytics"
                  className="block py-2 text-white hover:text-[#0078D7] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Analytics
                </a>
              </li>
              <li>
                <a
                  href="#alerts"
                  className="block py-2 text-white hover:text-[#0078D7] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Alerts
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;