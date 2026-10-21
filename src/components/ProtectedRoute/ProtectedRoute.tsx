import { Navigate, Outlet } from 'react-router-dom';

/**
 * 로그인이 필요한 페이지를 보호하는 컴포넌트입니다.
 * 토큰이 없으면 안내 없이 로그인 페이지로 이동합니다.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/login" replace={true} state={{ forward: true }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
