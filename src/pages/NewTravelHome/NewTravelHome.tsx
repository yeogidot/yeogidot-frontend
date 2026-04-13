import BlackBackIcon from '@assets/icons/back-black.svg';
import FileSelectButton from '@components/Buttons/FileSelectButton/FileSelectButton';
import WebViewImageSelectButton from '@components/Buttons/WebViewImageSelectButton/WebViewImageSelectButton';
import Button from '@components/Buttons/Button/Button';
import type {
  FullPhotoData,
  WebViewSelectImagesResultMessage,
} from 'src/types/photo.type';
import { isReactNativeWebView } from '@utils/webview';
import classes from './NewTravelHome.module.css';
import DatePhotoGrid from '@components/DatePhotoGrid/DatePhotoGrid';
import { useNavigate } from 'react-router-dom';
import { getCreatedDateTime, getGPSCoordinates } from 'src/utils/exif';
import { useTravel } from '@hooks/travel';
import { useEffect, useState } from 'react';
import { dateCompare } from '@utils/date';
import { base64ToFile } from '@utils/photo';

const checkFileExtension = (file: File, extensions: string[]) => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (fileExtension === undefined) {
    return false;
  }
  return extensions.includes(fileExtension);
};

export default function NewTravelHome() {
  const { travel, setTravel } = useTravel();
  const navigate = useNavigate();

  const [titleErrorText, setTitleErrorText] = useState('');
  const [photoErrorText, setPhotoErrorText] = useState('');

  const setThumbnailPhotoId = (id: number | string) => {
    setTravel(travel => {
      return { ...travel, thumbnailPhotoId: id };
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
    navigate('select-thumbnail', {
      viewTransition: true,
      state: { forward: true },
    });
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
        const fileUrl = URL.createObjectURL(file);
        const blobId = new URL(fileUrl.slice(5)).pathname.slice(1);
        return {
          id: blobId,
          url: fileUrl,
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
    setTravel(currentTravel => {
      return {
        ...currentTravel,
        photos: [...currentTravel.photos, ...warnedPhotos],
      };
    });
  };

  useEffect(() => {
    if (!isReactNativeWebView()) {
      return;
    }

    const handleWebViewMessage = (event: MessageEvent<string> | Event) => {
      const messageData = 'data' in event ? event.data : undefined;
      if (typeof messageData !== 'string') {
        return;
      }
      let parsedMessage: unknown;
      try {
        parsedMessage = JSON.parse(messageData);
      } catch {
        return;
      }

      if (
        typeof parsedMessage !== 'object' ||
        parsedMessage === null ||
        !('type' in parsedMessage)
      ) {
        return;
      }
      if (
        parsedMessage.type === 'SELECT_IMAGES_ERROR' &&
        'message' in parsedMessage &&
        typeof parsedMessage.message === 'string'
      ) {
        setPhotoErrorText(parsedMessage.message);
        return;
      }
      if (
        parsedMessage.type !== 'SELECT_IMAGES_RESULT' ||
        !('photos' in parsedMessage) ||
        !Array.isArray(parsedMessage.photos)
      ) {
        return;
      }

      const message = parsedMessage as WebViewSelectImagesResultMessage;
      if (message.photos.length === 0) {
        return;
      }

      setPhotoErrorText('');
      const addedPhotos: FullPhotoData[] = message.photos.map(
        (photo, index) => {
          const fileName = `webview-photo-${Date.now()}-${index}`;
          const file = base64ToFile(photo.photoBase64, fileName);
          const url = URL.createObjectURL(file);
          const blobId = new URL(url.slice(5)).pathname.slice(1);
          return {
            id: blobId,
            url,
            date: photo.date,
            GPSCoordinates: photo.GPSCoordinates,
            link: 'photo',
            file,
            warning: photo.GPSCoordinates === null,
          };
        }
      );

      setTravel(currentTravel => {
        return {
          ...currentTravel,
          photos: [...currentTravel.photos, ...addedPhotos],
        };
      });
    };

    const messageEventListener = handleWebViewMessage as EventListener;
    window.addEventListener('message', messageEventListener);
    document.addEventListener('message', messageEventListener);
    return () => {
      window.removeEventListener('message', messageEventListener);
      document.removeEventListener('message', messageEventListener);
    };
  }, [setTravel]);
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
          value={travel.title}
          type="text"
          id="travel-name"
          autoComplete="off"
        />
        <p
          className={`${classes.titleErrorHelperText} ${titleErrorText === '' ? classes.invisible : ''}`}
        >
          {titleErrorText === '' ? '오류 없음' : titleErrorText}
        </p>
      </section>
      <section className={classes.inputSection}>
        <h3 className={classes.inputHeader}>여행 사진</h3>
        {isReactNativeWebView() ? (
          <WebViewImageSelectButton className={classes.photoSelectButton}>
            사진 업로드
          </WebViewImageSelectButton>
        ) : (
          <FileSelectButton
            className={classes.photoSelectButton}
            onChange={handleFileChange}
          >
            사진 업로드
          </FileSelectButton>
        )}
      </section>
      <div>
        <p className={classes.uploadDescription}>
          사진 위치 정보가 없으면 위치가 표시 되지 않습니다.
          <br />
          (카카오톡 사진 전송시, 원본 사진 요망)
        </p>
        <p
          className={`${classes.photoErrorHelperText} ${photoErrorText === '' ? classes.invisible : ''}`}
        >
          {photoErrorText === '' ? '오류 없음' : photoErrorText}
        </p>
      </div>

      <DatePhotoGrid photos={travel.photos} />
      <Button className={classes.button} onClick={handleClickNextButton}>
        다음
      </Button>
    </div>
  );
}
