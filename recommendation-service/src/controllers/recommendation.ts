import { Request, Response } from 'express';
import { recommendBeerStyle } from '../services/recommendation';
import { fetchPlaylist } from '../spotify/spotifyClient';

export const getRecommendation = async (req: Request, res: Response): Promise<any> => {
  const { temperature } = req.body;

  if (typeof temperature !== 'number') {
    return res.status(400).json({ error: 'Temperature must be a number.' });
  }

  const beerStyle = recommendBeerStyle(temperature);
  if (!beerStyle) {
    return res.status(404).json({ error: 'No beer styles found.' });
  }

  try {
    const playlist = await fetchPlaylist(beerStyle.name);
    return res.status(200).json({
      beerStyle: beerStyle.name,
      playlist,
    });
  } catch (err: any) {
    return res.status(500).json({
      error: err.message || 'Error retrieving playlist.',
    });
  }
};