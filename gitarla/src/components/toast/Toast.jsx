import { useEffect } from "react";
import "./Toast.css";

export const Toast = ({ type, message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast-card toast-${type}`}>
      <div className="toast-bar"></div>

      <div className="toast-content">
        <div className="toast-icon">
          {type === "success"
            ? "✓"
            : type === "error"
              ? "✕"
              : type === "info"
                ? "i"
                : "!"}
        </div>

        <div className="toast-text">
          <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
          <p>{message}</p>
        </div>

        <button className="toast-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};
