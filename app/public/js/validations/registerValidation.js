//Validando el Nombre
const nameInput = document.querySelector('input[name="name"]');
const nameRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]{2,}$/;

nameInput.addEventListener('blur', () => {
  if (!nameRegex.test(nameInput.value)) {
    nameInput.style.borderColor = 'red';
    nameInput.nextElementSibling.innerHTML = 'Ingrese un nombre válido (mínimo 2 caracteres y sin números ni caracteres especiales)';
    nameInput.nextElementSibling.style.color = 'red';
  } else {
    nameInput.style.borderColor = 'green';
    nameInput.nextElementSibling.innerHTML = '';
  }
});

//Validando el Apellido
const lastNameInput = document.querySelector('input[name="last_name"]');
const lastNameRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]{2,}$/;

lastNameInput.insertAdjacentHTML('afterend', '<span class="error-msg"></span>');

lastNameInput.addEventListener('blur', () => {
  if (!lastNameRegex.test(lastNameInput.value)) {
    lastNameInput.style.borderColor = 'red';
    lastNameInput.nextElementSibling.innerHTML = 'Ingrese un apellido válido (mínimo 2 caracteres y sin números ni caracteres especiales)';
    lastNameInput.nextElementSibling.style.color = 'red';
  } else {
    lastNameInput.style.borderColor = 'green';
    lastNameInput.nextElementSibling.innerHTML = '';
  }
});


