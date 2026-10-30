import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, RotateCcw, Volume2, VolumeX, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockAchievement?: (title: string, desc: string) => void;
}

type ShotDirection = 'left' | 'center' | 'right';
type ShotResult = 'idle' | 'goal' | 'saved' | 'shooting';

// 8-bit sound synth using standard Web Audio API (no external files needed)
const playRetroSound = (type: 'kick' | 'goal' | 'save' | 'whistle', soundEnabled: boolean) => {
  if (!soundEnabled || typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'kick') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'goal') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.setValueAtTime(440, now + 0.08);
      osc.frequency.setValueAtTime(554.37, now + 0.16);
      osc.frequency.setValueAtTime(659.25, now + 0.24);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'save') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'whistle') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1200, now + 0.1);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch {
    // Ignore audio context errors gracefully
  }
};

export const ArcadeModal = ({ isOpen, onClose, onUnlockAchievement }: ArcadeModalProps) => {
  const { t } = useTranslation();
  const [goals, setGoals] = useState(0);
  const [saves, setSaves] = useState(0);
  const [shotsTaken, setShotsTaken] = useState(0);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [shotState, setShotState] = useState<ShotResult>('idle');
  const [lastShotDir, setLastShotDir] = useState<ShotDirection | null>(null);
  const [keeperDir, setKeeperDir] = useState<ShotDirection | null>(null);
  const [lastMessage, setLastMessage] = useState<string>('');

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleShoot = useCallback((direction: ShotDirection) => {
    if (shotState === 'shooting') return;

    setLastShotDir(direction);
    setShotState('shooting');
    playRetroSound('kick', soundEnabled);

    // Keeper AI choice (slightly favors saving center)
    const directions: ShotDirection[] = ['left', 'center', 'right'];
    const randomChoice = directions[Math.floor(Math.random() * directions.length)];
    setKeeperDir(randomChoice);

    setTimeout(() => {
      const isSaved = randomChoice === direction;
      setShotsTaken(prev => prev + 1);

      if (isSaved) {
        setShotState('saved');
        setSaves(prev => prev + 1);
        setStreak(0);
        setLastMessage(t('arcade.saved_msg'));
        playRetroSound('save', soundEnabled);
      } else {
        setShotState('goal');
        setGoals(prev => {
          const newGoals = prev + 1;
          if (newGoals === 1 && onUnlockAchievement) {
            onUnlockAchievement(t('arcade.achieve_first_goal_title'), t('arcade.achieve_first_goal_desc'));
          }
          return newGoals;
        });
        setStreak(prev => {
          const newStreak = prev + 1;
          if (newStreak === 3 && onUnlockAchievement) {
            onUnlockAchievement(t('arcade.achieve_hattrick_title'), t('arcade.achieve_hattrick_desc'));
          }
          return newStreak;
        });
        setLastMessage(t('arcade.goal_msg'));
        playRetroSound('goal', soundEnabled);
      }
    }, 450);
  }, [shotState, soundEnabled, t, onUnlockAchievement]);

  // Focus trap & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (shotState === 'shooting') return;

      if (e.key === 'ArrowLeft' || e.key === '1') {
        handleShoot('left');
      } else if (e.key === 'ArrowDown' || e.key === '2') {
        handleShoot('center');
      } else if (e.key === 'ArrowRight' || e.key === '3') {
        handleShoot('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, shotState, onClose, handleShoot]);

  const handleReset = () => {
    setGoals(0);
    setSaves(0);
    setShotsTaken(0);
    setStreak(0);
    setShotState('idle');
    setLastShotDir(null);
    setKeeperDir(null);
    setLastMessage('');
    playRetroSound('whistle', soundEnabled);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="arcade-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg bg-[#14171d] text-stone-100 rounded-2xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#181b22] border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 status-beacon inline-block" />
                <h2 id="arcade-title" className="font-mono text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  <span>⚽</span>
                  <span>{t('arcade.title')}</span>
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                  title={soundEnabled ? t('arcade.mute_sound') : t('arcade.enable_sound')}
                  aria-label={soundEnabled ? t('arcade.mute_sound') : t('arcade.enable_sound')}
                >
                  {soundEnabled ? <Volume2 size={16} className="text-emerald-400" /> : <VolumeX size={16} />}
                </button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                  aria-label={t('arcade.close')}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scoreboard Deck */}
            <div className="grid grid-cols-4 gap-2 p-4 bg-[#0f1115] border-b border-stone-800/80 font-mono text-center text-xs">
              <div className="p-2 rounded-lg bg-[#181b22] border border-stone-800">
                <span className="text-[10px] text-stone-400 block uppercase">{t('arcade.score_goals')}</span>
                <span className="text-lg font-bold text-emerald-400">{goals}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#181b22] border border-stone-800">
                <span className="text-[10px] text-stone-400 block uppercase">{t('arcade.score_saves')}</span>
                <span className="text-lg font-bold text-rose-400">{saves}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#181b22] border border-stone-800">
                <span className="text-[10px] text-stone-400 block uppercase">{t('arcade.score_streak')}</span>
                <span className="text-lg font-bold text-emerald-400">{streak}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#181b22] border border-stone-800">
                <span className="text-[10px] text-stone-400 block uppercase">{t('arcade.score_total')}</span>
                <span className="text-lg font-bold text-stone-200">{shotsTaken}</span>
              </div>
            </div>

            {/* Interactive Pitch Stage */}
            <div className="p-5 sm:p-6 bg-gradient-to-b from-[#10141a] via-[#111a15] to-[#121c17] relative select-none">
              {/* Football Pitch Arena / Goal Frame */}
              <div className="w-full max-w-[420px] mx-auto h-52 sm:h-56 rounded-xl border-2 border-stone-700/80 relative bg-[#0a1510] overflow-hidden flex flex-col justify-end shadow-inner">
                {/* Full goal net background texture across the entire cage */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '22px 22px'
                  }}
                />

                {/* Subtle pitch turf glow */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.25) 0%, transparent 70%)'
                  }}
                />

                {/* Goalkeeper SVG Vector Model (Scaled proportionnellement aux mains) */}
                <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none pb-1 sm:pb-2">
                  <motion.div
                    className="flex items-center justify-center z-10"
                    animate={{
                      x: keeperDir === 'left' ? -95 : keeperDir === 'right' ? 95 : 0,
                      y: shotState === 'shooting' ? -12 : 0,
                      rotate: keeperDir === 'left' ? -12 : keeperDir === 'right' ? 12 : 0,
                      scale: shotState === 'saved' ? 1.08 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    <img
                      src="/images/projects/goalkeeper.svg"
                      alt="Goalkeeper"
                      className="w-32 sm:w-36 max-h-[105px] sm:max-h-[115px] object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.35)] select-none pointer-events-none"
                      draggable={false}
                    />
                  </motion.div>
                </div>

                {/* Interactive Target Zones Overlay */}
                <div className="absolute inset-0 grid grid-cols-3 p-2 z-15">
                  <button
                    type="button"
                    disabled={shotState === 'shooting'}
                    onClick={() => handleShoot('left')}
                    aria-label={t('arcade.aim_left')}
                    className="border border-dashed border-emerald-500/25 hover:border-emerald-400/60 hover:bg-emerald-500/10 rounded-lg flex items-start justify-center pt-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                  >
                    <span className="px-2 py-0.5 rounded bg-stone-900/85 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold tracking-wider shadow-sm">
                      LEFT [1]
                    </span>
                  </button>
                  <button
                    type="button"
                    disabled={shotState === 'shooting'}
                    onClick={() => handleShoot('center')}
                    aria-label={t('arcade.aim_center')}
                    className="border border-dashed border-emerald-500/25 hover:border-emerald-400/60 hover:bg-emerald-500/10 rounded-lg flex items-start justify-center pt-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                  >
                    <span className="px-2 py-0.5 rounded bg-stone-900/85 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold tracking-wider shadow-sm">
                      CENTER [2]
                    </span>
                  </button>
                  <button
                    type="button"
                    disabled={shotState === 'shooting'}
                    onClick={() => handleShoot('right')}
                    aria-label={t('arcade.aim_right')}
                    className="border border-dashed border-emerald-500/25 hover:border-emerald-400/60 hover:bg-emerald-500/10 rounded-lg flex items-start justify-center pt-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
                  >
                    <span className="px-2 py-0.5 rounded bg-stone-900/85 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold tracking-wider shadow-sm">
                      RIGHT [3]
                    </span>
                  </button>
                </div>

                {/* Penalty spot turf marking */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.5)] mb-1" />
                </div>

                {/* Ball at penalty spot or in motion */}
                <motion.div
                  className="absolute z-20 text-2xl pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  initial={false}
                  animate={{
                    bottom: shotState === 'idle' ? '10px' : '82px',
                    left: !lastShotDir || shotState === 'idle'
                      ? '50%'
                      : lastShotDir === 'left' ? '18%' : lastShotDir === 'right' ? '82%' : '50%',
                    scale: shotState === 'idle' ? 1.15 : 0.85,
                    rotate: !lastShotDir || shotState === 'idle'
                      ? 0
                      : lastShotDir === 'left' ? -180 : lastShotDir === 'right' ? 180 : 0
                  }}
                  transition={{ duration: 0.42, ease: 'easeOut' }}
                  style={{ x: '-50%' }}
                >
                  ⚽
                </motion.div>
              </div>

              {/* Status commentary banner */}
              <div className="mt-4 min-h-[32px] flex items-center justify-center text-center">
                {lastMessage ? (
                  <motion.span
                    key={shotsTaken}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`font-mono text-xs font-bold px-3 py-1 rounded-md ${
                      shotState === 'goal'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {lastMessage}
                  </motion.span>
                ) : (
                  <span className="font-mono text-xs text-stone-400">
                    {t('arcade.instructions')}
                  </span>
                )}
              </div>

              {/* Shot Controls */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  disabled={shotState === 'shooting'}
                  onClick={() => handleShoot('left')}
                  className="py-3 px-3 rounded-xl bg-[#1b2029] hover:bg-emerald-950 hover:border-emerald-600 border border-stone-700/80 text-stone-200 font-mono text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <Target size={14} className="text-emerald-400" />
                  <span>{t('arcade.aim_left')}</span>
                  <span className="text-[10px] text-stone-400">← [1]</span>
                </button>

                <button
                  type="button"
                  disabled={shotState === 'shooting'}
                  onClick={() => handleShoot('center')}
                  className="py-3 px-3 rounded-xl bg-[#1b2029] hover:bg-emerald-950 hover:border-emerald-600 border border-stone-700/80 text-stone-200 font-mono text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <Target size={14} className="text-emerald-400" />
                  <span>{t('arcade.aim_center')}</span>
                  <span className="text-[10px] text-stone-400">↓ [2]</span>
                </button>

                <button
                  type="button"
                  disabled={shotState === 'shooting'}
                  onClick={() => handleShoot('right')}
                  className="py-3 px-3 rounded-xl bg-[#1b2029] hover:bg-emerald-950 hover:border-emerald-600 border border-stone-700/80 text-stone-200 font-mono text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <Target size={14} className="text-emerald-400" />
                  <span>{t('arcade.aim_right')}</span>
                  <span className="text-[10px] text-stone-400">→ [3]</span>
                </button>
              </div>
            </div>

            {/* Footer action bar */}
            <div className="px-5 py-3.5 bg-[#181b22] border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
              <span className="flex items-center gap-1 text-[11px]">
                <Trophy size={13} className="text-emerald-400" />
                <span>{t('arcade.tip')}</span>
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>{t('arcade.reset')}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
