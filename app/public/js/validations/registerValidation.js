let qs = (elemento) => {
    return document.querySelector(elemento);
};

window.addEventListener("load", () => {
    let $form = qs("#form"),
        $name = qs("#name"),
        $nameErrors = qs("#nameErrors"),
        $lastname = qs("#last_name"),
        $lastnameErrors = qs("#lastnameErrors"),
        $email = qs("#email"),
        $emailErrors = qs("#emailErrors"),
        $pass1 = qs("#pass1"),
        $pass1Errors = qs("#pass1Errors"),
        $pass2 = qs("#pass2"),
        $pass2Errors = qs("#pass2Errors"),
        $file = qs("#avatar"),
        $fileErrors = qs("#avatarErrors"),
        $terms = qs("#check"),
        $termsErrors = qs("#termsErrors"),
        $regexSoloLetras = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]{2,}$/,
        $regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    $regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    //Validando el Nombre
    $name.addEventListener("blur", () => {
        switch (true) {
            case !$name.value.trim():
                $nameErrors.innerHTML = "El nombre es obligatorio";
                $name.classList.add("is-invalid");
                $name.style.border = "1px solid red";
                $nameErrors.style.display = "block";
                break;
            case !$regexSoloLetras.test($name.value.trim()):
                $nameErrors.innerText =
                    "Ingrese un nombre sin números ni caracteres especiales";
                $name.classList.add("is-invalid");
                $name.style.border = "1px solid red";
                $nameErrors.style.display = "block";
                break;
            case $name.value.trim().length < 2:
                $nameErrors.innerText =
                    "Ingrese un nombre válido (mínimo 2 caracteres)";
                $name.classList.add("is-invalid");
                $name.style.border = "1px solid red";
                $nameErrors.style.display = "block";
                break;
            default:
                $name.classList.remove("is-invalid");
                $name.classList.add("is-valid");
                $name.style.border = "1px solid green";
                $nameErrors.innerHTML = "";
                break;
        }
    });
    // Validando apellido
    $lastname.addEventListener("blur", () => {
        switch (true) {
            case !$lastname.value.trim():
                $lastnameErrors.innerHTML = "El apellido es obligatorio";
                $lastname.classList.add("is-invalid");
                $lastname.style.border = "1px solid red";
                $lastnameErrors.style.display = "block";
                break;
            case !$regexSoloLetras.test($lastname.value.trim()):
                $lastnameErrors.innerText =
                    "Ingrese un apellido sin números ni caracteres especiales";
                $lastname.classList.add("is-invalid");
                $lastname.style.border = "1px solid red";
                $lastnameErrors.style.display = "block";
                break;
            case $lastname.value.trim().length < 2:
                $lastnameErrors.innerText =
                    "Ingrese un apellido válido (mínimo 2 caracteres)";
                $lastname.classList.add("is-invalid");
                $lastname.style.border = "1px solid red";
                $lastnameErrors.style.display = "block";
                break;
            default:
                $lastname.classList.remove("is-invalid");
                $lastname.classList.add("is-valid");
                $lastname.style.border = "1px solid green";
                $lastnameErrors.innerHTML = "";
                break;
        }
    });
    // Validando email
    $email.addEventListener("blur", () => {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerText = "El campo email es obligatorio";
                $email.classList.add("is-invalid");
                $email.style.border = "1px solid red";
                $emailErrors.style.display = "block";
                break;
            case !$regExEmail.test($email.value):
                $email.style.border = "1px solid red";
                $emailErrors.style.display = "block";
                $emailErrors.innerText = "Debe ingresar un email válido";
                $email.classList.add("is-invalid");
                break;
            default:
                $email.classList.remove("is-invalid");
                $email.classList.add("is-valid");
                $email.style.border = "1px solid green";
                $emailErrors.innerText = "";
                break;
        }
    });
    //Validando contraseñas
    $pass1.addEventListener("blur", () => {
        switch (true) {
            case !$pass1.value.trim():
                $pass1Errors.innerText = "La contraseña es obligatoria";
                $pass1.classList.add("is-invalid");
                $pass1.style.border = "1px solid red";
                $pass1Errors.style.display = "block";
                break;
            case !$regExPass.test($pass1.value):
                $pass1Errors.innerText =
                    "La contraseña debe tener: al menos 8 caracteres, al menos una mayúscula, una minúscula y un número";
                $pass1.classList.add("is-invalid");
                $pass1.style.border = "1px solid red";
                $pass1Errors.style.display = "block";
                break;
            default:
                $pass1.classList.remove("is-invalid");
                $pass1.classList.add("is-valid");
                $pass1.style.border = "1px solid green";
                $pass1Errors.innerText = "";
                break;
        }
    });
    $pass2.addEventListener("blur", () => {
        switch (true) {
            case !$pass2.value.trim():
                $pass2Errors.innerText = "La contraseña es obligatoria";
                $pass2.classList.add("is-invalid");
                $pass2.style.border = "1px solid red";
                $pass2Errors.style.display = "block";
                break;
            case !$regExPass.test($pass2.value):
                $pass2Errors.innerText =
                    "La contraseña debe tener: al menos 8 caracteres, al menos una mayúscula, una minúscula y un número";
                $pass2.classList.add("is-invalid");
                $pass2.style.border = "1px solid red";
                $pass2Errors.style.display = "block";
                break;
            default:
                $pass2.classList.remove("is-invalid");
                $pass2.classList.add("is-valid");
                $pass2.style.border = "1px solid green";
                $pass2Errors.innerText = "";
                break;
        }
    });

    $terms.addEventListener("click", () => {
        $terms.value = "on";
        $terms.classList.toggle("is-valid");
        $terms.style.border = "1px solid green";
        $terms.classList.remove("is-invalid");
        $terms.style.border = "1px solid red";
        $termsErrors.innerHTML = "";
    });

    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        const form_elements = event.target.elements;

        for (let index = 0; index < form_elements.length - 1; index++) {
            const element = form_elements[index];
            if (element.value === "" && element.type !== "file") {
                element.classList.add("is-invalid");
            }
        }

        if (!$terms.checked) {
            $terms.classList.add("is-invalid");
            $termsErrors.innerHTML = "Debes aceptar los terminos y condiciones";
        }

        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0;

        if (errores) {
            submitErrors.innerText = "Hay errores en el formulario";
        } else {
            $form.submit();
        }
    });
    $file.addEventListener("change", () => {
        let filePath = $file.value,
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i;
        if (!allowefExtensions.exec(filePath)) {
            $fileErrors.innerHTML =
                "Las extensiones permitidas son .JPG - .JPEG - .PNG - .GIF)";
            $file.value = "";
            $file.classList.add("is-invalid");
            $file.style.border = "1px solid red";
            return false;
        } else {
            console.log($file.files);
            $fileErrors.innerHTML = "";
            $file.classList.remove("is-invalid");
            $file.style.border = "1px solid green";
        }
    });
});
