import React from 'react';
import { Target } from 'lucide-react';

interface FireButtonProps {
  onPress: () => void;
  onRelease: () => void;
}

export const FireButton: React.FC<FireButtonProps> = ({ onPress, onRelease }) => {
  return (
    <div 
      className="w-24 h-24 rounded-full bg-orange-950/30 border-2 border-orange-500/40 flex items-center justify-center pointer-events-auto active:scale-90 active:bg-orange-500/20 transition-all shadow-lg active:shadow-orange-500/50"
      onTouchStart={(e) => {
        e.preventDefault();
        onPress();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onRelease();
      }}
    >
      <Target className="w-10 h-10 text-orange-500" />
    </div>
  );
};
