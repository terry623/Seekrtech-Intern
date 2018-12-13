import axios from 'axios';

const baseURL = 'http://localhost:8080';

async function getForestRankingDataFromServer({ number, lastPosition }) {
  let response = {};
  try {
    response = await axios.get(`${baseURL}/${number}/${lastPosition}`);
  } catch (error) {
    console.error(error);
  }
  return response.data;
}

export { getForestRankingDataFromServer };
