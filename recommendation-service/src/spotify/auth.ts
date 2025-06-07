import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

let accessToken: string;

export const getAccessToken = async (): Promise<string> => {
  if (accessToken) return accessToken;

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  const authString = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
      {
        headers: {
          Authorization: `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    accessToken = response.data.access_token;
    return accessToken;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao obter token do Spotify:', {
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error('Erro inesperado ao obter token do Spotify:', error);
    }
    throw new Error('Failed to get Spotify access token');
  }
};
