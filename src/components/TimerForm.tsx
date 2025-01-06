import { useState } from 'react';
import { Timer } from '../types/timer';
import { validateTimerForm } from '../utils/validation';
import { FormFieldContainer } from './Atoms/FormFieldContainer';
import { FormFieldLabel } from './Atoms/FormFieldLabel';
import { Input } from './Atoms/Input';
import { FormFieldError } from './Atoms/FormFieldError';
import { TextArea } from './Atoms/TextArea';

interface TimerFormProps {
  timer?: Timer;
  children: React.ReactNode;
  onSubmissionValid: (timer: Omit<Timer, 'id' | 'createdAt'>) => void;
}

export function TimerForm({
  timer,
  children,
  onSubmissionValid,
}: TimerFormProps) {
  const [title, setTitle] = useState(timer?.title ?? '');
  const [description, setDescription] = useState(timer?.description ?? '');
  const [hours, setHours] = useState(
    timer?.duration ? Math.floor(timer.duration / 3600) : 0
  );

  const [minutes, setMinutes] = useState(
    timer?.duration ? Math.floor((timer.duration % 3600) / 60) : 0
  );

  const [seconds, setSeconds] = useState(
    timer?.duration ? timer.duration % 60 : 0
  );
  const [touched, setTouched] = useState({
    title: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateTimerForm({ title, description, hours, minutes, seconds })) {
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    onSubmissionValid({
      title: title.trim(),
      description: description.trim(),
      duration: totalSeconds,
      remainingTime: totalSeconds,
      isRunning: false,
    });
  }

  const isTimeValid = hours > 0 || minutes > 0 || seconds > 0;
  const isTitleValid = title.trim().length > 0 && title.length <= 50;

  const isTitleFieldError = touched.title && !isTitleValid;
  const isDurationFieldError =
    touched.hours && touched.minutes && touched.seconds && !isTimeValid;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormFieldContainer>
        <FormFieldLabel htmlFor="timerTitle" required>
          Title
        </FormFieldLabel>
        <Input
          type="text"
          value={title}
          id="timerTitle"
          maxLength={50}
          placeholder="Enter timer title"
          data-invalid={isTitleFieldError}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched({ ...touched, title: true })}
        />
        {isTitleFieldError ? (
          <FormFieldError>
            Title is required and must be less than 50 characters
          </FormFieldError>
        ) : null}
        <p className="mt-1 text-sm text-gray-500">
          {title.length}/50 characters
        </p>
      </FormFieldContainer>

      <FormFieldContainer>
        <FormFieldLabel htmlFor="timerDescription">Description</FormFieldLabel>
        <TextArea
          rows={3}
          value={description}
          id="timerDescription"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter timer description (optional)"
        />
      </FormFieldContainer>

      <div className="flex flex-col gap-4">
        <FormFieldLabel required>Duration</FormFieldLabel>
        <div className="grid grid-cols-3 gap-4">
          <FormFieldContainer className="gap-1">
            <FormFieldLabel htmlFor="timerHours" variant="secondary">
              Hours
            </FormFieldLabel>
            <Input
              min="0"
              max="23"
              value={hours}
              type="number"
              id="timerHours"
              onBlur={() => setTouched({ ...touched, hours: true })}
              onChange={(e) =>
                setHours(Math.min(23, parseInt(e.target.value) || 0))
              }
            />
          </FormFieldContainer>
          <FormFieldContainer className="gap-1">
            <FormFieldLabel htmlFor="timerMinutes" variant="secondary">
              Minutes
            </FormFieldLabel>
            <Input
              min="0"
              max="59"
              type="number"
              value={minutes}
              id="timerMinutes"
              onBlur={() => setTouched({ ...touched, minutes: true })}
              onChange={(e) =>
                setMinutes(Math.min(59, parseInt(e.target.value) || 0))
              }
            />
          </FormFieldContainer>
          <FormFieldContainer className="gap-1">
            <FormFieldLabel htmlFor="timerSeconds" variant="secondary">
              Seconds
            </FormFieldLabel>
            <Input
              min="0"
              max="59"
              type="number"
              value={seconds}
              id="timerSeconds"
              onBlur={() => setTouched({ ...touched, seconds: true })}
              onChange={(e) =>
                setSeconds(Math.min(59, parseInt(e.target.value) || 0))
              }
            />
          </FormFieldContainer>
        </div>
        {isDurationFieldError ? (
          <FormFieldError>Please set a duration greater than 0</FormFieldError>
        ) : null}
      </div>
      {children}
    </form>
  );
}
