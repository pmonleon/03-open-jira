import mongoose from "mongoose"
import { db } from "."
import { Entry, IEntry } from "../models";


export const getEntryById = async(id:string): Promise<IEntry | null> => {
    if (!mongoose.isValidObjectId){
        return null
    }

    await db.connect();
    const entry = await Entry.findById(id).lean();
    await db.disconnect();
    return entry
}