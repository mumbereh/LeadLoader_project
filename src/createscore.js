import fetchData from './src/getScore';

const scoreList = document.querySelector('.score-list');
const displayLists = async () => {
  const data = await fetchData();
  const lists = data.result;
  lists.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('score-List');
    div.innerHTML = `
        <p>${item.user}: ${item.score}</p>`;
    scoreList.appendChild(div);
  });
};

export default displayLists;