let qs = (elemento) => {
    return document.querySelector(elemento);
}

window.addEventListener('load', () => {

    let
        $name = qs('#name'),
        $nameErrors = qs('#nameErrors'),
        $inputPrice = qs('#price'),
        $priceErrors = qs('#priceErrors'),
        $inputDiscount = qs('#discount'),
        $discountErrors = qs('#discountErrors'),
        $file = qs('#productPhoto'),
        $fileErrors = qs('#imageErrors'),
        $imgPreview = qs('#img-preview'),
        $description = qs('#description'),
        $descriptionErrors = qs('#descriptionErrors'),
        $form = qs('#form'),
        $submitErrors = qs('#submitErrors'),
        regExNumber = /^[0-9]*$/,
        regExFloat = /^[0-9]*[.,]?[0-9]*$/, //expresion reg que valida numero decimal en formato de punto flotante (con coma decimal opcional)
        regExDescription = /^.{20,}$/

    $name.addEventListener('blur', function () {
        switch (true) {
            case !$name.value.trim():
                $nameErrors.innerHTML = 'El campo nombre es obligatorio';
                $name.classList.add('is-invalid')
                break;
            case $name.value.trim().length < 5:
                $nameErrors.innerText = 'El campo nombre debe tener al menos 5 caracteres';
                $name.classList.add('is-invalid')
                break;
            default:
                $name.classList.remove('is-invalid');
                $name.classList.add('is-valid');
                $nameErrors.innerHTML = ''
                break;
        }
    });

    $inputPrice.addEventListener('blur', function () {
        switch (true) {
            case !$inputPrice.value.trim():
                $priceErrors.innerText = 'El campo precio es obligatorio';
                $inputPrice.classList.add('is-invalid')
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

    $file.addEventListener('change', () => {
        let filePath = $file.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            $fileErrors.innerText = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file.value = '';
            $imgPreview.innerText = '';
            return false;
        }else{
            // Image previa
            console.log($file.files);
            if($file.files && $file.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerText = '';
                $file.classList.remove('is-invalid')
            }
        }
    });

    $file.addEventListener("change", () => {
        let filePath = $file.value,
              allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i; 
        if (!allowefExtensions.exec(filePath)) {
              //El método exec() ejecuta una busqueda concidencias, o null
              $fileErrors.innerHTML = "Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif -.web)";
              $file.value = "";
              $imgPreview.innerHTML = "";
              return false;
        } else {
              // Imagen previa
              console.log($file.files);
              if ($file.files && $file.files[0]) {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                          $imgPreview.innerHTML = '<img class="img-product" src="' + e.target.result + '"/>';
                    };
                    reader.readAsDataURL($file.files[0]);
                    $fileErrors.innerHTML = "";
                    $file.classList.remove("is-invalid");
              }
        }
  });
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const FORM_ELEMENTS = event.target.elements;

    for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
          const element = FORM_ELEMENTS[index];
          if (element.value === "" && element.type !== "file") {
                element.classList.add("is-invalid");
                element.dispatchEvent(new Event("blur"));
          }
    }


    let elementosConErrores = document.querySelectorAll(".is-invalid");
    let errores = elementosConErrores.length > 0;

    if (errores) {
          $submitErrors.innerText = "Hay errores en el formulario";
    } else {
          $form.submit();
    }
});

});