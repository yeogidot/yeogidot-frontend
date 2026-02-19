import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from "./TravelDiaryEditPage.module.css";
import BlackBackButton from "src/components/Buttons/BackButton/BlackBackButton/BlackBackButton";
import Button from '@components/Buttons/Button/Button';
import { travelService } from 'src/apis/services/travel';
import { useApi } from 'src/hooks/api';

export default function TravelDiaryEditPage() {
  const { travelId, day } = useParams<{ travelId: string; day: string }>();
  const navigate = useNavigate();
  const [diaryText, setDiaryText] = useState('');

  const {
    data: dayTravel,
    loading: dayTravelLoading,
    request: fetchDayTravel,
  } = useApi(travelService.getTravelDay);

  const {
    request: updateLog,
    loading: updateLogLoading,
  } = useApi(travelService.updateTravelLog);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (travelId && day) {
      fetchDayTravel(Number(travelId), Number(day), token);
    }
  }, [travelId, day]);

  useEffect(() => {
    if (dayTravel?.diary) {
      setDiaryText(dayTravel.diary.content);
    }
  }, [dayTravel]);

  const handleBackClick = () => navigate(-1);

  // ✅ 작성 버튼 클릭 시
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (dayTravel?.diary && token && diaryText.trim()) {
      await updateLog(dayTravel.diary.logId, diaryText, token);
      navigate(-1);
    }
  };

  if (dayTravelLoading) return <div>Loading...</div>;

  return (
    <div className={classes.container}>
      <div className={classes.backButtonWrapper}>
        <BlackBackButton onClick={handleBackClick} />
      </div>

      <div className={classes.panel}>
        <h1 className={classes.writeTitleWrapper}>
          {day}일차<br />여행일기 수정
        </h1>

        <textarea
          className={classes.textAreaWrapper}
          placeholder="여행 일기를 작성해주세요."
          value={diaryText}
          onChange={(e) => setDiaryText(e.target.value)}
        />

        <div className={classes.finishButton}>
          <Button onClick={handleSave} disabled={updateLogLoading}>
            {updateLogLoading ? '수정 중...' : '수정'}
          </Button>
        </div>
      </div>
    </div>
  );
}
