import React from "react";
import '../App.css';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = "Zapisywanie danych...",
}) => {
  return (
    <div className="loading-overlay">
      <div className="loading-modal">
        <div className="spinner" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;