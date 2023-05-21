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
    $pass1 = qs('#pass1'),
    $pass1Errors = qs('#pass1Errors'),
    $pass2 = qs('#pass2'),
    $pass2Errors = qs('#pass2Errors'),
    $avatar = qs('#avatar'),
    $avatarErrors = qs('#avatarErrors'),
    $terms = qs('#terms'),
    $termsErrors = qs('#termsErrors'),
    $regexSoloLetras = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]{2,}$/,
    $regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/;
    $regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

//Validando el Nombre
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
//Validando contraseñas
$pass1.addEventListener('blur', () => {
  switch (true) {
      case !$pass1.value.trim():
          $pass1Errors.innerText = 'La contraseña es obligatoria';
          $pass1.classList.add('is-invalid');
          $pass1.style.borderColor = 'red';
          $pass1Errors.style.display = 'block';
          break;
      case !$regExPass.test($pass1.value):
          $pass1Errors.innerText = 'La contraseña debe tener: al menos 8 caracteres, al menos una mayúscula, una minúscula y un número';
          $pass1.classList.add('is-invalid');
          $pass1.style.borderColor = 'red';
          $pass1Errors.style.display = 'block';
          break
      default:
          $pass1.classList.remove('is-invalid');
          $pass1.classList.add('is-valid');
          $pass1.style.borderColor = 'green';
          $pass1Errors.innerText = ''
          break;
  }
})
  $pass2.addEventListener('blur', () => {
    switch (true) {
        case !$pass2.value.trim():
            $pass2Errors.innerText = 'La contraseña es obligatoria';
            $pass2.classList.add('is-invalid');
            $pass2.style.borderColor = 'red';
            $pass2Errors.style.display = 'block';
            break;
        case !$regExPass.test($pass2.value):
            $pass2Errors.innerText = 'La contraseña debe tener: al menos 8 caracteres, al menos una mayúscula, una minúscula y un número';
            $pass2.classList.add('is-invalid');
            $pass2.style.borderColor = 'red';
            $pass2Errors.style.display = 'block';
            break
        default:
            $pass2.classList.remove('is-invalid');
            $pass2.classList.add('is-valid');
            $pass2.style.borderColor = 'green';
            $pass2Errors.innerText = ''
            break;
    }
})
  // Validando terminos
  $terms.addEventListener('blur', () => {
    switch (true) {
      case !$terms.value.trim():
        $termsErrors.innerText = 'Debes aceptar los términos';
        $terms.classList.add('is-invalid');
        $terms.style.borderColor = 'red';
        $termsErrors.style.display = 'block';
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


/* const hasUppercase = /[A-Z]/.test(pass1);
const hasLowercase = /[a-z]/.test(pass1);
const hasNumber = /\d/.test(pass1);
const hasSpecialChar = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(pass1);
const isLengthValid = pass1.length >= 8;
const isMatch = pass1 === pass2;

if (!isLengthValid || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
  pass1Input.style.borderColor = 'red';
  pass2Input.style.borderColor = 'red';
  submitButton.disabled = true;

  if (!isLengthValid) {
    pass1Input.nextElementSibling.innerHTML = 'La contraseña debe tener al menos 8 caracteres.';
  } else if (!hasUppercase) {
    pass1Input.nextElementSibling.innerHTML = 'La contraseña debe tener al menos una letra mayúscula.';
  } else if (!hasLowercase) {
    pass1Input.nextElementSibling.innerHTML = 'La contraseña debe tener al menos una letra minúscula.';
  } else if (!hasNumber) {
    pass1Input.nextElementSibling.innerHTML = 'La contraseña debe tener al menos un número.';
  } else if (!hasSpecialChar) {
    pass1Input.nextElementSibling.innerHTML = 'La contraseña debe tener al menos un carácter especial.';
  }
} else if (!isMatch) {
  pass1Input.style.borderColor = 'red';
  pass2Input.style.borderColor = 'red';
  submitButton.disabled = true;
  pass1Input.nextElementSibling.innerHTML = 'Las contraseñas no coinciden.';
} else {
  pass1Input.style.borderColor = 'green';
  pass2Input.style.borderColor = 'green';
  submitButton.disabled = false;
  pass1Input.nextElementSibling.innerHTML = '';
}
}

// Validar contraseña cuando se pierde el foco del input
pass1Input.addEventListener('blur', validatePassword);
pass2Input.addEventListener('blur', validatePassword);

//Validando extension del archivo subido para foto de perfil
const fileInput = document.querySelector('#image');
fileInput.addEventListener('change', (event) => {
const fileName = event.target.files[0].name;
const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
if (!allowedExtensions.exec(fileName)) {
  alert('Error: la extensión del archivo no está permitida. Solo se permiten archivos JPG, JPEG, PNG y GIF.');
  fileInput.value = '';
  return false;
}
}); */