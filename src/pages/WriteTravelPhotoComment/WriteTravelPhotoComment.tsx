import classes from './WriteTravelPhotoComment.module.css'
import BackButton from 'src/components/Buttons/BackButton/GrayBackButton/GrayBackButton'
import DeleteButton from 'src/components/Buttons/DeleteButton/DeleteButton'
import { samplePhotos } from '../../data/samplePhotos'

export default function WriteTravelDiaryPage() {
  return (
    <div className={classes.container}>
      <div className={classes.topPanel}>
        <div className={classes.dayTravelPhoto}>
            {samplePhotos.slice(0, 1).map((photo, index) => (
            <img
            key={`${photo.url}-${index}`}
            src={photo.url}
            alt={`여행 사진 ${index + 1}`}
            />
            ))}
        </div>

        <div className={classes.backButtonWrapper}>
            <BackButton/>
        </div>
      </div>
      <div className={classes.bottomPanel}>
        <h1>코멘트</h1>
        <div className={classes.deleteButtonWrapper}>
            <DeleteButton/>
        </div>
        <div className={classes.photoInformation}>
            <a>부산여행:1일차</a>
            <br/>
            2025-10-16
            <br/>
            부산광역시 부산진구
        </div>
        <textarea className={classes.textAreaWrapper}></textarea>
      </div>
    </div>
  );
}
