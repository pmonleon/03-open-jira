import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data = { message: string } | IEntry[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  // if (!mongoose.isValidObjectId(id)) {
  //   return res.status(400).json({ message: "id no valido" + "" + id });
  // }

  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);

    default:
      return res
        .status(400)
        .json({ message: "Endpoint no existe, error metodo " + req.method });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
    const entryById = await Entry.findById(id);
    await db.disconnect();
    if (!entryById) {
      return res
        .status(400)
        .json({ message: "no hay ninguna entrada con ese" + id });
    }
    //@ts-ignore
    return res.status(200).json(entryById);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: "Algo slaio mal" });
  }
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "no hay ninguna entrada con ese" + id });
    }

    const {
      //@ts-ignore
      description = entryToUpdate.desciption,
      //@ts-ignore
      status = entryToUpdate.status,
    } = req.body;
    try {
      const updatedEntry = await Entry.findByIdAndUpdate(
        id,
        { description, status },
        { runValidators: true, new: true }
      );
      await db.disconnect();
      //@ts-ignore
      return res.status(200).json(updatedEntry!);
    } catch (error: any) {
      await db.disconnect();
      // console.log(error);
      return res.status(400).json({ message: error.errors });
    }
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(500).json({ message: "Algo slaio mal" });
  }
};
