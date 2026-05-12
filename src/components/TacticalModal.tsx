import React from 'react';
import { cn } from '../utils/cn';

export interface TacticalModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  containerClassName?: string;
  backdropClassName?: string;
  dialogClassName?: string;
  role?: React.AriaRole;
  ariaModal?: boolean | 'true' | 'false';
}

export const TacticalModal = React.forwardRef<HTMLDivElement, TacticalModalProps>(
  (
    {
      isOpen,
      onClose,
      children,
      containerClassName,
      backdropClassName,
      dialogClassName,
      role = 'dialog',
      ariaModal = true,
    },
    ref,
  ) => {
    if (!isOpen) return null;

    return (
      <div className={cn('fixed inset-0 z-50 flex items-center justify-center p-4', containerClassName)}>
        <div
          aria-hidden="true"
          className={cn(
            'fade-in absolute inset-0 animate-in bg-black/80 backdrop-blur-sm duration-300',
            backdropClassName,
          )}
          onClick={onClose}
        />
        <div
          ref={ref}
          role={role}
          {...(role === 'dialog' || role === 'alertdialog' ? { 'aria-modal': ariaModal } : {})}
          className={cn('zoom-in-95 relative w-full animate-in shadow-2xl duration-300', dialogClassName)}
        >
          {children}
        </div>
      </div>
    );
  },
);

TacticalModal.displayName = 'TacticalModal';
