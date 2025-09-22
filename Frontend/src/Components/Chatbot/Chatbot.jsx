import React, { useEffect } from 'react';

function Chatbot() {
  useEffect(() => {
    // Load Botpress webchat main script
    const mainScript = document.createElement('script');
    mainScript.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    mainScript.defer = true;
    mainScript.onload = () => {
      // Only load your bot script after main script is ready
      const botScript = document.createElement('script');
      botScript.src = "https://files.bpcontent.cloud/2025/09/18/04/20250918045521-Z99QN46H.js";
      botScript.defer = true;
      document.body.appendChild(botScript);
    };

    document.body.appendChild(mainScript);

    // Cleanup scripts
    return () => {
      document.body.removeChild(mainScript);
    };
  }, []);

  return null; // Chat bubble is injected by Botpress scripts
}

export default Chatbot;
