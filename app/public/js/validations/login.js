let qs = (elemento) => {
    return document.querySelector(elemento);
}

window.addEventListener("load", () => {
    let $form = qs('#form'),
        $email = qs("#email"),
        $emailErrorss = qs('#emailErrorss'),
        $pass = qs('#passwordInput'),
        $passErrors = qs('#passErrors'),
        $terms = qs('#flexCheckDefault'),
        $termsErrors = qs('#termsErrors'),
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    $email.addEventListener('blur', () => {
        switch (true) {
            case !$email.value.trim():
                $emailErrorss.innerText = 'El campo email es obligatorio';
                $email.classList.add('is-invalid')
                break;
            case !regExEmail.test($email.value):
                $emailErrorss.innerText = 'Debe ingresar un email válido';
                $email.classList.add('is-invalid')
                break
            default:
                $email.classList.remove('is-invalid');
                $email.classList.add('is-valid');
                $emailErrorss.innerText = ''
                break;
        }
        
    $pass.addEventListener('blur', () => {
        console.log(1);
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerText = 'El campo contraseña es obligatorio';
                $pass.classList.add('is-invalid')
                break;
            case !regExPass.test($pass.value):
                $passErrors.innerText = 'La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número';
                $pass.classList.add('is-invalid')
                break
            default:
                $pass.classList.remove('is-invalid');
                $pass.classList.add('is-valid');
                $passErrors.innerText = ''
                break;
        }
    })
    $terms.addEventListener('click', () => {
        $terms.value = 'on'
        $terms.classList.toggle('is-valid');
        $terms.classList.remove('is-invalid');
        $termsErrors.innerHTML = ""
        console.log(1);
    })

    })

       $form.addEventListener("submit", (event) => {
        event.preventDefault();
       
        if(!$terms.checked){
            $terms.classList.add('is-invalid');
            $termsErrors.innerHTML = "Debes aceptar las bases y condiciones"
        }

        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0; 

        if(errores) {
            submitErrors.innerText = "Hay errores en el formulario"
        } else {
            $form.submit()
        }
     }) 


})

/* 
let qs = (elemento) => {
    return document.querySelector(elemento);
} */
/* $ hace referencia a un elemento de dom */
/*  window.addEventListener("load", () => {
let
    $email = qs('#email'),
    $emailErrorss = qs('#passwordInput');

    $email.addEventListener('focus', () => {
        switch (true) {
            case !$email.value.trim():
                $emailErrorss.innerText = 'El campo email es obligatorio';
                $email.classList.add('is-invalid')
                break;
            case !regExEmail.test($email.value):
                $emailErrorss.innerText = 'Debe ingresar un email válido';
                $email.classList.add('is-invalid')
                break
            default:
                $email.classList.remove('is-invalid');
                $email.classList.add('is-valid');
                $emailErrorss.innerText = ''
                break;
        }
    })
})  */

