import { encode } from '@jsquash/webp';

export async function photoFileToWebp(photoFile: File) {
  return new Promise<File>((resolve, reject) => {
    const imageURL = URL.createObjectURL(photoFile);
    const image = new Image();
    image.onerror = () => {
      reject(
        new Error('이미지 변환에 사용될 이미지를 불러오기 실패하였습니다.')
      );
      URL.revokeObjectURL(imageURL);
    };
    image.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      if (!context) {
        reject(
          new Error('이미지 변환에 필요한 Canvas Context를 찾을 수 없습니다.')
        );
        return;
      }
      context.drawImage(image, 0, 0);
      try {
        const photoImageData = context.getImageData(
          0,
          0,
          image.width,
          image.height
        );
        const webpArrayBuffer = await encode(photoImageData);
        const webpFile = new File(
          [webpArrayBuffer],
          photoFile.name.replace(/(\.[^/.]+)?$/, '.webp'),
          { type: 'image/webp' }
        );
        resolve(webpFile);
      } catch (error) {
        console.error('WebP 변환 중 오류 발생:', error);
        reject(new Error('이미지 변환 실패'));
      } finally {
        URL.revokeObjectURL(imageURL);
      }
    };
    image.src = imageURL;
  });
}

export const base64ToFile = (base64: string, fileName: string) => {
  const [header, data] = base64.split(',');
  const hasDataUrlHeader = base64.includes(',');
  const mimeType = hasDataUrlHeader
    ? (header.match(/data:(.*?);base64/)?.[1] ?? 'image/jpeg')
    : 'image/jpeg';
  const base64Data = hasDataUrlHeader ? data : base64;
  const binaryString = atob(base64Data);
  const byteArray = Uint8Array.from(binaryString, char => char.charCodeAt(0));
  const extension = mimeType.split('/')[1] ?? 'jpg';

  return new File([byteArray], `${fileName}.${extension}`, { type: mimeType });
};
