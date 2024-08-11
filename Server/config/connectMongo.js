import mongoose  from "mongoose"


const connectMongo = async ()=>{

    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully", connection.name)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectMongo