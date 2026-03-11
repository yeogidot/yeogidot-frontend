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
    data: travel,
    loading: travelLoading,
    request: fetchTravel,
  } = useApi(travelService.getTravel);

  const {
    request: updateLog,
    loading: updateLogLoading,
  } = useApi(travelService.updateTravelLog);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (travelId && token) {
      fetchTravel(Number(travelId), token);
    }
  }, [travelId]);

  const dayTravel = travel?.days.find(d => d.dayNumber === Number(day));

  useEffect(() => {
    const rawContent = dayTravel?.diary?.content || (typeof dayTravel?.diary === 'string' ? dayTravel.diary : undefined);
    if (rawContent) {
      setDiaryText(rawContent);
    }
  }, [dayTravel]);

  const handleBackClick = () => navigate(-1);

  // ✅ 작성 버튼 클릭 시
  const handleSave = async () => {
    const token = localStorage.getItem('accessToken');
    const logId = dayTravel?.diary?.logId || dayTravel?.logId;
    if (logId && token && diaryText.trim()) {
      await updateLog(logId, diaryText, token);
      navigate(-1);
    }
  };

  if (travelLoading) return <div>Loading...</div>;

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
