import axios from 'axios';

const baseURL = 'https://testsite.staging.seekrtech.com/forest_rankings';

async function getForestRankingData({ number, lastPosition }) {
  try {
    const response = await axios.get(
      `${baseURL}?n=${number}&last_pos=${lastPosition}`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export { getForestRankingData };
