document.addEventListener('keydown', (e) => {
  // NAVIGATION
  if (e.key.toLowerCase() === 'x' && e.altKey) {
    e.preventDefault();
    navigate('next');
  }
  if (e.key.toLowerCase() === 'z' && e.altKey) {
    e.preventDefault();
    navigate('prev');
  }

  // SUBMIT
  if (e.key === "Enter") {
    clkk();
    $('#check').click();
  }
});