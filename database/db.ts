import mongoose from "mongoose";

/**
 *
 * conectar con la baswe de datos
 * 0 - disconnected
 * 1 - connected
 * 2 - connecting
 * 3 - disconnecting
 *
 */

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConnected === 1) {
    console.log("conectados...");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log("conectados a la segunda...");
      return;
    }

    await mongoose.disconnect();
  }
  await mongoose.connect(process.env.MONGO_URL || "");
  mongoConnection.isConnected = 1;
  console.log("conectado a Mongo-DB:", process.env.MONGO_URL || "");
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  console.log("desconectado de Mongo-DB");
};