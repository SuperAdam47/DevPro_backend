import { Router } from "express";
const router = Router();

import { verify } from "../middleware/verify-token";
import { getUser, updateUser } from "../controllers/protected/user";
import { addProduct, getAllProducts } from "../controllers/protected/product";
import  multer from 'multer'
import path from "path";
import { addReview, updateReview } from "../controllers/protected/review";

router.get('/', verify,getUser)
router.put('/update', verify,updateUser)

// <-------- product --------------->
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
     
      cb(null, "images");
    },
    filename: (req, file, cb) => {
     
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });

  
const upload = multer({ storage: storage });
router.post('/product/add', verify,upload.array("images"), addProduct)
router.get('/product/get',getAllProducts)

// <-------- product --------------->

// <-------- REVIEW --------------->
router.post('/review/add', verify, addReview)
router.put('/review/update/:reviewId', verify,updateReview)

// <-------- REVIEW --------------->


export default router
