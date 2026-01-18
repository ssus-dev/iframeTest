import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const iframeRef = useRef(null);
  const [isIframeVisible, setIsIframeVisible] = useState(false);

  const TOKEN = 'cVNISMPitAnqT8dqcjJsj6i2q';
  const IFRAME_URL = 'http://localhost:8081';
  // const IFRAME_URL = 'https://web-iap-subscription.iap-dev.samsungapps.com';

  useEffect(() => {
    // iframe에서 오는 메시지 리스너
    const handleMessage = (event) => {
      if (event.origin !== IFRAME_URL) return;

      if (event.data && event.data.type === 'back') {
        console.log('iframe에서 back 메시지를 받았습니다!');
        setIsIframeVisible(false);
        // 원하는 동작 실행 (예: 뒤로가기, 모달 닫기 등)
      }

      if (event.data === 'close') {
        console.log('iframe에서 close 요청을 받았습니다!');
        setIsIframeVisible(false);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleOpenIframe = () => {
    console.log('iframe 열기 버튼 클릭됨');
    setIsIframeVisible(true);
  };

  const handleIframeLoad = () => {
    if (iframeRef.current && isIframeVisible) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'TOKEN',
          token: TOKEN
        },
        IFRAME_URL
      );
    }
  };

  return (
    <div className="App">
      <div className="iframe-container">
        <button onClick={handleOpenIframe} className="open-button">
          iframe 호출
        </button>
        {isIframeVisible && (
          <iframe
            ref={iframeRef}
            id="subscriptionFrame"
            src={IFRAME_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            onLoad={handleIframeLoad}
            title="Subscription Frame"
          />
        )}
      </div>
    </div>
  );
}

export default App;
