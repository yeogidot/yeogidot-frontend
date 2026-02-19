import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classes from "./TravelDiaryPage.module.css";
import BlackBackButton from "src/components/Buttons/BackButton/BlackBackButton/BlackBackButton";
import Button from '@components/Buttons/Button/Button';
import { travelService } from 'src/apis/services/travel';
import { useApi } from 'src/hooks/api';

export default function TravelDiaryPage() {
  const { travelId, day } = useParams<{ travelId: string; day: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const {
    data: dayTravel,
    request: fetchDayTravel,
  } = useApi(travelService.getTravelDay);

  const {
    request: createLog,
    loading: createLogLoading,
  } = useApi(travelService.createNewTravelLog);

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

  const handleBackClick = () => navigate(-1);

  // ✅ 작성 버튼 클릭 시
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (dayTravel && token && content.trim()) {
      await createLog(dayTravel.dayId, content, token);
      navigate(-1);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.backButtonWrapper}>
        <BlackBackButton onClick={handleBackClick} />
      </div>

      <div className={classes.panel}>
        <h1 className={classes.writeTitleWrapper}>
          {day}일차<br />여행일기 작성
        </h1>

        <textarea
          className={classes.textAreaWrapper}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="여행 일기를 작성해주세요."
        />

        <div className={classes.finishButton}>
          <Button onClick={handleSave} disabled={createLogLoading}>
            {createLogLoading ? '저장 중...' : '작성'}
          </Button>
        </div>
      </div>
    </div>
  );
}
