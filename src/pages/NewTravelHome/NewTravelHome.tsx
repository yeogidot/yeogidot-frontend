import BlackBackIcon from '@assets/icons/back-black.svg';
import FileSelectButton from '@components/Buttons/FileSelectButton/FileSelectButton';
import Button from '@components/Buttons/Button/Button';
import type { DatedPhotoData, FullPhotoData } from 'src/types/photo.type';
import classes from './NewTravelHome.module.css';
import DatePhotoGrid from '@components/DatePhotoGrid/DatePhotoGrid';
import { useNavigate } from 'react-router-dom';
import { getCreatedDateTime, getGPSCoordinates } from 'src/utils/exif';
import { useTravel } from '@hooks/travel';
import { useState } from 'react';
const createPhotoDateMap = (photos: DatedPhotoData[]) => {
  return photos.reduce((photoDateMap, currentPhoto) => {
    const date = currentPhoto.date ? currentPhoto.date.split('T')[0] : null;
    const photos = photoDateMap.get(date);
    if (photos) {
      return photoDateMap.set(date, [...photos, currentPhoto]);
    }
    return photoDateMap.set(date, [currentPhoto]);
  }, new Map<string | null, DatedPhotoData[]>());
};

export default function NewTravelHome() {
  const [travel, setTravel] = useTravel();
  const navigate = useNavigate();
  const photos = travel.photos;
  const [titleErrorText, setTitleErrorText] = useState('');

  const setPhotos = (photos: FullPhotoData[]) => {
    setTravel(travel => {
      return { ...travel, photos };
    });
  };

  const setThumbnailPhotoId = (id: number) => {
    setTravel(travel => {
      return { ...travel, thumbnailPhotoId: id };
    });
  };

  const travelTitle = travel.title;
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
    navigate('select-thumbnail');
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhotosPromises = Array.from(e.target.files ?? []).map(
      async file => {
        return {
          id: travel.photos.length,
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
          date: await getCreatedDateTime(file),
          GPSCoordinates: await getGPSCoordinates(file),
          link: 'photo',
        };
      }
    );

    const newPhotos = await Promise.all(newPhotosPromises);
    setPhotos([...photos, ...newPhotos]);
    const earlyestPhotoId = [...photos, ...newPhotos]
      .filter(photo => photo.date)
      .reduce((earlyestPhoto, photo) => {
        return Date.parse(earlyestPhoto.date as string) >
          Date.parse(photo.date as string)
          ? photo
          : earlyestPhoto;
      }).id;

    setThumbnailPhotoId(earlyestPhotoId);
  };
  const photoDateMap = createPhotoDateMap(
    photos.map(photo => {
      return { ...photo, warning: photo.GPSCoordinates === null };
    })
  );
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
        <h1 className={classes.headerText}>새 여행 추가</h1>
      </header>
      <section className={classes.inputSection}>
        <h3 className={classes.inputHeader}>여행 이름</h3>
        <input
          className={`${classes.textInput} ${titleErrorText !== '' ? classes.textInputError : ''}`}
          onChange={handleTravelTitleInputChange}
          value={travelTitle}
          type="text"
          id="travel-name"
          autoComplete="off"
        />
        {titleErrorText !== '' && (
          <p className={classes.inputErrorHelperText}>{titleErrorText}</p>
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
      </section>
      <p className={classes.uploadDescription}>
        사진 위치 정보가 없으면 위치가 표시 되지 않습니다.
        <br />
        (카카오톡 사진 전송시, 원본 사진 요망)
      </p>
      <DatePhotoGrid photoDateMap={photoDateMap} />
      <Button className={classes.button} onClick={handleClickNextButton}>
        다음
      </Button>
    </div>
  );
}
