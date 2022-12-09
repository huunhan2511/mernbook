import express from 'express'
import productCtrl from '../controllers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js';
import multer from "multer";
const router = express.Router()

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.get('/search', search);
router.get('/', getAllProducts)
router.post('/', authMiddleware.isAdmin, upload.array('image', 5), createProduct)
router.get('/:id', getProductDetail)
router.patch('/:id', authMiddleware.isAdmin, upload.array('image', 5), updateProduct)
router.get('/category/:id', getProductsByCategory)


function getAllProducts(req, res){
    productCtrl.getAllProducts().then((result) => {
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}

function createProduct(req, res){
    let {name, price, category, author, publisher, printLength, stock, hot, description} = req.body
    let image = []

    if(req.files) req.files.map((file) => {
        image.push('http://localhost:5000/'+file.path)
    })
    image.map((item) => {
      item = item.replace("/\\/g",'/')
    })

    productCtrl.createProduct(name, price, category, author, publisher, printLength, stock, hot, description, image).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.status(402).json({error})
    })
}

function getProductDetail(req, res){
    var id = req.params.id
    productCtrl.getProductDetailByID(id).then((result) =>{
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}

function updateProduct(req, res){
    var id = req.params.id
    let update = []
    let image = []
    update = req.body

    if(req.files) req.files.map((file) => {
        image.push('http://localhost:5000/'+file.path)
    })
    image.map((item) => {
      item = item.replace("/\\/g",'/')
    })
    update.image = image
    productCtrl.updateProduct(id, update).then((result) =>{
        res.json(result)
    }).catch((error) => {
        res.status(402).json(error)
    })
}
function search(req, res){
  let {name} = req.query;
  productCtrl.search(name).then((result) =>{
      res.json(result)
  }).catch((error) => {
      res.status(402).json(error)
  })
}

function getProductsByCategory(req, res){
	let id = req.params.id;
	productCtrl.getProductsByCategory(id)
	.then((result) => {
		res.json(result)
	}).catch((error) => {
		res.status(402).json(error)
	})
}
export default router;
