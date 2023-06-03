let qs = (elemento) => {
    return document.querySelector(elemento);
};

window.addEventListener("load", () => {
    let $form = qs("#form"),
        $email = qs("#email"),
        $emailErrors = qs("#emailErrors"),
        $pass = qs("#pass1"),
        $passErrors = qs("#passErrors"),
        $regExEmail =
            /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    $regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    $email.addEventListener("blur", () => {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerText = "El email es obligatorio";
                $email.classList.add("is-invalid");
                $email.style.border = "1px solid red";
                $email.style.display = "block";
                break;
            case !$regExEmail.test($email.value):
                $emailErrors.innerText = "Debe ingresar un email válido";
                $email.classList.add("is-invalid");
                $email.style.border = "1px solid red";
                $email.style.display = "block";
                break;
            default:
                $email.classList.remove("is-invalid");
                $email.classList.add("is-valid");
                $email.style.border = "1px solid green";
                $emailErrors.innerText = "";
                break;
        }
    });
    $pass.addEventListener("blur", () => {
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerText = "La contraseña es obligatoria";
                $pass.classList.add("is-invalid");
                $pass.style.border = "1px solid red";
                $pass.style.display = "block";
                break;
            case !$regExPass.test($pass.value):
                $passErrors.innerText =
                    "La contraseña debe tener: al menos 8 caracteres, al menos una mayúscula, una minúscula y un número";
                $pass.classList.add("is-invalid");
                $pass.style.border = "1px solid red";
                $pass.style.display = "block";
                break;
            default:
                $pass.classList.remove("is-invalid");
                $pass.classList.add("is-valid");
                $pass.style.border = "1px solid green";
                $passErrors.innerText = "";
                break;
        }
    });
    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        const form_elements = event.target.elements;

        for (let index = 0; index < form_elements.length - 1; index++) {
            const element = form_elements[index];
            if (element.value === "") {
                element.classList.add("is-invalid");
            }
        }

        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0;

        if (errores) {
            submitErrors.innerText = "Hay errores en el formulario";
        } else {
            $form.submit();
        }
    });
});
