/* eslint-disable no-unused-vars, no-undef, no-plusplus */
const slideInterval = 3500;
const getFigures = () => document.getElementById('carousel').getElementsByTagName('div');
const hideImage = () => document.getElementById('hide');
const moveForward = () => {
  let pointer = 0;
  const figures = getFigures();
  const hide = hideImage();
  for (let i = 0; i < figures.length; i++) {
    if (figures[i].className === 'visible') {
      figures[i].className = '';
      pointer = i;
    }
  }
  if (++pointer === figures.length) {
    pointer = 0;
    hide.style.display = '';
  }
  figures[pointer].className = 'visible';
  setTimeout(moveForward, slideInterval);
};

const startPlayback = () => {
  setTimeout(moveForward, slideInterval);
};

startPlayback();
