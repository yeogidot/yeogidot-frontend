export const convertISOToKorean = (ISOString: string) => {
  const koreanDate = new Date(ISOString);
  const year = koreanDate.getFullYear();
  const month = (koreanDate.getMonth() + 1).toString().padStart(2, '0');
  const date = koreanDate.getDate().toString().padStart(2, '0');
  const hours = koreanDate.getHours().toString().padStart(2, '0');
  const minutes = koreanDate.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${date} ${hours}시 ${minutes}분`;
};
