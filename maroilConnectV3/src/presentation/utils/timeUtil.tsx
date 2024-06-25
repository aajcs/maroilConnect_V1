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
    return `${daysDiff} día${daysDiff !== 1 ? 's' : ''} atrás`;
  } else if (hoursDiff > 0) {
    return `${hoursDiff} hora${hoursDiff !== 1 ? 's' : ''} atrás`;
  } else if (minutesDiff > 0) {
    return `${minutesDiff} minuto${minutesDiff !== 1 ? 's' : ''} atrás`;
  } else {
    return `${secondsDiff} segundo${secondsDiff !== 1 ? 's' : ''} atrás`;
  }
};
