import axios from 'axios';
import dotenv from 'dotenv';
import { getAccessToken } from './auth';

dotenv.config();

export const fetchPlaylist = async (beerStyle: string) => {
  const { SPOTIFY_API_URL } = process.env;
  const token = await getAccessToken();

  try {
    const search = await axios.get(`${SPOTIFY_API_URL}/search`, {
      params: { q: beerStyle, type: 'playlist', limit: 1 },
      headers: { Authorization: `Bearer ${token}` },
    });

    const playlist = search.data.playlists.items[0];
    if (!playlist) throw new Error(`No playlist found for the beer style "${beerStyle}".`);;

    const tracksRes = await axios.get(playlist.tracks.href, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      name: playlist.name,
      tracks: tracksRes.data.items.map((item: any) => ({
        name: item.track.name,
        artist: item.track.artists.map((a: any) => a.name).join(', '),
        link: item.track.external_urls.spotify,
      })),
    };
  } catch (err) {
    throw new Error('Unexpected error while fetching playlist. Please try again.');
  }
};
