import React from "react";
import { usePWAInstall } from "./usePWAinstall";

export function InstallButton() {
  const { promptInstall, deferredPrompt } = usePWAInstall();

  if (!deferredPrompt) return null; // Hide button if install is unavailable

  return (
    <button onClick={promptInstall} className="install-button">
      Install Web App
    </button>
  );
}
