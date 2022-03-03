
import mongoose from "mongoose";
let Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

export const CartSchema = new Schema({
    products: {
        type: ObjectId,
        ref: 'Race',
        autopopulate: true
    }
});

CartSchema.plugin(require('mongoose-autopopulate'));
