import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import { Entry } from "../../models";

/***
 * Archivo solo para desarrollo
 * Llenar la base de datos con info de prueba
 */

type Data = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({
      msg: "No tiene accesos a este servicio",
    });
  }

  await db.connect();
  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);
  await db.disconnect();
  res.status(200).json({ msg: "Proceso ejecutado correctamente" });
}
