import mongoose from "mongoose"


const connectMongo = async () => {

    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI,
            // {
            //     dbName: "learning_management_system"
            // }
        )
        console.log("Database Connected Successfully", connection.name)
    } catch (error) {
         process.exit(1)
    }
}

export default connectMongo

