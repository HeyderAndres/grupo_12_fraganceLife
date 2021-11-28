const express = require("express");
const router = express.Router();
const path = require('path');
const multer= require('multer')
const {body} = require('express-validator')
const controller = require('../controllers/product.controller');
<<<<<<< HEAD
const storage = multer.diskStorage({
	destination : function(req, file, cb) {
		cb(null, path.resolve(__dirname, '../../public/img'))
	},
	filename : function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
}
);
const uploadFile = multer({ storage });

//validaciones campos
const validateCreateForm =[
    body('nombreProducto').notEmpty().withMessage('Debes completar el campo nombre'),
    body('precioProducto').notEmpty().withMessage('Debes completar el campo apellido').bail()
	.isInt().withMessage('Debes ingresar un numero'),
    body('brand').notEmpty().withMessage('Debes seleccionar una marca'),
	body('smellFamily').notEmpty().withMessage('Debes seleccionar una Familia Aroma'),
	body('gender').notEmpty().withMessage('Debes seleccionar un genero'),
	body('discount').notEmpty().withMessage('Debes ingresar un descuento de 0 a 100').bail()
	.isInt().withMessage('Debes ingresar un numero'),
	body('imagenProducto').custom((value,{req}) =>{
        let file = req.file
        let acceptedExtensions = ['.jpg', '.png', '.gif','.jpeg'];
        
        if(!file){
            throw new Error('Tienes que subir una imagen')
        }else{
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extenciones de archivo permitidas son ${acceptedExtensions.join(',')}`)
            }
        }

        return true;
    }),
	body('descripcion').notEmpty().withMessage('Debes agregar una descripcion')
]
//router.get('/detalleproducto', controller.detalle_producto);
=======

router.get('/listaProductos', controller.getProducts);

router.get('/detalleproducto', controller.detalle_producto);
>>>>>>> 2401c052c60844209172767e56e2a125a9490047

router.get('/carritoDeCompras', controller.CarritoDeCompras);

router.get('/crearProducto', controller.crearNuevoProducto);
router.post('/crearProducto',uploadFile.single('imagenProducto'),validateCreateForm, controller.store);

/*** GET ONE PRODUCT detail ***/
router.get('/:id',controller.detail);

router.get('/editarProducto', controller.editarProducto);

router.get('/productsMen',controller.getProductsMen);

router.get('/productsWomen',controller.getProductsWomen);

router.get('/editarProducto/:idProducto/editar', controller.editarProducto);

router.put('/editarProducto/:idProducto', controller.productoEditado);

module.exports = router;