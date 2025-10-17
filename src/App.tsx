import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { GoalsScreen } from './components/GoalsScreen';
import { HabitsScreen } from './components/HabitsScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { FinanceScreen } from './components/FinanceScreen';
import { ReportsScreen } from './components/ReportsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { Toaster } from './components/ui/sonner';

type Screen = 'login' | 'dashboard' | 'goals' | 'habits' | 'achievements' | 'finance' | 'reports' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'goals':
        return <GoalsScreen />;
      case 'habits':
        return <HabitsScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'finance':
        return <FinanceScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1419] relative">
      {/* Subtle geometric background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="max-w-md mx-auto min-h-screen bg-[#0F1419] relative z-10">
        {renderScreen()}
        {isLoggedIn && <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />}
        <Toaster />
      </div>
    </div>
  );
}
