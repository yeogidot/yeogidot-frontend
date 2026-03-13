import { http } from '../http';
import type {
  FullPhoto,
  PhotoMarkerData,
  PhotoMetadata,
  UploadedFullPhoto,
} from '../../types/photo.type';
import { photoFileToWebp } from '@utils/photo';
export const photoService = {
  uploadPhoto: async (
    photoFileArray: File[],
    metadataArray: PhotoMetadata[],
    token: string
  ) => {
    const formData = new FormData();
    const webpBlobs = await Promise.all(
      photoFileArray.map(async file => photoFileToWebp(file))
    );
    webpBlobs.forEach(blob => {
      return formData.append('files', blob);
    });

    const encodedMetadata = encodeURIComponent(JSON.stringify(metadataArray));
    return http.post<{ uploadedPhotos: UploadedFullPhoto[] }>(
      `/api/photos/upload?metadata=${encodedMetadata}`,
      formData,
      token,
      {}
    );
  },
  getPhotos: (token: string) => {
    return http.get<FullPhoto[]>('/api/photos', token);
  },
  getPhoto: (id: number, token: string) => {
    return http.get<FullPhoto>(`/api/photos/${id}`, token);
  },
  getPhotosForMap: (token: string) => {
    return http.get<Partial<PhotoMarkerData>[]>(
      `/api/photos/map-markers`,
      token
    );
  },
  updatePhotoTakenTime: (id: number, newTakenTime: string, token: string) => {
    return http.put(
      `/api/photos/${id}/taken-at`,
      { content: newTakenTime },
      token
    );
  },
  updatePhotoTravelDay: (photoId: number, dayId: string, token: string) => {
    return http.post(`/api/photos/${photoId}/comments`, { dayId }, token);
  },
  deletePhoto: (id: number, token: string) => {
    return http.delete<{
      message: string;
      status: number;
      deletedPhotoId: number;
    }>(`/api/photos/${id}`, token);
  },
  writePhotoComment: (photoId: number, content: string, token: string) => {
    return http.post(`/api/photos/${photoId}/comments`, { content }, token);
  },
  updatePhotoComment: (photoId: number, content: string, token: string) => {
    return http.put<{ content: string }>(
      `/api/photos/${photoId}/comments`,
      { content },
      token
    );
  },
  deletePhotoComment: (photoId: number, token: string) => {
    return http.delete(`/api/photos/${photoId}/comments`, token);
  },
  updatePhotoInfo: (
    photoId: number,
    newPhotoInfo: Partial<FullPhoto>,
    token: string
  ) => {
    return http.patch<{ status: number; message: string }>(
      `/api/photos/${photoId}`,
      newPhotoInfo,
      token
    );
  },
};
