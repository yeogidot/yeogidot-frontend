import { Routes } from './Routes';
import './App.css';
import { NavermapsProvider } from 'react-naver-maps';
import Snackbar from '@components/Snackbar/Snackbar';

function App() {
  return (
    <NavermapsProvider ncpKeyId={import.meta.env.VITE_NAVER_MAPS_CLIENT_ID}>
      <Routes />
      <Snackbar />
    </NavermapsProvider>
  );
}

export default App;
