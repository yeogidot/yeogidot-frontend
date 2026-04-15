import { useEffect, useState, useCallback } from 'react';

export const useAppScheme = (shareToken: string | undefined, additionalPath: string = '') => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('type') === 'app') {
      setIsMobile(false);
      return;
    }

    const userAgent = navigator.userAgent.toLowerCase();
    const _isAndroid = userAgent.indexOf('android') > -1;
    const _isIOS = /iphone|ipad|ipod/.test(userAgent);
    
    if (_isAndroid || _isIOS) {
      setIsMobile(true);
    } else {
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
    const pathWithAppType = `${pathSegments}${pathSegments.includes('?') ? '&' : '?'}type=app`;
    
    const schemeUrl = `${SCHEME}://${pathWithAppType}`;
    const intentUrl = `intent://${pathWithAppType}#Intent;scheme=${SCHEME};package=${PACKAGE_NAME};end`;

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
