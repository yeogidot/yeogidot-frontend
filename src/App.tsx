import { Routes } from './Routes';
import './App.css';
import { NavermapsProvider } from 'react-naver-maps';

function App() {
  return (
    <NavermapsProvider ncpKeyId={import.meta.env.VITE_NAVER_MAPS_CLIENT_ID}>
      <Routes />
    </NavermapsProvider>
  );
}

export default App;
