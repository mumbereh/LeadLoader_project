const axios = require('axios');

const gameId = 'HITirhqNpaDAqFyG4jlT';
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';

export const fetchData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/${gameId}/scores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchScore = async (user, score) => {
  try {
    await axios.post(`${baseUrl}/${gameId}/scores`, {
      user,
      score,
    });
  } catch (error) {
    console.error('Error posting score:', error);
    throw error;
  }
};
