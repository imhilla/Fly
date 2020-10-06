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

  function clearLocalStorage() {
    localStorage.clear();
  }

  return { saveLocalStorage, readLocalStorage, clearLocalStorage };
})();

export default LocalStorage;
