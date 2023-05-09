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

  //Validando correo
  const emailInput = document.querySelector('input[name="email"]');

  emailInput.addEventListener('blur', function() {
    const emailValue = this.value.trim();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (emailValue === '') {
      this.style.borderColor = 'red';
      this.nextElementSibling.innerHTML = 'Este campo es obligatorio';
      this.nextElementSibling.style.color = 'red';
    } else if (!emailRegex.test(emailValue)) {
      this.style.borderColor = 'red';
      this.nextElementSibling.innerHTML = 'Ingrese un email válido';
      this.nextElementSibling.style.color = 'red';
    } else {
      this.style.borderColor = 'green';
      this.nextElementSibling.innerHTML = '';
    }
  });

//Validando contraseñas
const pass1Input = document.querySelector('input[name="pass1"]');
const pass2Input = document.querySelector('input[name="pass2"]');
const submitButton = document.querySelector('button[type="submit"]');

// Función para validar la contraseña
function validatePassword() {
  const pass1 = pass1Input.value;
  const pass2 = pass2Input.value;

  const hasUppercase = /[A-Z]/.test(pass1);
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
});

