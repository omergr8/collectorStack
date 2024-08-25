import React from "react";

interface CardLayoutProps {
  children: React.ReactNode;
}

const CardLayout: React.FC<CardLayoutProps> = ({ children }) => {
  return (
    <div >
      <div className="grid-container">{children}</div>
    </div>
  );
};

export default CardLayout;
