import multer from "multer";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // store uploaded files into the 'upload' folder in the project
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // use the original file name
    }
})

export const upload = multer({ storage })


