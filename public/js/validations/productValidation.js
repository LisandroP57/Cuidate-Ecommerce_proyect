let qs = (elemento) => {
    return document.querySelector(elemento);
}

window.addEventListener('load', () => {

    let
        $name = qs('#name'),
        $nameErrors = qs('#nameErrors'),
        $price = qs('#inputPrice'),
        $priceErrors = qs('#priceErrors'),
        $category = qs("#categorySelect"),
        $categoryErrors = qs("#categoryErrors"),
        $subcategory = qs("#subcategorySelect"),
        $subcategoryErrors = qs("#subcategoryErrors"),
        $description = qs('#description'),
        $descriptionErrors = qs('#descriptionErrors'),
        $form = qs('#form'),
        $file = qs("#images"),
        $fileErrors = qs("#imagesErrors"),
        regExFloat = /^[0-9]*[.,]?[0-9]*$/, 
        regExDescription = /^.{20,}$/

    $name.addEventListener('blur', () => {
        switch (true) {
            case !$name.value.trim():
                $nameErrors.innerHTML = 'El campo nombre es obligatorio';
                $name.classList.add('is-invalid');
                $name.style.border = "1px solid red";
                $nameErrors.style.display = "block";
                break;
            case $name.value.trim().length < 5:
                $nameErrors.innerText = 'El campo nombre debe tener al menos 5 caracteres';
                $name.classList.add('is-invalid')
                $name.style.border = "1px solid red";
                $nameErrors.style.display = "block";
                break;
            default:
                $name.classList.remove('is-invalid');
                $name.classList.add('is-valid');
                $name.style.border = "1px solid green";
                $nameErrors.innerHTML = '';
                break;
        }
    });

    $price.addEventListener('blur', () => {
        switch (true) {
            case !$price.value.trim():
                $priceErrors.innerText = 'El precio es obligatorio';
                $price.classList.add('is-invalid')
                $price.style.border = "1px solid red";
                $priceErrors.style.display = "block";
                break;
            case !regExFloat.test($price.value):
                $priceErrors.innerText = 'El precio debe ser un número';
                $price.classList.add('is-invalid')
                $price.style.border = "1px solid red";
                $priceErrors.style.display = "block";
                break;
            default:
                $price.classList.remove('is-invalid');
                $price.classList.add('is-valid');
                $price.style.border = "1px solid green";
                $priceErrors.innerText = ''
                break;
        }
    });

    $category.addEventListener("blur", () => {
        if (!$category.value.trim()) {
          $categoryErrors.innerHTML = "Campo requerido";
          $category.classList.add("is-invalid");
          $category.style.border = "1px solid red";
          $categoryErrors.style.display = "block";
        } else {
          $category.classList.remove("is-invalid");
          $category.classList.add("is-valid");
          $category.style.border = "1px solid green";
          $categoryErrors.innerHTML = "";
        }
      });
    
      $subcategory.addEventListener("blur", () => {
        if (!$subcategory.value.trim()) {
          $subcategoryErrors.innerHTML = "Campo requerido";
          $subcategory.classList.add("is-invalid");
          $subcategory.style.border = "1px solid red";
          $subcategoryErrors.style.display = "block";
        } else {
          $subcategory.classList.remove("is-invalid");
          $subcategory.classList.add("is-valid");
          $subcategory.style.border = "1px solid green";
          $subcategoryErrors.innerHTML = "";
        }
    });

    $description.addEventListener('blur', function () {
        switch (true) {
            case !$description.value.trim():
                $descriptionErrors.innerText = 'El campo descripción es obligatorio';
                $description.classList.add('is-invalid')
                $description.style.border = "1px solid red";
                $descriptionErrors.style.display = "block";
                break;
            case !regExDescription.test($description.value):
                $descriptionErrors.innerText = 'El campo descripción debe tener al menos 20 caracteres';
                $description.classList.add('is-invalid')
                $description.style.border = "1px solid red";
                $descriptionErrors.style.display = "block";
                break;
            default:
                $description.classList.remove('is-invalid');
                $description.classList.add('is-valid');
                $description.style.border = "1px solid green";
                $descriptionErrors.innerText = ''
                break;
        }
    });

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form_elements = event.target.elements;

    for (let index = 0; index < form_elements.length - 1; index++) {
      const element = form_elements[index];
      if (
        element.value === "" &&
        element.type !== "file" &&
        element.name !== "discount" &&
        element.name !== "description"
      ) {
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
      if ($file.files && $file.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          $imgPreview.innerHTML = '<img src="' + e.target.result + '"/>';
        };
        reader.readAsDataURL($file.files[0]);
        $fileErrors.innerHTML = "";
        $file.classList.remove("is-invalid");
        $file.style.border = "1px solid green";
      }
    }
  });
});