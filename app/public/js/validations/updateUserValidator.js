let qs = (elemento) => {
  return document.querySelector(elemento);
}

window.addEventListener('load', () => {

  let
    $form = qs('#form'),
    $name = qs('#name'),
    $nameErrors = qs('#nameErrors'),
    $lastname = qs('#last_name'),
    $lastnameErrors = qs('#lastnameErrors'),
    $email = qs('#email'),
    $emailErrors = qs('#emailErrors'),
    $regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    $regexSoloLetras = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]{2,}$/;

  // Validando nombre
  $name.addEventListener('blur', () => {
    switch (true) {
      case !$name.value.trim():
        $nameErrors.innerHTML = 'El nombre es obligatorio';
        $name.classList.add('is-invalid');
        $name.style.borderColor = 'red';
        $nameErrors.style.display = 'block';
        break;
      case !$regexSoloLetras.test($name.value.trim()):
        $nameErrors.innerText = 'Ingrese un nombre sin números ni caracteres especiales';
        $name.classList.add('is-invalid');
        $name.style.borderColor = 'red';
        $nameErrors.style.display = 'block';
          break;
      case $name.value.trim().length < 2:
        $nameErrors.innerText = 'Ingrese un nombre válido (mínimo 2 caracteres)';
        $name.classList.add('is-invalid');
        $name.style.borderColor = 'red';
        $nameErrors.style.display = 'block';
        break;
      default:
        $name.classList.remove('is-invalid');
        $name.classList.add('is-valid');
        $name.style.borderColor = 'green';
        $nameErrors.innerHTML = '';
        break;
    }
  })
  // Validando apellido
  $lastname.addEventListener('blur', () => {
    switch (true) {
      case !$lastname.value.trim():
        $lastnameErrors.innerHTML = 'El apellido es obligatorio';
        $lastname.classList.add('is-invalid');
        $lastname.style.borderColor = 'red';
        $lastnameErrors.style.display = 'block';
        break;
        case !$regexSoloLetras.test($lastname.value.trim()):
          $lastnameErrors.innerText = 'Ingrese un apellido sin números ni caracteres especiales';
          $lastname.classList.add('is-invalid');
          break;
      case $lastname.value.trim().length < 2:
        $lastnameErrors.innerText = 'Ingrese un apellido válido (mínimo 2 caracteres)';
        $lastname.classList.add('is-invalid');
        $lastname.style.borderColor = 'red';
        $lastnameErrors.style.display = 'block';
        break;
      default:
        $lastname.classList.remove('is-invalid');
        $lastname.classList.add('is-valid');
        $lastname.style.borderColor = 'green';
        $lastnameErrors.innerHTML = '';
        break;
    }
  // Validando email
  $email.addEventListener('blur', () => {
    switch (true) {
      case !$email.value.trim():
        $emailErrors.innerText = 'El campo email es obligatorio';
        $email.classList.add('is-invalid');
        $email.style.borderColor = 'red';
        $emailErrors.style.display = 'block';
        break;
      case !$regExEmail.test($email.value):
        $email.style.borderColor = 'red';
        $emailErrors.style.display = 'block';
        $emailErrors.innerText = 'Debe ingresar un email válido';
        $email.classList.add('is-invalid');
        break
        default:
          $email.classList.remove('is-invalid');
          $email.classList.add('is-valid');
          $email.style.borderColor = 'green';
          $emailErrors.innerText = '';
          break;
      }
  })
})
  
    $form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      let elementosConErrores = document.querySelectorAll(".is-invalid");
      let errores = elementosConErrores.length > 0;
  
      if (errores) {
        submitErrors.innerText = "Hay errores en el formulario";
      } else {
        $form.submit();
      }
    })
  })

//validando direccion
/* const addressInput = document.getElementById('addressInput');
addressInput.addEventListener('blur', () => {
  const addressValue = addressInput.value.trim();
  const regexAddress = /^[a-zA-Z0-9\s]*$/; 
  if (addressValue && !regexAddress.test(addessValue)) {
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
  if (postalCodeValue && !regexPostalCode.test(postalCodeValue)) {
    postalCodeInput.style.borderColor = 'red';
  } else {
    postalCodeInput.style.borderColor = 'green';
  }
}); */