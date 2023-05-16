let qs = (elemento) => {
    return document.querySelector(elemento);
}

window.addEventListener('load', () => {

    let
        $name = qs('#name'),
        $nameErrors = qs('#nameErrors'),
        $inputPrice = qs('#inputPrice'),
        $priceErrors = qs('#priceErrors'),
        $inputDiscount = qs('#inputDiscount'),
        $discountErrors = qs('#discountErrors'),
        $inputImage = qs('#images'),
        $imagesErrors = qs('#imagesErrors'),
        $imagePreview = qs('img-preview'),
        $description = qs('#description'),
        $descriptionErrors = qs('#descriptionErrors'),
        $form = qs('#form'),
        $submitErrors = qs('#submitErrors'),
        regExNumber = /^[0-9]*$/,
        regExFloat = /^[0-9]*[.,]?[0-9]*$/, 
        regExDescription = /^.{20,}$/

    $name.addEventListener('blur', function () {
        switch (true) {
            case !$name.value.trim():
                $nameErrors.innerHTML = 'El campo nombre es obligatorio';
                $name.classList.add('is-invalid');
                break;
            case $name.value.trim().length < 5:
                $nameErrors.innerText = 'El campo nombre debe tener al menos 5 caracteres';
                $name.classList.add('is-invalid')
                break;
            default:
                $name.classList.remove('is-invalid');
                $name.classList.add('is-valid');
                $nameErrors.innerHTML = '';
                break;
        }
    });

    $inputPrice.addEventListener('blur', function () {
        switch (true) {
            case !$inputPrice.value.trim():
                $priceErrors.innerText = 'El campo precio es obligatorio';
                $inputPrice.classList.add('is-invalid')
                $inputPrice.nextElementSibling.style.color = 'red';
                break;
            case !regExFloat.test($price.value):
                $priceErrors.innerText = 'El campo precio debe ser un número';
                $inputPrice.classList.add('is-invalid')
                break;
            case $inputPrice.value < 0:
                $priceErrors.innerText = 'El campo precio debe ser mayor a 0';
                $inputPrice.classList.add('is-invalid')
                break;
            default:
                $inputPrice.classList.remove('is-invalid');
                $inputPrice.classList.add('is-valid');
                $priceErrors.innerText = ''
                break;
        }
    });

    $inputDiscount.addEventListener('blur', function () {
        switch (true) {
            case !$inputDiscount.value.trim():
                $discountErrors.innerText = 'El campo descuento es obligatorio';
                $inputDiscount.classList.add('is-invalid')
                $inputDiscount.nextElementSibling.style.color = 'red';
                break;
            case !regExNumber.test($discount.value):
                $discountErrors.innerText = 'El campo descuento debe ser un número';
                $inputDiscount.classList.add('is-invalid')
                break;
            case $inputDiscount.value < 0:
                $discountErrors.innerText = 'El campo descuento debe 0 o mayor';
                $inputDiscount.classList.add('is-invalid')
                break;
            case $inputDiscount.value > 100:
                $discountErrors.innerText = 'El campo descuento no puede superar el 100%';
                $inputDiscount.classList.add('is-invalid')
                break;
            default:
                $inputDiscount.classList.remove('is-invalid');
                $inputDiscount.classList.add('is-valid');
                $discountErrors.innerText = ''
                break;
        }
    });

    $description.addEventListener('blur', function () {
        switch (true) {
            case !$description.value.trim():
                $descriptionErrors.innerText = 'El campo descripción es obligatorio';
                $description.classList.add('is-invalid')
                $description.nextElementSibling.style.color = 'red';
                break;
            case !regExDescription.test($description.value):
                $descriptionErrors.innerText = 'El campo descripción debe tener al menos 20 caracteres';
                $description.classList.add('is-invalid')
                break;
            default:
                $description.classList.remove('is-invalid');
                $description.classList.add('is-valid');
                $descriptionErrors.innerText = ''
                break;
        }
    });

    $inputImage.addEventListener('blur', () => {
        let filePath = $inputImage.value,
            allowedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
            const fileExtension = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
            switch (true) {
                case !$inputImage.value:
                    $imagesErrors.innerText = "Debes seleccionar una imagen de producto";
                    $inputImage.classList.add('is-invalid');
                    break;
                case !allowedExtensions.includes(fileExtension):
                    $imagesErrors.innerText = "Imagen con formato no compatible";
                    $inputImage.classList.add('is-invalid');
                    break;
                default:
                    $inputImage.classList.remove('is-invalid');
                    $inputImage.classList.add('is-valid');
                    $imagesErrors.innerText = '';
                    break;
            }
        });

  $form.addEventListener("submit", (event) => {
    event.preventDefault();

    let elementosConErrores = document.querySelectorAll(".is-invalid");
    let errores = elementosConErrores.length > 0;

    if (errores) {
          $submitErrors.innerText = "Hay errores en el formulario";
    } else {
          $form.submit();
    }
});

});