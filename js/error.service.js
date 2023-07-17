export const showError = (label) => {
  const errorElem = document.querySelector('#error-container');
  errorElem.textContent = label;
  errorElem.style.opacity = 1;
  setTimeout(() => {
    errorElem.style.opacity = 0;
  }, 3000)
  console.log(label);
}