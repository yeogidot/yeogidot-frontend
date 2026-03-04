import BlackBackIcon from '@assets/icons/back-black.svg';
import FileSelectButton from '@components/Buttons/FileSelectButton/FileSelectButton';
import Button from '@components/Buttons/Button/Button';
import type { FullPhotoData } from 'src/types/photo.type';
import classes from './EditTravelHome.module.css';
import DatePhotoGrid from '@components/DatePhotoGrid/DatePhotoGrid';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCreatedDateTime, getGPSCoordinates } from 'src/utils/exif';
import { useEditTravel } from '@hooks/travel';
import { dateCompare } from '@utils/date';
import { useState } from 'react';
const checkFileExtension = (file: File, extensions: string[]) => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (fileExtension === undefined) {
    return false;
  }
  return extensions.includes(fileExtension);
};

export default function EditTravelHome() {
  const { travel, setTravel, loading } = useEditTravel();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [titleErrorText, setTitleErrorText] = useState('');
  const [photoErrorText, setPhotoErrorText] = useState('');

  const setThumbnailPhotoId = (id: number | string) => {
    setTravel(travel => {
      return { ...travel, thumbnailPhotoId: id };
    });
  };
  const setPhotos = (photos: FullPhotoData[]) => {
    setTravel(travel => {
      return { ...travel, photos };
    });
  };

  const setTravelTitle = (title: string) => {
    setTravel(travel => {
      return { ...travel, title: title };
    });
  };
  const handleTravelTitleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value !== '') {
      setTitleErrorText('');
    }
    setTravelTitle(e.target.value);
  };
  const handleClickNextButton = () => {
    if (travel.title === '') {
      setTitleErrorText('여행 이름을 입력해주세요.');
      return;
    }
    if (travel.photos.length === 0) {
      setPhotoErrorText('사진을 업로드 해주세요.');
      return;
    }
    if (
      travel.thumbnailPhotoId === null ||
      !travel.photos.find(({ id }) => travel.thumbnailPhotoId === id)
    ) {
      const earliestPhoto = [...travel.photos]
        .sort(dateCompare)
        .find(({ date }) => date);
      setThumbnailPhotoId(
        earliestPhoto ? earliestPhoto.id : travel.photos[0].id
      );
    }
    navigate('select-thumbnail', { state });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArray = Array.from(e.target.files ?? []);
    setPhotoErrorText('');

    if (fileArray.length === 0) {
      return;
    }
    if (
      fileArray.find(
        file => checkFileExtension(file, ['jpg', 'jpeg']) === false
      )
    ) {
      setPhotoErrorText('사진은 jpg 형식만 업로드 가능합니다.');
      return;
    }

    const addedPhotos = await Promise.all(
      fileArray.map(async file => {
        return {
          id: Date.now(),
          url: URL.createObjectURL(file),
          date: await getCreatedDateTime(file),
          GPSCoordinates: await getGPSCoordinates(file),
          link: 'photo',
          file,
        };
      })
    );
    const warnedPhotos = addedPhotos.map(photo => {
      return { ...photo, warning: photo.GPSCoordinates === null };
    });
    const newPhotos = [...travel.photos, ...warnedPhotos];
    setPhotos(newPhotos);
  };
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <button
          className={classes.backButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={BlackBackIcon} alt="뒤로가기 버튼 이미지" />
        </button>
        <h1 className={classes.headerText}>여행 수정</h1>
      </header>
      {loading ? (
        <p className={classes.loadingText}>여행 정보를 불러오는 중입니다...</p>
      ) : (
        <>
          <section className={classes.inputSection}>
            <h3 className={classes.inputHeader}>여행 이름</h3>
            <input
              className={`${classes.textInput} ${titleErrorText !== '' ? classes.textInputError : ''}`}
              onChange={handleTravelTitleInputChange}
              value={travel ? travel.title : ''}
              type="text"
              id="travel-name"
              autoComplete="off"
            />
            {titleErrorText !== '' && (
              <p className={classes.titleErrorHelperText}>{titleErrorText}</p>
            )}
          </section>
          <section className={classes.inputSection}>
            <h3 className={classes.inputHeader}>여행 사진</h3>
            <FileSelectButton
              className={classes.photoSelectButton}
              onChange={handleFileChange}
            >
              사진 업로드
            </FileSelectButton>
            {photoErrorText !== '' && (
              <p className={classes.photoErrorHelperText}>{photoErrorText}</p>
            )}
          </section>
          <p className={classes.uploadDescription}>
            사진 위치 정보가 없으면 위치가 표시 되지 않습니다.
            <br />
            (카카오톡 사진 전송시, 원본 사진 요망)
          </p>

          <DatePhotoGrid photos={travel ? travel.photos : []} />
          <Button className={classes.button} onClick={handleClickNextButton}>
            다음
          </Button>
        </>
      )}
    </div>
  );
}
