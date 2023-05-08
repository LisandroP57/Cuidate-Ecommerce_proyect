const { check } = require("express-validator");

module.exports = [
  check('name')
  .notEmpty()
  .withMessage("Debe contener el nombre del producto")
  .isLength({ min: 5 })
  .withMessage("El nombre debe tener mínimo 5 carácteres"),

  check('description')
  .notEmpty()
  .withMessage("Debe contener la descripción del producto")
  .isLength({ min: 20 })
  .withMessage("La descripcion debe tener mínimo 20 carácteres"),
  
  check('images')
      .custom((value, { req }) => {
        const file = req.files;
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!file) {
          throw new Error('Debe seleccionar una imagen');
        }
        const extension = path.extname(file.originalname);
        if (!allowedExtensions.test(extension)) {
          throw new Error('La imagen debe tener una extensión JPG, JPEG, PNG o GIF');
        }
        return true;
      }),

  check("category")
  .notEmpty()
  .withMessage("La categoría es obligatoria"),

  check("subcategory")
  .notEmpty()
  .withMessage("La subcategoría es obligatoria"),

  check('price')
  .notEmpty()
  .withMessage("El producto lo estarías dando gratis...")
  .isNumeric()
  .withMessage("Solo puedes ingresar números"),
]