import '@testing-library/jest-dom/vitest';

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { TimerForm } from './TimerForm';

const mockOnSubmissionValid = vi.fn();

describe('TimerForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders the form with all fields', () => {
    render(
      <TimerForm onSubmissionValid={mockOnSubmissionValid}>
        <button type="submit">Submit</button>
      </TimerForm>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const hoursInput = screen.getByLabelText(/hours/i);
    const minutesInput = screen.getByLabelText(/minutes/i);
    const secondsInput = screen.getByLabelText(/seconds/i);

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(hoursInput).toBeInTheDocument();
    expect(minutesInput).toBeInTheDocument();
    expect(secondsInput).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(
      <TimerForm onSubmissionValid={mockOnSubmissionValid}>
        <button type="submit">Submit</button>
      </TimerForm>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const hoursInput = screen.getByLabelText(/hours/i);
    const minutesInput = screen.getByLabelText(/minutes/i);
    const secondsInput = screen.getByLabelText(/seconds/i);

    fireEvent.blur(titleInput);
    fireEvent.blur(hoursInput);
    fireEvent.blur(minutesInput);
    fireEvent.blur(secondsInput);

    fireEvent.submit(titleInput);

    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please set a duration greater than 0/i)
    ).toBeInTheDocument();
    expect(mockOnSubmissionValid).not.toHaveBeenCalled();
  });

  it('displays character count for title', () => {
    render(
      <TimerForm onSubmissionValid={mockOnSubmissionValid}>
        <button type="submit">Submit</button>
      </TimerForm>
    );

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'My Timer' } });

    expect(screen.getByText('8/50 characters')).toBeInTheDocument();
  });

  it('forces maximum values for time inputs', () => {
    render(
      <TimerForm onSubmissionValid={mockOnSubmissionValid}>
        <button type="submit">Submit</button>
      </TimerForm>
    );

    const hoursInput = screen.getByLabelText(/hours/i);
    const minutesInput = screen.getByLabelText(/minutes/i);
    const secondsInput = screen.getByLabelText(/seconds/i);

    fireEvent.change(hoursInput, { target: { value: '25' } });
    fireEvent.change(minutesInput, { target: { value: '63' } });
    fireEvent.change(secondsInput, { target: { value: '63' } });

    expect(hoursInput).toHaveValue(23);
    expect(minutesInput).toHaveValue(59);
    expect(secondsInput).toHaveValue(59);
  });

  it('submits form with valid data', () => {
    render(
      <TimerForm onSubmissionValid={mockOnSubmissionValid}>
        <button type="submit">Submit</button>
      </TimerForm>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const minutesInput = screen.getByLabelText(/minutes/i);

    fireEvent.change(titleInput, {
      target: { value: 'Test Timer 1' },
    });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description 1' },
    });
    fireEvent.change(minutesInput, {
      target: { value: '5' },
    });

    fireEvent.submit(titleInput);

    expect(mockOnSubmissionValid).toHaveBeenCalledWith({
      title: 'Test Timer 1',
      description: 'Test Description 1',
      duration: 300,
      remainingTime: 300,
      isRunning: false,
    });
  });

  it('pre fills form with existing timer data', () => {
    const existingTimer = {
      id: '1',
      title: 'Random Title',
      description: 'Random Description',
      duration: 3665, // 1h 1m 5s
      remainingTime: 3665,
      isRunning: false,
      createdAt: new Date().getTime(),
    };

    render(
      <TimerForm
        timer={existingTimer}
        onSubmissionValid={mockOnSubmissionValid}
      >
        <button type="submit">Submit</button>
      </TimerForm>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const hoursInput = screen.getByLabelText(/hours/i);
    const minutesInput = screen.getByLabelText(/minutes/i);
    const secondsInput = screen.getByLabelText(/seconds/i);

    expect(titleInput).toHaveValue('Random Title');
    expect(descriptionInput).toHaveValue('Random Description');
    expect(hoursInput).toHaveValue(1);
    expect(minutesInput).toHaveValue(1);
    expect(secondsInput).toHaveValue(5);
  });
});
