import API from '../src/Objects/API';

it('should return score of player', () => {
  API.getScores()
    .then((data) => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            score: '100',
          }),
        ]),
      );
    })
    .catch(() => { });
});

it('should return players username', () => {
  API.getScores()
    .then((data) => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            user: 'Hillary Kiptoo',
          }),
        ]),
      );
    })
    .catch(() => { });
});

it('should send an object to the API', () => {
  API.postScores()
    .then((data) => {
      expect(typeof data).toBe('object');
    })
    .catch(() => { });
});

it('should save score and username', () => {
  API.postScores('Hillary', 300)
    .then((data) => {
      expect(data.result).toBe('Success!');
    })
    .catch(() => {});
});