const METROPOLITAN_SUFFIX = /(광역시|특별시|특별자치시)$/;
const PROVINCE_SUFFIX = /(특별자치도|도)$/;
const CITY_SUFFIX = /(시|군)$/;

export const formatCardRegion = (region: string) => {
  const [first, ...rest] = region.trim().split(/\s+/);
  const districts = rest.map(token => token.replace(CITY_SUFFIX, ''));

  if (METROPOLITAN_SUFFIX.test(first)) {
    return [first.replace(METROPOLITAN_SUFFIX, ''), ...districts].join(' ');
  }
  if (PROVINCE_SUFFIX.test(first)) {
    return districts.length > 0
      ? districts.join(' ')
      : first.replace(PROVINCE_SUFFIX, '');
  }
  return [first.replace(CITY_SUFFIX, ''), ...districts].join(' ');
};
