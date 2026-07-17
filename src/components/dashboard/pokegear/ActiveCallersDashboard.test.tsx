import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Contact, TimerState } from '../../../engine/saveParser/parsers/gen2/phone/predictor';
import { ActiveCallersDashboard } from './ActiveCallersDashboard';

describe('ActiveCallersDashboard', () => {
  const mockContacts: Contact[] = [
    { id: 1, name: 'Mom' },
    { id: 2, name: 'Prof. Elm' },
    { id: 3, name: 'Youngster Joey' },
  ];

  const readyTimerState: TimerState = {
    delayMinsRemaining: 0,
    timeCyclesSinceLastCall: 5,
  };

  const delayedTimerState: TimerState = {
    delayMinsRemaining: 15,
    timeCyclesSinceLastCall: 1,
  };

  it('renders the header and basic structure', () => {
    render(<ActiveCallersDashboard contacts={[]} timerState={readyTimerState} />);
    expect(screen.getByText('ACTIVE CALLERS PREDICTOR')).toBeInTheDocument();
    expect(screen.getByText('COOLDOWN')).toBeInTheDocument();
    expect(screen.getByText('BASE CALL CHANCE')).toBeInTheDocument();
  });

  it('displays empty state when no contacts are provided', () => {
    render(<ActiveCallersDashboard contacts={[]} timerState={readyTimerState} />);
    expect(screen.getByText('NO ACTIVE CALLERS')).toBeInTheDocument();
  });

  it('renders contact list and calculates probabilities correctly when ready', () => {
    render(<ActiveCallersDashboard contacts={mockContacts} timerState={readyTimerState} />);

    // Check global status
    expect(screen.getByText('READY')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();

    // Check individual contacts
    expect(screen.getByText('Mom')).toBeInTheDocument();
    expect(screen.getByText('ID: 001')).toBeInTheDocument();
    expect(screen.getByText('Prof. Elm')).toBeInTheDocument();
    expect(screen.getByText('ID: 002')).toBeInTheDocument();
    expect(screen.getByText('Youngster Joey')).toBeInTheDocument();
    expect(screen.getByText('ID: 003')).toBeInTheDocument();

    // 50% base chance / 3 contacts = 16.7% each
    const probabilityElements = screen.getAllByText('16.7%');
    expect(probabilityElements).toHaveLength(3);
  });

  it('displays 0% probabilities when delayed', () => {
    render(<ActiveCallersDashboard contacts={mockContacts} timerState={delayedTimerState} />);

    // Check global status
    expect(screen.getByText('15 MINS REMAINING')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();

    // Individual probability should be 0.0%
    const probabilityElements = screen.getAllByText('0.0%');
    expect(probabilityElements).toHaveLength(3);
  });
});
