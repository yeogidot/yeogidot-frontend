export async function photoFileToWebp(photoFile: File) {
  return new Promise<Blob>((resolve, reject) => {
    const imageURL = URL.createObjectURL(photoFile);
    const image = new Image();
    image.src = imageURL;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context?.drawImage(image, 0, 0);
      canvas.toBlob(
        blob => {
          if (blob) {
            resolve(blob);
          } else {
            throw Error('이미지 변환 실패');
          }
        },
        'image/webp',
        0.7
      );
      image.onerror = reject;
    };
  });
}
