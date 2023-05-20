let qs = (elemento) => {
    return document.querySelector(elemento);
}

window.addEventListener('load', () => {

let 
    $email = qs("#email"),
    $emailErrors = qs('#emailErrors'),
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
    $email.addEventListener('blur', function () {
        switch (true) {
        case !$email.value.trim():
            $emailErrors.innerText = 'El campo email es obligatorio';
            $email.classList.add('is-invalid');
        break;
        case !regExEmail.test($email.value):
            $emailErrors.innerText = 'Debe ingresar un email válido';
            $email.classList.add('is-invalid')
        break;
        default:
            $email.classList.remove('is-invalid');
            $email.classList.add('is-valid');
            $emailErrors.innerText = '';
        break;
    }
});

$form.addEventListener("submit", (event) => {
    event.preventDefault();

    let ErrorElements = document.querySelectorAll(".is-invalid");
    let errors = ErrorElements.length > 0;

    if (errors) {
      $submitErrors.innerText = "Hay errores en tu formulario";
    } else {
          $form.submit();
    }
});
});