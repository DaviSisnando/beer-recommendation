type BeerStyle = {
  _id: string;
  name: string;
  minTemperature: number;
  maxTemperature: number;
};

let cache: BeerStyle[] = [];

export const getBeerStyles = () => cache;

export const updateCache = (style: BeerStyle) => {
  const index = cache.findIndex((s) => s._id === style._id);
  if (index !== -1) {
    cache[index] = style;
  } else {
    cache.push(style);
  }
};

export const removeFromCache = (id: string) => {
  cache = cache.filter((s) => s._id !== id);
};