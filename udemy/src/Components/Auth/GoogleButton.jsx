import React, { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

// The Google Identity button is rendered inside an iframe with a fixed pixel
// width, so we measure the container and keep the iframe in sync with it.
const GoogleButton = ({ onSuccess, onError, text = "continue_with" }) => {
  const slotRef = useRef(null);
  const [width, setWidth] = useState(360);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return undefined;

    const updateWidth = () => {
      const next = Math.floor(slot.clientWidth);
      setWidth(Math.max(200, Math.min(400, next)));
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(updateWidth);
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="google-login-slot" ref={slotRef}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        theme="outline"
        size="large"
        shape="rectangular"
        text={text}
        logo_alignment="left"
        width={width}
      />
    </div>
  );
};

export default GoogleButton;
