import { http } from '../http';
import type { FullPhoto, PhotoMetadata } from '../../types/photo.type';
export const photoService = {
  uploadPhoto: (
    photoFileArray: File[],
    metadataArray: PhotoMetadata[],
    token: string
  ) => {
    const formData = new FormData();
    photoFileArray.forEach(file => formData.append('files', file));

    const encodedMetadata = encodeURIComponent(JSON.stringify(metadataArray));
    return http.post<{ uploadedPhotos: FullPhoto[] }>(
      `/api/photos/upload?${encodedMetadata}`,
      formData,
      token,
      { 'Content-Type': 'multi-part/formdata' }
    );
  },
  getPhotos: (token: string) => {
    return http.get<FullPhoto[]>('/api/photos', token);
  },
  getPhoto: (id: number, token: string) => {
    return http.get<FullPhoto>(`/api/photos/${id}`, token);
  },
  getPhotosForMarker: (token: string) => {
    return http.get<Partial<FullPhoto[]>>(`/api/photos/map-marker`, token);
  },
  updatePhotoTakenTime: (id: number, newTakenTime: string, token: string) => {
    return http.put(
      `/api/photos/${id}/taken-at`,
      { content: newTakenTime },
      token
    );
  },
  deletePhoto: (id: number, token: string) => {
    return http.get<{
      message: string;
      status: number;
      deletedPhotoId: number;
    }>(`/api/photos/${id}`, token);
  },
  writePhotoComment: (photoId: number, content: string, token: string) => {
    return http.post(`/api/v1/photos/${photoId}/comments`, { content }, token);
  },
  // TODO: 사진의 여행날짜 수정, 코멘트 수정은 추후 백엔드 API 수정 후 구현 예정
  // 수정 후 url 중간 경로('v1') 역시 통일 필요
};
