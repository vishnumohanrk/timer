import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateTimerForm } from './validation';
import { toast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('validateTimerForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return false for empty title', () => {
    const result = validateTimerForm({
      title: '',
      description: '',
      hours: 1,
      minutes: 0,
      seconds: 0,
    });

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Title is required');
  });

  it('should return false for title longer than 50 chars', () => {
    const result = validateTimerForm({
      title: 'a'.repeat(51),
      description: '',
      hours: 1,
      minutes: 0,
      seconds: 0,
    });

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      'Title must be less than 50 characters'
    );
  });

  it('should return false for negative time values', () => {
    const result = validateTimerForm({
      title: 'Test',
      description: '',
      hours: -1,
      minutes: 0,
      seconds: 0,
    });

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Time values cannot be negative');
  });

  it('should return false for invalid minutes/seconds', () => {
    const result = validateTimerForm({
      title: 'Test',
      description: '',
      hours: 0,
      minutes: 63,
      seconds: 0,
    });

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      'Minutes and seconds must be between 0 and 59'
    );
  });

  it('should return false for zero total time', () => {
    const result = validateTimerForm({
      title: 'Test',
      description: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      'Please set a time greater than 0'
    );
  });

  it('should return false for time exceeding 24 hours', () => {
    const result = validateTimerForm({
      title: 'Test',
      description: '',
      hours: 25,
      minutes: 0,
      seconds: 0,
    });

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Timer cannot exceed 24 hours');
  });

  it('should return true for valid input', () => {
    const result = validateTimerForm({
      title: 'Test Timer',
      description: 'Test Description',
      hours: 1,
      minutes: 30,
      seconds: 45,
    });

    expect(result).toBe(true);
    expect(toast.error).not.toHaveBeenCalled();
  });
});
