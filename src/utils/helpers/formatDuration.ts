export const formatDuration = (duration: number) => {
  const min = duration % 60;
  const hours = (duration - min) / 60;
  return hours ? `${hours}ч ${min}м` : `${min}м`;
}