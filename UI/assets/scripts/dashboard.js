/* Carousel Slide for property */
const slideInterval = 3500;
const getFigures = () => {
    return document.getElementById('carousel').getElementsByTagName('div');
}

const moveForward = () => {
    let pointer = 0;
    let figures = getFigures();
    for (var i = 0; i < figures.length; i++) {
        if (figures[i].className == 'visible') {
            figures[i].className = '';
            pointer = i;
        }
    }
    if (++pointer == figures.length) {
        pointer = 0;
    }
    figures[pointer].className = 'visible';
    setTimeout(moveForward, slideInterval);
}

const startPlayback = () => {
    setTimeout(moveForward, slideInterval);
}

startPlayback();