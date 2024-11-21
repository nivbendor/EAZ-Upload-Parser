// src/CakewalkExp/InfoOne.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourneyContext } from '../context/JourneyContext';

interface PathwayOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: 'pdf' | 'packages' | 'calculator' | 'benefits';
}

const InfoOne: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserData } = useJourneyContext();

  const pathways: PathwayOption[] = [
    {
      id: 'benefits-booklet',
      title: 'Benefits Booklet',
      description: 'Download our comprehensive guide to all available benefits',
      icon: '📚',
      action: 'pdf'
    },
    {
      id: 'packages',
      title: 'Packages For You',
      description: 'Explore personalized benefit packages based on your needs',
      icon: '📦',
      action: 'packages'
    },
    {
      id: 'calculator',
      title: 'Cost Simulator',
      description: 'Calculate your potential costs and savings',
      icon: '🧮',
      action: 'calculator'
    },
    {
      id: 'fast-track',
      title: 'Get Benefits',
      description: 'Quick registration for standard benefits package',
      icon: '⚡',
      action: 'benefits'
    }
  ];

  const handlePathwayClick = (action: string) => {
    switch (action) {
      case 'pdf':
        // Handle PDF download
        window.open('/benefits-booklet.pdf', '_blank');
        break;
      case 'packages':
        updateUserData({ pathwayChoice: 'packages' });
        navigate('/rec-step1');
        break;
      case 'calculator':
        updateUserData({ pathwayChoice: 'calculator' });
        navigate('/rec-step1');
        break;
      case 'benefits':
        updateUserData({ pathwayChoice: 'fast-track' });
        navigate('/business-owner-info');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>Step 2 of 8</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-[#0066FF] rounded-full" style={{ width: '25%' }}></div>
        </div>
      </div>

      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0066FF] mb-4">
          Choose Your Path
        </h1>
        <p className="text-gray-600 text-lg">
          Select how you'd like to explore your benefits options
        </p>
      </header>

      <div className="w-full max-w-2xl space-y-4">
        {pathways.map((pathway) => (
          <button
            key={pathway.id}
            onClick={() => handlePathwayClick(pathway.action)}
            className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center text-left"
          >
            <span className="text-3xl mr-4">{pathway.icon}</span>
            <div>
              <h3 className="text-xl font-semibold text-[#0066FF] mb-1">
                {pathway.title}
              </h3>
              <p className="text-gray-600">{pathway.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Optional: Back button if needed */}
      <button
        onClick={() => navigate(-1)}
        className="mt-8 text-gray-600 hover:text-gray-800 transition-colors"
      >
        Back to previous step
      </button>
    </div>
  );
};

export default InfoOne;