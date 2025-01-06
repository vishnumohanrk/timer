import React from 'react';
import { X, Clock } from 'lucide-react';
import { useTimerStore } from '../store/useTimerStore';

import { Modal, ModalHeading } from './Atoms/Modal';
import { TimerForm } from './TimerForm';
import { IconButton } from './Atoms/IconButton';
import { Button } from './Atoms/Button';
import { ButtonGroupContainer } from './Atoms/ButtonGroupContainer';

interface AddTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTimerModal: React.FC<AddTimerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addTimer } = useTimerStore();

  if (!isOpen) return null;

  return (
    <Modal>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <ModalHeading>Add New Timer</ModalHeading>
        </div>
        <IconButton
          title="Close"
          onClick={onClose}
          variant="secondary"
          size="sm"
        >
          <X className="w-5 h-5" />
        </IconButton>
      </div>

      <TimerForm
        onSubmissionValid={(timer) => {
          addTimer(timer);
          onClose();
        }}
      >
        <ButtonGroupContainer className="mt-6">
          <Button size="sm" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" type="submit">
            Add Timer
          </Button>
        </ButtonGroupContainer>
      </TimerForm>
    </Modal>
  );
};
