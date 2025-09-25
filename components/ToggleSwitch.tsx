import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, label }) => {
  return (
    <label htmlFor={label} className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          id={label}
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`block w-14 h-8 rounded-full transition ${enabled ? 'bg-primary' : 'bg-secondary'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${enabled ? 'transform translate-x-6' : ''}`}></div>
      </div>
      <div className="ml-3 text-text-primary font-medium">{label}</div>
    </label>
  );
};
