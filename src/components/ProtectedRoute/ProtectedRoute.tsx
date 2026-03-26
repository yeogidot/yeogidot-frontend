import { Outlet, useNavigate } from 'react-router-dom';
import useModal from '@hooks/useModal';

/**
 * 로그인이 필요한 페이지를 보호하는 컴포넌트입니다.
 * 토큰이 없으면 로그인 페이지로 리다이렉트합니다.
 */
const ProtectedRoute = () => {
  // 현재 프로젝트에서 혼용되는 키 확인 (로그인 로직에 맞춤)
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const { modalElement } = useModal(
    !token
      ? {
          title: '권한없음',
          message: '로그인이 필요한 서비스 입니다.',
          cancelText: '취소',
          confirmText: '확인',
          onCancel: () => navigate('/error/401', { replace: true }),
          onConfirm: () => navigate('/login', { replace: true }),
        }
      : undefined
  );

  if (!token) {
    return modalElement;
  }

  return <Outlet />;
};

export default ProtectedRoute;
