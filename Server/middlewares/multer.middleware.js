// Multer is used to store the uploaded files from the client, multer only suppor the form data which is send by encoding='multipart/form-data' , Multer will create a file object in req object, we can extract the data of files from the "req.file" Object.



import multer  from "multer";
import path from 'path'


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads')
    },

    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})


const upload = multer({
    storage: storage,
    limits:{
        fileSize:100*1024*1024   // 100MB
    },
    
    fileFilter: function(req,file,cb){
        const ext = path.extname(file.originalname).toLowerCase() 

        if(ext === '.png' || ext ==='.jpeg'|| ext ==='.jpg'|| ext === '.webp' || ext === '.jfif'){
            // only accept this types of file for images
            cb(null,true)
        }else if(ext === '.mp4' || ext ==='.avi'|| ext ==='.mkv'|| ext === '.wmv' || ext === '.flv'){
           //Only accept this types of files for vidoes
            cb(null,true)
        }
        else{
            // console.log("Invalid File format")
            cb(null,false)
        }
    }
})
 

export default upload