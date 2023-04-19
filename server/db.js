import mongoose from "mongoose";
import { MONGODB_URL } from "./config.js";
export const connectionDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`conexion con exito a la base de datos: ${db.connection.name}`)
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
