import axios from 'axios';

import { getServerURL } from '../config';

const baseURL = getServerURL();
const recordsNumber = 20;
const maximumNumber = 100;

async function getForestRankingDataFromServer({ lastPosition }) {
  let response = {};

  try {
    response = await axios.get(`${baseURL}/${recordsNumber}/${lastPosition}`);
  } catch (error) {
    console.error(error);
  }

  console.log(response.data.ranking);
  return response.data.ranking;
}

export { maximumNumber, recordsNumber, getForestRankingDataFromServer };
