import { Navigate, Outlet } from 'react-router-dom';

/**
 * 로그인이 필요한 페이지를 보호하는 컴포넌트입니다.
 * 토큰이 없으면 로그인 페이지로 리다이렉트합니다.
 */
const ProtectedRoute = () => {
    // 현재 프로젝트에서 혼용되는 키 확인 (로그인 로직에 맞춤)
    const token = localStorage.getItem('accessToken');

    if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
