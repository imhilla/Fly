const Counter = (() => {
  function saveStorage(counter) {
    localStorage.setItem('counter', counter);
  }

  function getCounter() {
    const counter = localStorage.getItem('counter');
    return counter;
  }

  return { getCounter, saveStorage };
})();

export default Counter;
