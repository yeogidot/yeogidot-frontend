import classes from './AppLaunchBanner.module.css';

interface AppLaunchBannerProps {
  onAppLaunch: () => void;
}

export default function AppLaunchBanner({ onAppLaunch }: AppLaunchBannerProps) {
  return (
    <div className={classes.bannerContainer}>
      <div className={classes.bannerContent}>
        <span className={classes.bannerText}>앱에서 더 편하게 여행기록을 확인하세요!</span>
        <button className={classes.launchButton} onClick={onAppLaunch}>
          앱에서 열기
        </button>
      </div>
    </div>
  );
}
