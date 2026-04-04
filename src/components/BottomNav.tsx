import { createComponent } from '@lit/react';
import React from 'react';
import { BottomNav as LitBottomNav } from './lit/bottom-nav';
import { useStore } from '../store';
import { useNavigate, useLocation } from '@tanstack/react-router';

// Create the React wrapper for the Lit component
export const BottomNavWrapper = createComponent({
  tagName: 'lit-bottom-nav',
  elementClass: LitBottomNav,
  react: React,
  events: {
    onNavClick: 'nav-click',
    onSettingsClick: 'settings-click',
  },
});

// React component that bridges the TanStack Router and Zustand state to the Lit component
export function BottomNav() {
  const saveData = useStore((s) => s.saveData);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const location = useLocation();
  const navigate = useNavigate();

  if (!saveData) return null;

  const handleNavClick = (e: Event) => {
    const customEvent = e as CustomEvent<{ path: string }>;
    navigate({ to: customEvent.detail.path });
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  return (
    <BottomNavWrapper
      pathname={location.pathname}
      onNavClick={handleNavClick}
      onSettingsClick={handleSettingsClick}
    />
  );
}
