alert("hola")


let qs = (elemento) => {
    return document.querySelector(elemento);
}

window.addEventListener('load', () => {

    let
        $name = qs('#name'),
        $nameErrors = qs('#nameErrors'),
        $category = qs('#category'),
        $categoryErrors = qs('#categoryErrors'),
        $subcategory = qs('#subCategory'),
        $subcategoryErrors = qs('#subCategoryErrors'),
        $price = qs('#price'),
        $priceErrors = qs('#priceErrors'),
        $discount = qs('#discount'),
        $discountErrors = qs('#discountErrors'),
        $file = qs('#productPhoto'),
        $fileErrors = qs('#imageErrors'),
        $imgPreview = qs('#img-preview'),
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
    })

    $category.addEventListener('change', function () {
        switch (true) {
            case !$category.value.trim():
                $categoryErrors.innerText = 'El campo categoría es obligatorio';
                $category.classList.add('is-invalid')
                break;
            default:
                $category.classList.remove('is-invalid');
                $category.classList.add('is-valid');
                $categoryErrors.innerText = ''
                break;
        }
    })

    $subcategory.addEventListener('change', function () {
        switch (true) {
            case !$subcategory.value.trim():
                $subcategoryErrors.innerText = 'El campo subcategoría es obligatorio';
                $subcategory.classList.add('is-invalid')
                break;
            default:
                $subcategory.classList.remove('is-invalid');
                $subcategory.classList.add('is-valid');
                $subcategoryErrors.innerText = ''
                break;
        }
    })

    $price.addEventListener('blur', function () {
        switch (true) {
            case !$price.value.trim():
                $priceErrors.innerText = 'El campo precio es obligatorio';
                $price.classList.add('is-invalid')
                break;
            case !regExFloat.test($price.value):
                $priceErrors.innerText = 'El campo precio debe ser un número';
                $price.classList.add('is-invalid')
                break;
            case $price.value < 0:
                $priceErrors.innerText = 'El campo precio debe ser mayor a 0';
                $price.classList.add('is-invalid')
                break;
            default:
                $price.classList.remove('is-invalid');
                $price.classList.add('is-valid');
                $priceErrors.innerText = ''
                break;
        }
    })

    $discount.addEventListener('blur', function () {
        switch (true) {
            case !$discount.value.trim():
                $discountErrors.innerText = 'El campo descuento es obligatorio';
                $discount.classList.add('is-invalid')
                break;
            case !regExNumber.test($discount.value):
                $discountErrors.innerText = 'El campo descuento debe ser un número';
                $discount.classList.add('is-invalid')
                break;
            case $discount.value < 0:
                $discountErrors.innerText = 'El campo descuento debe 0 o mayor';
                $discount.classList.add('is-invalid')
                break;
            case $discount.value > 100:
                $discountErrors.innerText = 'El campo descuento no puede superar el 100%';
                $discount.classList.add('is-invalid')
                break;
            default:
                $discount.classList.remove('is-invalid');
                $discount.classList.add('is-valid');
                $discountErrors.innerText = ''
                break;
        }
    })

    $file.addEventListener('change', () => {
        let filePath = $file.value, //Capturo el valor del input
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            $fileErrors.innerText = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file.value = '';
            $imgPreview.innerText = '';
            return false;
        }else{
            // Image preview
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
    })

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
    })

    $form.addEventListener("submit", (event) => {
        event.preventDefault();
        const FORM_ELEMENTS = event.target.elements;

       /* for (let index = 0; index < FORM_ELEMENTS.length - 1; index++) {
            const element = FORM_ELEMENTS[index];
            if(element.value === "" && element.type !== "file") {
                element.classList.add("is-invalid")
            }
            /* element.dispatchEvent(new Event("blur")) */
        //}

        let elementosConErrores = document.querySelectorAll(".is-invalid");
        let errores = elementosConErrores.length > 0; 

        if(errores) {
            $submitErrors.innerText = "Hay errores en el formulario"
        } else {
            $form.submit()
        }
     })

});