const LocalStorage = (() => {
  function saveLocalStorage(score) {
    localStorage.setItem('score', score);
  }

  function readLocalStorage() {
    const score = localStorage.getItem('score');
    if (!score) {
      return 0;
    }
    return score;
  }

  function readCounter() {
    const counter = localStorage.getItem('counter');
    if (!counter) {
      return 0;
    }
    return counter;
  }

  function clearLocalStorage() {
    localStorage.clear();
  }

  return { saveLocalStorage, readLocalStorage, clearLocalStorage, readCounter };
  
})();

export default LocalStorage;
