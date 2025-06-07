import { getBeerStyles } from '../cache/beerStyleCache';

export const recommendBeerStyle = (temperature: number) => {
  const styles = getBeerStyles();
  const sorted = styles.sort((a, b) => {
    const avgA = (a.minTemperature + a.maxTemperature) / 2;
    const avgB = (b.minTemperature + b.maxTemperature) / 2;
    const diffA = Math.abs(avgA - temperature);
    const diffB = Math.abs(avgB - temperature);

    if (diffA !== diffB) return diffA - diffB;
    return a.name.localeCompare(b.name);
  });

  return sorted[0];
};