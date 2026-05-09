import type React from 'react';
import { cn } from '../utils/cn';

interface TacticalModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  containerClassName?: string;
  backdropClassName?: string;
  modalClassName?: string;
}

export function TacticalModal({
  isOpen,
  onClose,
  children,
  containerClassName,
  backdropClassName,
  modalClassName,
}: TacticalModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn('fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4', containerClassName)}
    >
      <div
        aria-hidden="true"
        className={cn(
          'fade-in absolute inset-0 animate-in bg-black/80 backdrop-blur-sm duration-300',
          backdropClassName,
        )}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'slide-in-from-bottom-[100%] sm:zoom-in-95 relative w-full animate-in duration-300',
          modalClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
