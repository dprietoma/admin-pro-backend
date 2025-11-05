const mongoose = require('mongoose');



const dbConnetionString = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
        });
        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to MongoDB: ");
    }
} 


module.exports = {
    dbConnetionString
}