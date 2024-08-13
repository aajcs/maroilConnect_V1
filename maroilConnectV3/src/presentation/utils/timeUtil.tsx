// utils/time.ts

export const getRelativeTime = (timestamp: string | number): string => {
  let convertedTimestamp: number;

  if (typeof timestamp === 'string') {
    convertedTimestamp = Date.parse(timestamp);
  } else {
    convertedTimestamp = timestamp;
  }
  const now = new Date();

  // Convertir la hora actual a la hora de Venezuela
  // const horaVenezuela = now.getTime() - 4 * 60 * 60 * 1000;

  const millisecondsDiff = now.getTime() - convertedTimestamp;
  const secondsDiff = Math.floor(millisecondsDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  if (daysDiff > 0) {
    return `${daysDiff} día${daysDiff !== 1 ? 's' : ''} `;
  } else if (hoursDiff > 0) {
    return `${hoursDiff} hora${hoursDiff !== 1 ? 's' : ''} `;
  } else if (minutesDiff > 0) {
    return `${minutesDiff} minuto${minutesDiff !== 1 ? 's' : ''} `;
  } else {
    return `${secondsDiff} segundo${secondsDiff !== 1 ? 's' : ''} `;
  }
};
export const getRelativeTimeEspecifico = (
  timestamp: string | number | Date | null,
  timestamp2: string | number | Date | null,
): string => {
  let convertedTimestamp: number;
  let convertedTimestamp2: number;

  if (timestamp === null) {
    convertedTimestamp = Date.now();
  } else if (typeof timestamp === 'string') {
    convertedTimestamp = Date.parse(timestamp);
  } else {
    convertedTimestamp = timestamp as number;
  }

  if (timestamp2 === null) {
    convertedTimestamp2 = Date.now();
  } else if (typeof timestamp2 === 'string') {
    convertedTimestamp2 = Date.parse(timestamp2);
  } else {
    convertedTimestamp2 = timestamp2 as number;
  }

  const millisecondsDiff = convertedTimestamp2 - convertedTimestamp;
  const secondsDiff = Math.floor(millisecondsDiff / 1000);

  return secondsToString(secondsDiff);
};

function secondsToString(diff: number): string {
  const numdays = Math.floor(diff / 86400);
  const numhours = Math.floor((diff % 86400) / 3600);
  const numminutes = Math.floor(((diff % 86400) % 3600) / 60);
  return numdays + ' D: ' + numhours + ' H: ' + numminutes + ' M ';
}
