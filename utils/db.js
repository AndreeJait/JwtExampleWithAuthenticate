import mongoose from "mongoose";

const connectToDatabase = async (URI) => {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.log(err);
  });
  db.on("open", () => {
    console.log(`database connected`);
  });
};

export { connectToDatabase };
