import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(process.env.MONGO_URI)
}

/*
async function connectAndCloseDatabase() {
  try {
    // Start MongoDB connection
    await mongoose.connect(bURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Perform database operations here...

    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('Connection to MongoDB closed');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

// Call the function to connect and close the database
connectAndCloseDatabase();
*/
