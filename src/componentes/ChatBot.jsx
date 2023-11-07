import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const configScript = document.createElement('script');
      configScript.src = 'https://mediafiles.botpress.cloud/e57ebb4c-888f-4f51-98db-3a2f85fc63b0/webchat/config.js';
      configScript.defer = true;
      document.body.appendChild(configScript);
    }
  }, []);

  return <div id="webchat" />;
}

export { Chatbot };