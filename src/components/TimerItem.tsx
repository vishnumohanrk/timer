import React, { useEffect, useRef, useState } from 'react';
import { Trash2, RotateCcw, Pencil } from 'lucide-react';
import { Timer } from '../types/timer';
import { formatTime } from '../utils/time';
import { useTimerStore } from '../store/useTimerStore';
import { toast } from 'sonner';
import { EditTimerModal } from './EditTimerModal';
import { TimerAudio } from '../utils/audio';
import { TimerControls } from './TimerControls';
import { TimerProgress } from './TimerProgress';
import { IconButton } from './Atoms/IconButton';
import { usePrevious } from '../hooks/UsePrevious';

interface TimerItemProps {
  timer: Timer;
}

export const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
  const { toggleTimer, deleteTimer, restartTimer } = useTimerStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const timerAudio = TimerAudio.getInstance();
  const hasEndedRef = useRef(false);
  const prevRemainingTime = usePrevious(timer.remainingTime);

  useEffect(() => {
    if (
      prevRemainingTime &&
      prevRemainingTime > 0 &&
      timer.remainingTime <= 0 &&
      !hasEndedRef.current
    ) {
      hasEndedRef.current = true;
      timerAudio.stop();

      timerAudio.play().catch(console.error);

      toast.success(`Timer "${timer.title}" has ended!`, {
        duration: 5000,
        onAutoClose: () => timerAudio.stop(),
        action: {
          label: 'Dismiss',
          onClick: () => timerAudio.stop(),
        },
      });
    } else if (timer.remainingTime > 0 && hasEndedRef.current) {
      hasEndedRef.current = false;
    }
  }, [timer.remainingTime, prevRemainingTime, timer.title, timerAudio]);

  const handleRestart = () => {
    hasEndedRef.current = false;
    restartTimer(timer.id);
  };

  const handleDelete = () => {
    timerAudio.stop();
    deleteTimer(timer.id);
  };

  const handleToggle = () => {
    if (timer.remainingTime <= 0) {
      hasEndedRef.current = false;
    }
    toggleTimer(timer.id);
  };

  return (
    <>
      <div className="relative bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-102 overflow-hidden">
        <div className="absolute inset-0 w-full h-full -z-10 opacity-5">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M50 20V50L70 70"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {timer.title}
              </h3>
              <p className="text-gray-600 mt-1">{timer.description}</p>
            </div>
            <div className="flex gap-2">
              <IconButton
                title="Edit Timer"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Pencil className="w-5 h-5" />
              </IconButton>
              <IconButton title="Restart Timer" onClick={handleRestart}>
                <RotateCcw className="w-5 h-5" />
              </IconButton>
              <IconButton
                variant="danger"
                title="Delete Timer"
                onClick={handleDelete}
              >
                <Trash2 className="w-5 h-5" />
              </IconButton>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6">
            <div className="text-4xl font-mono font-bold text-gray-800 mb-4">
              {formatTime(timer.remainingTime)}
            </div>

            <TimerProgress
              progress={(timer.remainingTime / timer.duration) * 100}
            />

            <TimerControls
              isRunning={timer.isRunning}
              remainingTime={timer.remainingTime}
              duration={timer.duration}
              onToggle={handleToggle}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>

      <EditTimerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        timer={timer}
      />
    </>
  );
};
