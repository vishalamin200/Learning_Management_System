import mongoose, { Schema, model } from "mongoose";

const courseSchema = new Schema({
    topic: {
        type: String,
        trim: true,
        required: [true, "Topic is Required"],
        minlength: [5, "Topic Should have atleast 5 Characters"],
        maxlength: [60, "Topic Must be Less than 60 Characters"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Descrition is Required"],
        minlength: [10, "Description Should have atleast 10 characters"],
    },

    category: {
        type: String,
        required: [true, "Category is Required"]
    },

    rating: {
        type: Number,
        default: 0
    },

    allRatings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userModel',
                required: true
            },
            value: {
                type: Number,
                default: 0,
                required: true
            }
        }
    ],

    price: {
        type: Number,
        default: 0
    },

    discount: {
        type: Number,
        default: 0
    },

    level: {
        type: String
    },

    language: {
        type: String,
    },

    thumbnail: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },

    lectures: [
        {
            title: {
                type: String,
                trim: true,
                require: [true, "Title is Required"]
            },
            description: {
                type: String,
                default: "",
                trim: true,
                require: [true, "Description of Lecture is Required"]
            },
            thumbnail: {
                public_id: {
                    type: String
                },
                secure_url: {
                    type: String
                }
            },
            video: {
                public_id: {
                    type: String,
                    default: null
                },
                secure_url: {
                    type: String,
                    default: null
                }
            },
            youtubeLink: {
                type: String,
                default: "",
                trim: true
            }
        }
    ],

    noOfLectures: {
        type: Number,
        default: 0
    },

    createdBy: {
        type: String,
        trim: true,
    },

    creatorEmail: {
        type: String,
        trim: true,
        lowercase:true
    }

}, {
    timestamps: true,
    autoIndex:false,
})

courseSchema.pre("save", function (next) {
    this.noOfLectures = this.lectures.length;
    this.category = this.category.trim().replace(/\s+/g, '-').toLowerCase();
    next()
})

courseSchema.post('save', async function (document,next) {
    try {
        const numberOfRatings = document.allRatings.length
        const sumOfAllRatings = document.allRatings.reduce((sum, rating) => sum += rating.value,
            0)

        const newAverageRating = Math.round((numberOfRatings > 0 ? sumOfAllRatings / numberOfRatings : 0)*10)/10 
        
        if(document.rating != newAverageRating){
            document.rating = newAverageRating
            await document.save()
        }
        next()    
    } catch (error) {
        // console.log("Error In Course Model, Post Save function",error.message)
    }
})

courseSchema.pre("update", function (next) {
    this.noOfLectures = this.lectures.length;
    this.category = this.category.trim().replace(/\s+/g, '-').toLowerCase();
    next()
})


const courseModel = model('Courses', courseSchema)

async function getIndexes() {
    try {
        // Step 1: Get existing indexes
        const indexes = await courseModel.collection.indexes();
        // console.log("courseModel Indexes:", indexes);

    } catch (error) {
        console.error("Error In CourseModel Indexes:", error.message);
    }
}

// getIndexes();

export default courseModel