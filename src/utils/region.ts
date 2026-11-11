const METROPOLITAN_SUFFIX = /(광역시|특별시|특별자치시)$/;
const PROVINCE_SUFFIX = /(특별자치도|도)$/;
const CITY_SUFFIX = /(시|군)$/;

const PROVINCE_SHORT_NAMES: Record<string, string> = {
  경상남도: '경남',
  경상북도: '경북',
  전라남도: '전남',
  전라북도: '전북',
  충청남도: '충남',
  충청북도: '충북',
};

export const formatCardRegion = (region: string) => {
  const [first, ...rest] = region.trim().split(/\s+/);
  const districts = rest.map(token => token.replace(CITY_SUFFIX, ''));

  if (METROPOLITAN_SUFFIX.test(first)) {
    return [first.replace(METROPOLITAN_SUFFIX, ''), ...districts].join(' ');
  }
  if (PROVINCE_SUFFIX.test(first)) {
    if (districts.length > 0) return districts.join(' ');
    if (PROVINCE_SHORT_NAMES[first]) return PROVINCE_SHORT_NAMES[first];
    const stripped = first.replace(PROVINCE_SUFFIX, '');
    // '영도'처럼 도(道)가 아니면서 한 글자로 줄어드는 이름은 그대로 둔다.
    return stripped.length >= 2 ? stripped : first;
  }
  return [first.replace(CITY_SUFFIX, ''), ...districts].join(' ');
};
