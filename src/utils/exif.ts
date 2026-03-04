import ExifReader from 'exifreader';
export async function getGPSCoordinates(photoFile: File) {
  const tags = await ExifReader.load(photoFile);
  if (tags['GPSLongitude'] && tags['GPSLatitude']) {
    return {
      latitude: Number(tags['GPSLatitude'].description),
      longitude: Number(tags['GPSLongitude'].description),
    };
  }
  return null;
}
export async function getCreatedDateTime(photoFile: File) {
  const tags = await ExifReader.load(photoFile);
  if (tags['DateTimeOriginal']) {
    const [dateString, timeString] =
      tags['DateTimeOriginal'].description.split(' ');
    return `${dateString.replaceAll(':', '-')}T${timeString}`;
  }
  return null;
}
