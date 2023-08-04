// index.js

import './style.css';

const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/HITirhqNpaDAqFyG4jlT/scores/';

const fetchData = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.result || [];
};

const fetchScore = async (user, score) => {
  await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({ user, score }),
    headers: {
      'Content-type': 'application/json',
    },
  });
};

const displayLists = async () => {
  try {
    const lists = await fetchData();
    const scoreList = document.querySelector('.score-list');
    scoreList.innerHTML = ''; // Clear existing content before appending new scores
    lists.forEach(({ user, score }) => {
      const div = document.createElement('div');
      div.classList.add('score-list-item'); // Correct class name here
      div.innerHTML = `<p>${user}: ${score}</p>`;
      scoreList.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const submitBtn = document.querySelector('.btn');
const nameForm = document.querySelector('#name');
const scoreForm = document.querySelector('#score');

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const error = document.querySelector('.error');
  if (!nameForm.value || !scoreForm.value) {
    error.innerHTML = 'Please fill all input fields';
  } else {
    await fetchScore(nameForm.value, scoreForm.value);
    nameForm.value = '';
    scoreForm.value = '';
    error.innerHTML = '';
    displayLists();
  }
});

document.addEventListener('DOMContentLoaded', displayLists);
