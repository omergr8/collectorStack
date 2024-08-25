import React, { ReactNode } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, position = 'top' }) => {
  return (
    <div className={`${styles.tooltipContainer}`}>
      {children}
      <span className={`${styles.tooltipText} ${styles[position]}`}>{text}</span>
    </div>
  );
};

export default Tooltip;
