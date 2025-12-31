import { useParams } from 'react-router-dom';
import classes from './WriteTravelPhotoComment.module.css'
import BackButton from 'src/components/Buttons/BackButton/GrayBackButton/GrayBackButton'
import DeleteButton from 'src/components/Buttons/DeleteButton/DeleteButton'
import { samplePhotoComments } from '../../data/sampleTravelData'

export default function WriteTravelPhotoComment() {
  const { photoId } = useParams<{ photoId: string }>();

  // 해당 사진에 맞는 코멘트 데이터 찾기
  const photoComment = samplePhotoComments.find(
    comment => comment.photoId === photoId
  ) || samplePhotoComments[0]; // 기본값으로 첫 번째 항목 사용

  // 날짜 포맷팅 함수
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className={classes.container}>
      <div className={classes.topPanel}>
        <div className={classes.dayTravelPhoto}>
          <img
            src={photoComment.photo.url}
            alt={`여행 사진 ${photoComment.photoId}`}
          />
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
            <a>부산여행:{photoComment.day}일차</a>
            <br/>
            {formatDate(photoComment.photo.timestamp)}
            <br/>
            {/* 위치 정보는 실제로는 역지오코딩으로 얻어야 하지만, 샘플에서는 고정 값 사용 */}
            부산광역시 부산진구
        </div>
        <textarea
          className={classes.textAreaWrapper}
          placeholder={photoComment.placeholder}
          defaultValue={photoComment.existingComment || ''}
        />
      </div>
    </div>
  );
}
