import classes from "./EditTravelDiaryPage.module.css"
import BlackBackButton from "src/components/Buttons/BackButton/BlackBackButton/BlackBackButton";

export default function WriteTravelDiaryPage() {
  return (
    <div className={classes.container}>
      <div className={classes.backButtonWrapper}>
        <BlackBackButton />
      </div>
      <h1 className={classes.writeTitleWrapper}>1일차<br/>여행일기 수정</h1>
      <textarea className={classes.textAreaWrapper}></textarea>
    </div>
  );
}
