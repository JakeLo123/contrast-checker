/* eslint-disable no-undef */

const foregroundInput = document.querySelector('#foreground-input');
const backgroundInput = document.querySelector('#background-input');
const foregroundDisplay = document.querySelector('#foreground-display');
const backgroundDisplay = document.querySelector('#background-display');
const button = document.querySelector('#calculate-contrast');

// state
let foregroundColor = hexToRgb(foregroundInput.value);
let backgroundColor = hexToRgb(backgroundInput.value);
let ratio = getRatio(foregroundColor, backgroundColor);

showFeedback();

function updateRatio() {
  ratio = getRatio(foregroundColor, backgroundColor);
}

function showFeedback() {
  const resultMessage = getResultMessage(ratio);
  document.querySelector('#feedback').innerHTML = resultMessage;
}

function handleForegroundChange(e) {
  foregroundColor = e.target.value;
  foregroundDisplay.style.color = foregroundColor;
  updateRatio();
  showFeedback();
}

function handleBackgroundChange(e) {
  backgroundColor = e.target.value;
  backgroundDisplay.style.backgroundColor = backgroundColor;
}

button.addEventListener('click', showFeedback);
foregroundInput.addEventListener('change', handleForegroundChange);
backgroundInput.addEventListener('change', handleBackgroundChange);
