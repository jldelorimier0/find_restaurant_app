const totalStars = 5;

export function stars(numStars) {
  const el = document.createElement('div');
  el.classList.add('stars');
  for (let index = 0; index < totalStars; index++) {
    el.appendChild(star(index < numStars));
  }
  return el;
}

function star(isFilled) {
  const el = document.createElement('div');
  el.classList.add('star');
  if (isFilled) {
    el.classList.add('star-filled');
  }
  return el;
}
