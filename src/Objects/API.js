import 'regenerator-runtime';

const API = (() => {
  async function getScores() {
    try {
      const scores = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/UAXSbV8jwtwhJKDROcgR/scores',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      return scores.json();
    } catch (error) {
      return error.json();
    }
  }

  async function postScores(name, score) {
    try {
      const result = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/UAXSbV8jwtwhJKDROcgR/scores',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: name,
            score,
          }),
        },
      );

      return result.json();
    } catch (error) {
      return error.json();
    }
  }

  return { getScores, postScores };
})();

export default API;
