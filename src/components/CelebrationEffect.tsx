import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Sparkles } from 'lucide-react';

interface CelebrationEffectProps {
  show: boolean;
  title: string;
  subtitle?: string;
}

export function CelebrationEffect({ show, title, subtitle }: CelebrationEffectProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Celebration Card */}
            <motion.div
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0, rotateY: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-yellow-900/90 via-orange-900/90 to-red-900/80 border-2 border-yellow-500/50 rounded-3xl p-8 max-w-sm mx-4 shadow-2xl shadow-yellow-500/50">
                {/* Trophy Icon */}
                <motion.div
                  initial={{ scale: 0, y: -50 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  className="flex justify-center mb-6"
                >
                  <div className="relative">
                    <motion.div
                      animate={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.1, 1.1, 1.1, 1],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                      className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50"
                    >
                      <Trophy className="w-12 h-12 text-white" />
                    </motion.div>
                    
                    {/* Sparkles around trophy */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: Math.cos((i * Math.PI) / 4) * 50,
                          y: Math.sin((i * Math.PI) / 4) * 50,
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="absolute top-1/2 left-1/2"
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <h2 className="text-white text-2xl mb-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Parabéns!
                  </h2>
                  <p className="text-yellow-200 text-lg mb-2">{title}</p>
                  {subtitle && (
                    <p className="text-yellow-300/80 text-sm">{subtitle}</p>
                  )}
                </motion.div>

                {/* Confetti effect */}
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1, y: 0, x: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      y: [0, Math.random() * 400 - 200],
                      x: [0, Math.random() * 400 - 200],
                      rotate: [0, Math.random() * 360],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{
                      width: Math.random() * 10 + 5,
                      height: Math.random() * 10 + 5,
                      backgroundColor: [
                        '#fbbf24',
                        '#f59e0b',
                        '#ef4444',
                        '#ec4899',
                        '#8b5cf6',
                        '#3b82f6',
                      ][Math.floor(Math.random() * 6)],
                      borderRadius: Math.random() > 0.5 ? '50%' : '0',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
