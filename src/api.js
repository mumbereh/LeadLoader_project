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

export const displayLists = async () => {
  try {
    const lists = await fetchData();
    const scoreList = document.querySelector('.score-list');
    scoreList.innerHTML = ''; // Clear existing content before appending new scores
    lists.forEach(({ user, score }) => {
      const div = document.createElement('div');
      div.classList.add('score-list-item');
      div.innerHTML = `<p>${user}: ${score}</p>`;
      scoreList.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
