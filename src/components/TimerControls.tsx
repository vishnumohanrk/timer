import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { IconButton } from './Atoms/IconButton';

interface TimerControlsProps {
  isRunning: boolean;
  remainingTime: number;
  duration: number;
  onToggle: () => void;
  onRestart: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  remainingTime,
  duration,
  onToggle,
  onRestart,
}) => {
  const isCompleted = remainingTime <= 0;

  if (isCompleted) {
    return (
      <IconButton
        onClick={onRestart}
        title="Restart Timer"
        className="p-3 bg-blue-100 text-blue-600 hover:bg-blue-200"
      >
        <RotateCcw className="w-6 h-6" />
      </IconButton>
    );
  }

  return (
    <IconButton
      className="p-3"
      onClick={onToggle}
      variant={isRunning ? 'danger2' : 'success'}
      title={isRunning ? 'Pause Timer' : 'Start Timer'}
    >
      {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
    </IconButton>
  );
};
