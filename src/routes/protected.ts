import { Router } from "express";
const router = Router();

import { verify } from "../middleware/verify-token";
import { getUser, updateUser } from "../controllers/protected/user";
import { addProduct, getAllProducts } from "../controllers/protected/product";
import  multer from 'multer'
import path from "path";

router.get('/', verify,getUser)
router.put('/update', verify,updateUser)

// -------- product ---------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Set the destination folder for the images
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      // Set the filename for the images
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });

  
const upload = multer({ storage: storage });
router.post('/product/add', verify,upload.array("images"), addProduct)
router.get('/product/get', verify,getAllProducts)

export default router
