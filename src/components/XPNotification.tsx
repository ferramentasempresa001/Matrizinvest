import { motion, AnimatePresence } from 'motion/react';
import { Zap, Star, TrendingUp } from 'lucide-react';

interface XPNotificationProps {
  show: boolean;
  xp: number;
  message?: string;
}

export function XPNotification({ show, xp, message = 'Parabéns!' }: XPNotificationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-1 rounded-2xl shadow-2xl shadow-purple-500/50">
            <div className="bg-slate-900 rounded-2xl px-6 py-4 flex items-center gap-3">
              {/* Animated icon */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.2, 1.2, 1.2, 1],
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.2, 0.4, 0.6, 1],
                }}
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-white fill-white" />
              </motion.div>

              <div className="flex flex-col">
                <p className="text-white">{message}</p>
                <div className="flex items-center gap-1 text-cyan-400">
                  <Star className="w-4 h-4 fill-cyan-400" />
                  <span className="text-xl">+{xp} XP</span>
                </div>
              </div>

              {/* Particles effect */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 1,
                    x: Math.cos((i * Math.PI) / 3) * 40,
                    y: Math.sin((i * Math.PI) / 3) * 40,
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
