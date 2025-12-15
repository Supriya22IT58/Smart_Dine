// components/SplashScreen.js
import React from "react";

function SplashScreen() {
  return (
    <div className="splash-root">
      <div className="splash-card">
        <div className="splash-logo">SD</div>
        <h1>SmartDine</h1>
        <p>Your AI-powered food discovery assistant for campus life.</p>
        <div className="splash-loader" />
      </div>
    </div>
  );
}

export default SplashScreen;
