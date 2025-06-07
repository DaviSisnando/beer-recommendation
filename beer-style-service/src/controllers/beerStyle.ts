import { Request, Response } from 'express';
import { BeerStyle } from '../models/beerStyle';
import { sendMessage } from '../messaging/rabbitmq';

export const createBeerStyle = async (req: Request, res: Response): Promise<any> => {
  const { name, minTemperature, maxTemperature } = req.body;
  try {
    const newBeerStyle = await BeerStyle.create({ name, minTemperature, maxTemperature });

    sendMessage('beerStyleQueue', JSON.stringify({ action: 'created', data: newBeerStyle }));

    return res.status(201).json(newBeerStyle);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create beer style' });
  }
};

export const getAllBeerStyles = async (_: Request, res: Response): Promise<any> => {
  try {
    const beerStyles = await BeerStyle.find();
    return res.status(200).json(beerStyles);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch beer styles' });
  }
};

export const getBeerStyle = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const beerStyle = await BeerStyle.findById(id);
    if (!beerStyle) return res.status(404).json({ error: 'Beer style not found.'})
    return res.status(200).json(beerStyle);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch beer styles' });
  }
};

export const updateBeerStyle = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, minTemperature, maxTemperature } = req.body;
  
  try {
    const beerStyle = await BeerStyle.findByIdAndUpdate(
      id, 
      { name, minTemperature, maxTemperature }, 
      { new: true }
    );
    
    if (!beerStyle) return res.status(404).json({ error: 'Beer style not found' });

    sendMessage('beerStyleQueue', JSON.stringify({ action: 'updated', data: beerStyle }));

    return res.status(200).json(beerStyle);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update beer style' });
  }
};

export const deleteBeerStyle = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  
  try {
    const beerStyle = await BeerStyle.findByIdAndDelete(id);
    
    if (!beerStyle) return res.status(404).json({ error: 'Beer style not found' });

    sendMessage('beerStyleQueue', JSON.stringify({ action: 'deleted', data: beerStyle }));

    return res.status(200).json({ message: 'Beer style deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete beer style' });
  }
};