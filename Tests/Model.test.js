import Model from '../src/Model';

describe('Model', () => {
  it('Should set userName on click ', () => {
    Model.userName = 'Hillary';
    expect(Model.userName).toBe('Hillary');
  });

  it('Should throw an error if different username ', () => {
    Model.userName = 'Hillary';
    expect(Model.userName).not.toBe('Kiptoo');
  });

  it("Should set the user's score ", () => {
    Model.score = '3000';
    expect(Model.score).toBe('3000');
  });

  it('Should throw an error if wrong user score  ', () => {
    Model.score = '1000';
    expect(Model.score).not.toBe('100');
  });
});
