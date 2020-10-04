import { format, isThisYear, formatDistanceStrict } from 'date-fns';

export const formatPostDate = (date) => {
  const formatShort = format(new Date(date), 'MMMM d');
  const formatLong = format(new Date(date), 'MMMM d, yyy');

  return isThisYear(new Date(date)) ? formatShort : formatLong;
};

export default formatPostDate;

export const formatDateToNowShort = (date) => {
  return formatDistanceStrict(new Date(date), new Date(Date.now()))
    .split(' ')
    .map((string, index) => (index === 1 ? string[0] : string))
    .join(' ');
};
