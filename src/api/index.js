import axios from 'axios';

const baseURL = 'http://localhost:8080';
const recordsNumber = 20;
const maximumNumber = 100;

async function getForestRankingDataFromServer({ lastPosition }) {
  let response = {};

  try {
    response = await axios.get(`${baseURL}/${recordsNumber}/${lastPosition}`);
  } catch (error) {
    console.error(error);
  }

  return response.data.ranking;
}

export { maximumNumber, recordsNumber, getForestRankingDataFromServer };
