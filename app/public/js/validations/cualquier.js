const nameInput = document.querySelector('input[name="name"]');

nameInput.addEventListener('blur', () => {
  if (nameInput.value === '') {
    nameInput.style.borderColor = 'red';
  } else {
    nameInput.style.borderColor = 'green';
  }
});