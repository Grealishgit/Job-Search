import mongoose from 'mongoose'


//connecting to MongoDB
const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URL}`)

}
export default connectDB