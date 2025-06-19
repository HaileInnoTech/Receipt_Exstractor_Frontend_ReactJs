import { useEffect, useState } from "react";
import * as msgConfig from "@/config/msgConfig";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  const [loadingText, setLoadingText] = useState(msgConfig.LOADING_TEXT);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingText((prev) =>
        prev === msgConfig.LOADING_TEXT
          ? msgConfig.LOADING_TEXT + "."
          : prev.length < msgConfig.LOADING_TEXT.length + 3
          ? prev + "."
          : msgConfig.LOADING_TEXT
      );
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
      <span style={styles.text}>{loadingText}</span>
    </div>
  );
};

export default Loading;

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: 50,
    height: 50,
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
};

// Inject the keyframes into document (for animation to work)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`,
  styleSheet.cssRules.length
);
