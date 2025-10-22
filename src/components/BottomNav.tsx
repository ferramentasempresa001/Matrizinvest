import { Home, Target, CheckCircle, Trophy, TrendingUp, BarChart3, User } from 'lucide-react';
import { motion } from 'motion/react';

type Screen = 'dashboard' | 'goals' | 'habits' | 'achievements' | 'finance' | 'reports' | 'profile';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems = [
  { screen: 'dashboard' as Screen, icon: Home, label: 'Dashboard' },
  { screen: 'goals' as Screen, icon: Target, label: 'Metas' },
  { screen: 'habits' as Screen, icon: CheckCircle, label: 'Hábitos' },
  { screen: 'achievements' as Screen, icon: Trophy, label: 'Conquistas' },
  { screen: 'finance' as Screen, icon: TrendingUp, label: 'Financeiro' },
  { screen: 'reports' as Screen, icon: BarChart3, label: 'Relatórios' },
  { screen: 'profile' as Screen, icon: User, label: 'Perfil' },
];

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1F2E] backdrop-blur-sm border-t border-[#2A3F5F] z-50 pb-safe">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around px-2 py-2 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            const Icon = item.icon;
            
            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className="relative flex flex-col items-center gap-1 p-2 min-w-[48px] sm:min-w-[60px] flex-shrink-0 transition-all touch-manipulation"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#2A3F5F] rounded-lg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 relative z-10 transition-colors ${
                    isActive 
                      ? 'text-[#2D7A75]' 
                      : 'text-[#64748B]'
                  }`}
                />
                <span
                  className={`text-[10px] relative z-10 transition-colors ${
                    isActive 
                      ? 'text-[#E8EBF0]' 
                      : 'text-[#64748B]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
