import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  title: string;
  description: string;
}

interface AchievementToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const AchievementToast = ({ toasts, onDismiss }: AchievementToastProps) => {
  return (
    <div 
      className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto p-4 rounded-xl bg-[#14171d] text-stone-100 border border-emerald-500/40 shadow-xl flex items-start gap-3 relative overflow-hidden"
          >
            {/* Subtle tactical left accent */}
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-emerald-400">
              <Trophy size={18} />
            </div>

            <div className="flex-1 min-w-0 pr-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                Achievement Unlocked
              </span>
              <h4 className="text-xs font-bold text-white font-mono truncate mt-0.5">
                {toast.title}
              </h4>
              <p className="text-[11px] text-stone-300 font-sans mt-0.5 leading-snug">
                {toast.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="absolute top-2.5 right-2.5 text-stone-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
