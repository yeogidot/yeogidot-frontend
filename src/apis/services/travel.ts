import type {
  FullTravel,
  NewTravelInfo,
  SharedTravelUrl,
  TravelDay,
} from 'src/types/travel.type';
import { http } from '../http';
import { photoService } from './photo';

export const travelService = {
  getTravel: (id: number, token: string) => {
    return http.get<FullTravel>(`/api/travels/${id}`, token);
  },
  getTravels: (token: string) => {
    return http.get<FullTravel[]>(`/api/travels/`, token);
  },
  getTravelDay: (travelId: number, dayNumber: number, token: string) => {
    return http.get<TravelDay>(
      `/api/travels/${travelId}/days/${dayNumber}`,
      token
    );
  },
  getSharedUrl: (travelId: number, token: string) => {
    return http.get<SharedTravelUrl>(`/api/travels/${travelId}/share`, token);
  },
  getSharedTravel: (travelId: number, shareToken: string) => {
    return http.get<FullTravel>(`/api/travels/${travelId}/share/${shareToken}`);
  },

  createTravel: async (travel: NewTravelInfo, token: string) => {
    const metadataArray = travel.photos.map(
      ({ date, GPSCoordinates, file }) => {
        return {
          takenAt: date,
          longitude: GPSCoordinates?.longitude ?? null,
          latitude: GPSCoordinates?.latitude ?? null,
          originalName: file.name,
        };
      }
    );
    // 현재는 브라우저에서 만든 ID로 대표 이미지를 지정하고 있음, 근데 여행을 생성할 때는 업로드한 사진의 ID 필요
    // 사진 파일의 이름과 찍은 시간이 같으면 같은 대표 이미지로 취급하여 ID 선택
    if (travel.thumbnailPhotoId === null) {
      throw new Error('대표 이미지 정보가 없습니다.');
    }
    const uploadedData = await photoService.uploadPhoto(
      travel.photos.map(({ file }) => file),
      metadataArray,
      token
    );
    if (uploadedData.data === undefined) {
      throw new Error('업로드한 사진 데이터를 불러올 수 없습니다.');
    }
    const localRepresentativePhoto = travel.photos.find(
      photo => photo.id === travel.thumbnailPhotoId
    );
    const uploadedRepresentativePhoto = uploadedData.data.uploadedPhotos.find(
      photo =>
        photo.takenAt === localRepresentativePhoto?.date &&
        photo.originalName === localRepresentativePhoto?.file.name
    );

    if (uploadedRepresentativePhoto === undefined) {
      throw new Error('업로드 된 대표 이미지를 알 수 없습니다.');
    }
    const photoIdArray = uploadedData.data.uploadedPhotos.map(({ id }) => id);
    return http.post<number>(
      `/api/travels`,
      {
        title: travel.title,
        photoIds: photoIdArray,
        representativePhotoId: uploadedRepresentativePhoto.id,
      },
      token
    );
  },
  addNewTravelDay: (travelId: string, date: string, token: string) => {
    return http.post(`/api/travels/${travelId}/days`, { date }, token);
  },
  addNewPhotoIds: (dayId: number, photoIds: number[], token: string) => {
    return http.post(`/api/travels/days/${dayId}/photos`, { photoIds }, token);
  },
  createNewTravelLog: (dayId: number, content: string, token: string) => {
    return http.post(`/api/travels/days/${dayId}/logs`, { content }, token);
  },
  deleteTravel: (id: number, token: string) => {
    return http.delete(`/api/travels/${id}`, token);
  },
  updateTravelInfo: (
    travelId: number,
    newTravelInfo: Partial<FullTravel>,
    token: string
  ) => {
    return http.patch<{ status: number; message: string }>(
      `/api/travels/${travelId}`,
      newTravelInfo,
      token
    );
  },
  deleteTravelDay: (dayId: number, token: string) => {
    return http.delete(`/api/travels/days/${dayId}`, token);
  },
  updateTravelLog: (logId: number, content: string, token: string) => {
    return http.put(`/api/travels/logs/${logId}`, { content }, token);
  },
  deleteTravelLog: (logId: number, token: string) => {
    return http.delete(`/api/travels/logs/${logId}`, token);
  },
};
