import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#232323]">
      <Header />
      <main>
        <HeroSection />
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;