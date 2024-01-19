import { Request, Response, Router } from "express";
const router = Router();

import { verify } from "../middleware/verify-token";
import { changePassword, deleteProfileImage, deleteUserImage, deleteUserVideo, getAllUsers, getUser, updateProfileImage, updateUser, uploadUserImages, uploadUserVideo } from "../controllers/protected/user";
import { addProduct, buyProduct, getAllProducts } from "../controllers/protected/product";
import  multer, { FileFilterCallback } from 'multer'
import path from "path";
import { addReview, updateReview } from "../controllers/protected/review";
import { addPayment } from "../controllers/protected/payment";
import { changePasswordValidation, changePasswordValidationMiddleware } from "../middleware/change-password-validation";
import Stripe from "stripe";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder for uploads
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
const ImageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  // Check if the file is an image
  if (!file.mimetype.startsWith('image/')) {
    return cb(null, false);
  }

  cb(null, true);
};
const VideoFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  // Check if the file is an image
  if (!file.mimetype.startsWith('video/')) {
    return cb(null, false);
  }

  cb(null, true);
};
const upload5mbImage = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 4 MB limit
  },
  fileFilter: ImageFilter,
});
const upload5mbVideo = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 4 MB limit
  },
  fileFilter: VideoFilter,
});

router.get('/', verify,getUser)
router.get('/all-user',getAllUsers)
router.put('/update', verify,updateUser)
router.post('/change-password', verify,changePasswordValidationMiddleware,changePasswordValidation,changePassword)

router.post('/update-profile-photo', verify,upload.single('profile_photo'),updateProfileImage)
router.post('/delete-profile-photo', verify,deleteProfileImage)

router.post('/add-user-images', verify,upload5mbImage.single('user_images'),uploadUserImages)
router.post('/delete-user-images/:imageName', verify,deleteUserImage)

router.post('/add-user-videos', verify,upload5mbVideo.single('user_videos'),uploadUserVideo)

router.post('/delete-user-videos/:imageName', verify,deleteUserVideo)


router.post("/create-checkout-session",verify,addPayment)

// <-------- product --------------->
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
     
//       cb(null, "images");
//     },
//     filename: (req, file, cb) => {
     
//       cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//     },
//   });

  
// const upload = multer({ storage: storage });
router.post('/product/add', verify,upload.array("images"), addProduct)
router.put('/product/buy',verify,buyProduct)
router.get('/product/get',getAllProducts)

// <-------- product --------------->

// <-------- REVIEW --------------->
router.post('/review/add', verify, addReview)
router.put('/review/update/:reviewId', verify,updateReview)

// <-------- REVIEW --------------->



export default router
