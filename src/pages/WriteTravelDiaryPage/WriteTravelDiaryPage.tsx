import { useParams } from 'react-router-dom';
import classes from "./WriteTravelDiaryPage.module.css"
import BlackBackButton from "src/components/Buttons/BackButton/BlackBackButton/BlackBackButton";
import { sampleDiaryEntries } from '../../data/sampleTravelData';

export default function WriteTravelDiaryPage() {
  const { travelId, day } = useParams<{ travelId: string; day: string }>();

  // 해당 여행과 일차에 맞는 일기 데이터 찾기
  const diaryEntry = sampleDiaryEntries.find(
    entry => entry.travelId === travelId && entry.day === parseInt(day || '1')
  ) || sampleDiaryEntries[0]; // 기본값으로 첫 번째 항목 사용

  return (
    <div className={classes.container}>
      <div className={classes.backButtonWrapper}>
        <BlackBackButton />
      </div>
      <h1 className={classes.writeTitleWrapper}>
        {diaryEntry.day}일차<br/>여행일기 작성
      </h1>
      <textarea
        className={classes.textAreaWrapper}
        placeholder={diaryEntry.placeholder}
        defaultValue={diaryEntry.existingDiary || ''}
      />
    </div>
  );
}
