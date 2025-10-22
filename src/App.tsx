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

export interface Investment {
  id: number;
  type: string;
  name: string;
  amount: number;
  return: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  // Profile data state
  const [userEmail, setUserEmail] = useState('');
  
  // Financial data state
  const [totalBalance, setTotalBalance] = useState(59950.00);
  const [investments, setInvestments] = useState<Investment[]>([
    { id: 1, type: 'Renda Fixa', name: 'CDB Banco XYZ', amount: 4500, return: 8.5 },
    { id: 2, type: 'Ações', name: 'Portfolio Diversificado', amount: 6600, return: 15.2 },
    { id: 3, type: 'Cripto', name: 'Bitcoin & Ethereum', amount: 2550, return: 22.8 },
    { id: 4, type: 'Fundos', name: 'Fundo Multimercado', amount: 1350, return: 6.3 },
  ]);

  const handleLogin = (name: string) => {
    setUserName(name);
    // Auto-generate email from username
    const email = name.toLowerCase().replace(/\s+/g, '.') + '@prismafinance.com';
    setUserEmail(email);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (currentScreen) {
      case 'dashboard':
        return (
          <DashboardScreen 
            userName={userName}
            totalBalance={totalBalance}
            setTotalBalance={setTotalBalance}
            investments={investments}
            setInvestments={setInvestments}
            onNavigate={setCurrentScreen}
          />
        );
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
        return (
          <ProfileScreen 
            userName={userName}
            setUserName={setUserName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
          />
        );
      default:
        return (
          <DashboardScreen 
            userName={userName}
            totalBalance={totalBalance}
            setTotalBalance={setTotalBalance}
            investments={investments}
            setInvestments={setInvestments}
            onNavigate={setCurrentScreen}
          />
        );
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
