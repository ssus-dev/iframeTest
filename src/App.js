import React, { useRef, useEffect, useState } from 'react';

function App() {
  const iframeRef = useRef(null);
  const [isIframeVisible, setIsIframeVisible] = useState(false);

  const TOKEN = 'test-token-12345';
  const IFRAME_URL = 'http://localhost:8081';
  // const IFRAME_URL = 'https://web-iap-subscription.iap-dev.samsungapps.com';

  useEffect(() => {
    // iframe에서 오는 메시지 리스너
    const handleMessage = (event) => {
      if (event.origin !== IFRAME_URL) return;


      // if (event.data?.type === 'READY') {
      //   iframeRef.current?.contentWindow.postMessage(
      //     { type: 'TOKEN', token: TOKEN },
      //     IFRAME_URL
      //   );
      // }



      if (event.data && event.data.type === 'back') {
        console.log('iframe에서 back 메시지를 받았습니다');
        setIsIframeVisible(false);
      }

      if (event.data && event.data.type === 'close') {
        console.log('iframe에서 close 요청을 받았습니다');
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
      <div style={{width:'100%',height:'800px',border:'1px solid #ccc'}}>
        <a onClick={handleOpenIframe} >
          구독관리(iframe 호출)
        </a>
        <a  href='https://galaxystore.samsung.com/discover'>새로운 발견</a>
        <a  href='https://galaxystore.samsung.com/games'>게임</a>

        <div style={{height:'100%'}}>
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
              style={{display:'block',width:'100%',height:'calc(100% - 64px)'}}
            />
          )}
        </div>
       
       
      </div>
    </div>
  );
}

export default App;
