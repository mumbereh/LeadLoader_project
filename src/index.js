import './style.css';
import axios from 'axios';

const gameId = 'FrkNTBcoigpfgTQzrN44';
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
const apiUrl = `${baseUrl}/${gameId}/scores`;

const fetchScores = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data.result || [];
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
};

const saveScore = async (user, score) => {
  try {
    await axios.post(apiUrl, {
      user,
      score,
    });
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

const displayScores = (scores) => {
  const scoreList = document.querySelector('.score-list');
  scoreList.innerHTML = '';
  scores.forEach(({ user, score }) => {
    const div = document.createElement('div');
    div.classList.add('score-list-item');
    div.innerHTML = `<p>${user}: ${score}</p>`;
    scoreList.appendChild(div);
  });
};

const refreshBtn = document.getElementById('refresh');
refreshBtn.addEventListener('click', async () => {
  try {
    const scores = await fetchScores();
    displayScores(scores);
  } catch (error) {
    console.error('Error refreshing scores:', error);
  }
});

const submitBtn = document.querySelector('.btn');
const nameForm = document.querySelector('#name');
const scoreForm = document.querySelector('#score');
const successMessage = document.querySelector('.success');
const errorMessage = document.querySelector('.error');

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    if (!nameForm.value || !scoreForm.value) {
      errorMessage.textContent = 'Please fill all input fields';
    } else {
      await saveScore(nameForm.value, Number(scoreForm.value));
      nameForm.value = '';
      scoreForm.value = '';
      errorMessage.textContent = '';
      successMessage.textContent = 'Score submitted successfully!';

      const scores = await fetchScores();
      displayScores(scores);
    }
  } catch (error) {
    console.error('Error submitting score:', error);
  }
});
