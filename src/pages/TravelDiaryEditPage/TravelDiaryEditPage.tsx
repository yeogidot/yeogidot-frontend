import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import classes from "./TravelDiaryEditPage.module.css";
import BlackBackButton from "src/components/Buttons/BackButton/BlackBackButton/BlackBackButton";
import { sampleDiaryEntries } from '../../data/sampleTravelData';
import Button from '@components/Buttons/Button/Button';

export default function TravelDiaryPage() {
  const { travelId, day } = useParams<{ travelId: string; day: string }>();
  const navigate = useNavigate();
  const diaryEntry =
    sampleDiaryEntries.find(
      entry => entry.travelId === travelId && entry.day === Number(day)
    ) || sampleDiaryEntries[0];

  // ✅ textarea 상태
  const [diaryText, setDiaryText] = useState(
    diaryEntry.existingDiary || ''
  );

  const handleBackClick = () => navigate(-1);

  // ✅ 작성 버튼 클릭 시(실제 저장은 백엔드 연동시 이뤄지도록 변경 예정)
  const handleSave = () => navigate(-1);

  return (
    <div className={classes.container}>
      <div className={classes.backButtonWrapper}>
        <BlackBackButton onClick={handleBackClick} />
      </div>

      <div className={classes.panel}>
        <h1 className={classes.writeTitleWrapper}>
          {diaryEntry.day}일차<br />여행일기 수정
        </h1>

        <textarea
          className={classes.textAreaWrapper}
          placeholder={diaryEntry.placeholder}
          value={diaryText}
          onChange={(e) => setDiaryText(e.target.value)}
        />

        <div className={classes.finishButton}>
          <Button onClick={handleSave}>수정</Button>
        </div>
      </div>
    </div>
  );
}
