import mongoose from 'mongoose';

const beerStyleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  minTemperature: { type: Number, required: true },
  maxTemperature: { type: Number, required: true }
});

export const BeerStyle = mongoose.model('BeerStyle', beerStyleSchema);