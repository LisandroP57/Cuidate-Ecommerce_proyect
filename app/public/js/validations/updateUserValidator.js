//validando nombre
const nombreInput = document.getElementById('nombreInput');
const nombreError = document.getElementById('nombreError');
nombreInput.addEventListener('blur', () => {
  const nombreValue = nombreInput.value.trim();
  const regexSoloLetras = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]{2,}$/;
  if (!nombreValue) {
    nombreInput.style.borderColor = 'red';
    nombreError.style.display = 'block';
    nombreError.textContent = 'Nombre es obligatorio';
  } else if (!regexSoloLetras.test(nombreValue)) {
    nombreInput.style.borderColor = 'red';
    nombreError.style.display = 'block';
    nombreError.textContent = 'Ingrese un nombre válido (mínimo 2 caracteres y sin números ni caracteres especiales)';
  } else {
    nombreInput.style.borderColor = 'green';
    nombreError.style.display = 'none';
  }
});
//validando apellido
const apellidoInput = document.getElementById('apellidoInput');
apellidoInput.addEventListener('blur', () => {
  const apellidoValue = apellidoInput.value.trim();
  const regexSoloLetras = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]{2,}$/;
  if (!apellidoValue) {
    apellidoInput.style.borderColor = 'red';
    apellidoError.style.display = 'block';
    apellidoError.textContent = 'Apellido es obligatorio';
  } else if (!regexSoloLetras.test(apellidoValue)) {
    apellidoInput.style.borderColor = 'red';
    apellidoError.style.display = 'block';
    apellidoError.textContent = 'Ingrese un apellido válido (mínimo 2 caracteres y sin números ni caracteres especiales)';
  } else {
    apellidoInput.style.borderColor = 'green';
    apellidoError.style.display = 'none';
  }
});
//validando email
const emailInput = document.getElementById('emailInput');
emailInput.addEventListener('blur', () => {
  const emailValue = emailInput.value.trim();
  const regexEmail = /^\S+@\S+\.\S+$/;

  if (!emailValue) {
    emailInput.style.borderColor = 'red';
    emailError.style.display = 'block';
    emailError.textContent = 'Email es obligatorio';
  } else if (!regexEmail.test(emailValue)) {
    emailInput.style.borderColor = 'red';
  } else {
    emailInput.style.borderColor = 'green';
  }
});
//validando direccion
const addressInput = document.getElementById('addressInput');
addressInput.addEventListener('blur', () => {
  const addressValue = addressInput.value.trim();
  const regexAddress = /^[a-zA-Z0-9\s]*$/; 
  if (!addressValue) {
    addressInput.style.borderColor = 'red';
  } else if (!regexAddress.test(addressValue)) {
    addressInput.style.borderColor = 'red';
  } else {
    addressInput.style.borderColor = 'green';
  }
});
//validando codigo postal
const postalCodeInput = document.getElementById('postalCodeInput');
postalCodeInput.addEventListener('blur', () => {
  const postalCodeValue = postalCodeInput.value.trim();
  const regexPostalCode = /^\d+$/;
  if (!postalCodeValue) {
    postalCodeInput.style.borderColor = 'red';
  } else if (!regexPostalCode.test(postalCodeValue)) {
    postalCodeInput.style.borderColor = 'red';
  } else {
    postalCodeInput.style.borderColor = 'green';
  }
});
