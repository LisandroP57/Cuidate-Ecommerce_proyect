//validando nombre
const nombreInput = document.getElementById('nombreInput');
nombreInput.addEventListener('blur', () => {
  const nombreValue = nombreInput.value.trim();
  const regexSoloLetras = /^[a-zA-Z\s]*$/;
  if (!nombreValue) {
    nombreInput.style.borderColor = 'red';
  } else if (!regexSoloLetras.test(nombreValue)) {
    nombreInput.style.borderColor = 'red';
  } else {
    nombreInput.style.borderColor = 'green';
  }
});
//validando apellido
const apellidoInput = document.getElementById('apellidoInput');
apellidoInput.addEventListener('blur', () => {
  const apellidoValue = apellidoInput.value.trim();
  const regexSoloLetras = /^[a-zA-Z\s]*$/;
  if (!apellidoValue) {
    apellidoInput.style.borderColor = 'red';
  } else if (!regexSoloLetras.test(apellidoValue)) {
    apellidoInput.style.borderColor = 'red';
  } else {
    apellidoInput.style.borderColor = 'green';
  }
});
//validando email
const emailInput = document.getElementById('emailInput');
emailInput.addEventListener('blur', () => {
  const emailValue = emailInput.value.trim();
  const regexEmail = /^\S+@\S+\.\S+$/;

  if (!emailValue) {
    emailInput.style.borderColor = 'red';
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
