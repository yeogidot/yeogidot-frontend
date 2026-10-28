export async function makeJpeg(name = 'photo.jpg', size = 64): Promise<File> {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('테스트용 Canvas Context를 만들 수 없습니다.');
  }
  context.fillStyle = 'rgb(200, 80, 40)';
  context.fillRect(0, 0, size, size);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      result =>
        result ? resolve(result) : reject(new Error('JPEG 생성 실패')),
      'image/jpeg'
    );
  });
  return new File([blob], name, { type: 'image/jpeg' });
}

/** 현재 브라우저의 canvas.toBlob이 실제로 WebP를 만드는지 확인한다. */
export function isNativeWebpAvailable(): Promise<boolean> {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    canvas.width = 4;
    canvas.height = 4;
    canvas.toBlob(
      blob => resolve(blob?.type === 'image/webp'),
      'image/webp',
      0.75
    );
  });
}
