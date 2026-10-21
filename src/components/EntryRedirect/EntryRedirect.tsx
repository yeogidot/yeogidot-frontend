import { Navigate } from 'react-router-dom';

/**
 * 앱 초기 진입 지점입니다.
 * 보호된 기본 라우팅을 거치지 않고 토큰 유무만으로 목적지를 정해
 * 비로그인 진입 시 안내 모달 없이 로그인 페이지로 이동합니다.
 */
const EntryRedirect = () => {
  const token = localStorage.getItem('accessToken');

  return (
    <Navigate
      to={token ? '/my-travel' : '/login'}
      replace={true}
      state={{ forward: true }}
    />
  );
};

export default EntryRedirect;
