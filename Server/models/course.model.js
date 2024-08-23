import { Schema,model } from "mongoose";

const courseSchema = new Schema({
    topic:{
        type:String,
        trim:true,
        required:[true,"Topic is Required"],
        minlength:[5,"Topic Should have atleast 5 Characters"],
        maxlength:[60,"Topic Must be Less than 60 Characters"]
    },
    description:{
        type:String,
        trim:true,
        required:[true,"Descrition is Required"],
        minlength:[10,"Description Should have atleast 10 characters"],
    },

    category:{
        type:String,
        required:[true,"Category is Required"]
    },

    rating:{
        type:Number,
        default:0
    },

    price:{
        type:Number,
        default:0
    },

    discount:{
        type:Number,
        default:0
    },

    thumbnail:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },

    lectures:[
        {
            title:{
                type:String,
                trim:true,
                require:[true,"Title is Required"]
            },
            description:{
                type:String,
                trim:true,
                require:[true,"Description of Lecture is Required"]
            },
            thumbnail:{
                public_id:{
                    type:String
                },
                secure_url:{
                    type:String
                }
            },      
            lectureVideo:{
                public_id:{
                    type:String
                },
                secure_url:{
                    type:String
                }
            },
            youtubeLink:{
                type:String,
                trim:true
            }
        }
    ],

    noOfLectures:{
        type:Number,
        default:0
    },
    
    createdBy:{
        type:String,
        trim:true,
    }
   
},{
    timestamps:true
})

courseSchema.pre("save", function(next){
    this.noOfLectures = this.lectures.length;
    this.category = this.category.trim().replace(/\s+/g, '-').toLowerCase();
    next()
})


const courseModel = model('Courses',courseSchema)

export default courseModel