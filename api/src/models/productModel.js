
import mongoose from "mongoose";
let Schema = mongoose.Schema;

export const ProductSchema = new Schema({
    id: {
        type: Number,
        required: 'Id required'
    },
    name: {
        type: String,
        required: 'name required'
    },
    status: {
        type: String
    },
    species: {
        type: String,
    },
    image: {
        type: String,
    }
});
