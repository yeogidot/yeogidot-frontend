import { useEffect, useState, useCallback } from 'react';

export const useAppScheme = (shareToken: string | undefined, additionalPath: string = '') => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const _isAndroid = userAgent.indexOf('android') > -1;
    const _isIOS = /iphone|ipad|ipod/.test(userAgent);
    // PC에서도 배너를 보여주고 테스트할 수 있도록 true로 둡니다. (또는 테스트 끝나면 _isAndroid || _isIOS 로 변경)
    if (_isAndroid || _isIOS) {
      setIsMobile(true);
    } else {
       // 모바일 뷰 시뮬레이터에서 작동 확인을 위해 브라우저 가로 크기가 작으면 노출하도록 처리 (옵션)
      if (window.innerWidth <= 768) {
         setIsMobile(true);
      }
    }
  }, []);

  const launchAppScheme = useCallback(() => {
    if (!shareToken) return;

    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.indexOf('android') > -1;
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    const SCHEME = 'yeogidot';
    const PACKAGE_NAME = 'com.yeogidot.app';
    const pathSegments = `share/${shareToken}${additionalPath ? `/${additionalPath}` : ''}`;
    
    const schemeUrl = `${SCHEME}://${pathSegments}`;
    const intentUrl = `intent://${pathSegments}#Intent;scheme=${SCHEME};package=${PACKAGE_NAME};end`;

    if (isAndroid) {
      window.location.href = intentUrl;
    } else if (isIOS) {
      window.location.href = schemeUrl;
    } else {
      console.log('📱 PC 환경 감지됨: 테스트를 위해 기본 스킴을 호출해 봅니다.', schemeUrl);
      window.location.href = schemeUrl;
    }
  }, [shareToken, additionalPath]);

  return { isMobile, launchAppScheme };
};
