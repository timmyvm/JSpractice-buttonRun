const button = document.getElementById('run'); // Changed variable name to 'button'
const OFFSET = 100;

button.addEventListener('click', () => {
  alert('Nice Try');
  window.close();
});

document.addEventListener('mousemove', (e) => {
  const x = e.pageX;
  const y = e.pageY;
  const buttonBox = button.getBoundingClientRect();
  const horizontalDistanceFrom = distance(buttonBox.x, x, buttonBox.width);
  const verticalDistanceFrom = distance(buttonBox.y, y, buttonBox.height);
  const horizontalOffset = buttonBox.width / 2 + OFFSET;
  const verticalOffset = buttonBox.height / 2 + OFFSET;
  if (
    Math.abs(
      horizontalDistanceFrom <= horizontalOffset &&
      Math.abs(verticalDistanceFrom) <= verticalOffset
    )
  ) {
    setButtonPosition(
      buttonBox.x + (horizontalOffset / horizontalDistanceFrom) * 10,
      buttonBox.y + (verticalOffset / verticalDistanceFrom) * 10
    );
  }
});

function setButtonPosition(left, top) {
  const windowBox = document.body.getBoundingClientRect();
  const buttonBox = button.getBoundingClientRect();

  if (distance(left, windowBox.left, buttonBox.width) < 0) {
    left = windowBox.right - buttonBox.width - OFFSET;
  }
  if (distance(left, windowBox.right, buttonBox.width) > 0) {
    left = windowBox.left + OFFSET;
  }
  if (distance(top, windowBox.top, buttonBox.height) < 0) {
    top = windowBox.bottom - buttonBox.height - OFFSET;
  }
  if (distance(top, windowBox.bottom, buttonBox.height) > 0) {
    top = windowBox.top + OFFSET;
  }

  button.style.left = `${left}px`;
  button.style.top = `${top}px`;
}

function distance(boxPosition, mousePosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2;
}
