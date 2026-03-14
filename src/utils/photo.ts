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
    image.onload = () => {
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
      context?.drawImage(image, 0, 0);
      canvas.toBlob(
        blob => {
          if (blob) {
            resolve(
              new File([blob], photoFile.name.replace(/(\.[^/.]+)?$/, '.webp'))
            );
          } else {
            reject(new Error('이미지 변환 실패'));
          }
        },
        'image/webp',
        0.7
      );
      URL.revokeObjectURL(imageURL);
    };
    image.src = imageURL;
  });
}
