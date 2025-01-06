import React from 'react';
import { X, Clock } from 'lucide-react';
import { useTimerStore } from '../store/useTimerStore';
import { Timer } from '../types/timer';
import { Modal, ModalHeading } from './Atoms/Modal';
import { TimerForm } from './TimerForm';
import { IconButton } from './Atoms/IconButton';
import { ButtonGroupContainer } from './Atoms/ButtonGroupContainer';
import { Button } from './Atoms/Button';

interface EditTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timer: Timer;
}

export const EditTimerModal: React.FC<EditTimerModalProps> = ({
  isOpen,
  onClose,
  timer,
}) => {
  const { editTimer } = useTimerStore();

  if (!isOpen) return null;

  return (
    <Modal>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <ModalHeading>Edit Timer</ModalHeading>
        </div>
        <IconButton title="Close" onClick={onClose}>
          <X className="w-5 h-5" />
        </IconButton>
      </div>

      <TimerForm
        timer={timer}
        onSubmissionValid={(editedTimer) => {
          editTimer(timer.id, {
            title: editedTimer.title.trim(),
            description: editedTimer.description.trim(),
            duration: editedTimer.duration,
          });

          onClose();
        }}
      >
        <ButtonGroupContainer className="mt-6">
          <Button size="sm" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" type="submit">
            Save Changes
          </Button>
        </ButtonGroupContainer>
      </TimerForm>
    </Modal>
  );
};
