function loadContent(callback) {
  let loaded = 0;

  const checkDone = () => {
    loaded++;
    if (loaded === 2 && typeof callback === 'function') {
      callback();
    }
  };

const loadFragment = (url, selector, callbackAfterInject) => {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.querySelector(selector).innerHTML = html;
      if (typeof callbackAfterInject === 'function') callbackAfterInject();
      checkDone();
    })
    .catch(err => {
      console.error('Error loading fragment:', err);
      checkDone(); // Still count even if it failed
    });
};

loadFragment('header.html', '#header');
loadFragment('footer.html', '#footer', () => {
  // Optional: dynamically load JS that footer depends on
  const script = document.createElement('script');
  script.src = 'js/footer.js';
  document.body.appendChild(script);
});
}

