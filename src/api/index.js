import axios from 'axios';

const baseURL = 'http://localhost:8080';
const recordsNumber = 10;

async function getForestRankingDataFromServer({ lastPosition }) {
  let response = {};

  try {
    response = await axios.get(`${baseURL}/${recordsNumber}/${lastPosition}`);
  } catch (error) {
    console.error(error);
  }

  console.log(`Last Position: ${lastPosition}`);
  console.log(response.data.ranking);

  return response.data.ranking;
}

export { recordsNumber, getForestRankingDataFromServer };
