import mongoose from "mongoose";
let Schema = mongoose.Schema;
import autopopulate from 'mongoose-autopopulate'
const ObjectId = mongoose.Schema.Types.ObjectId;

export const CartSchema = new Schema({
    products: [{
        type: ObjectId,
        ref: 'Product',
        autopopulate: true
    }]
});

CartSchema.plugin(autopopulate);
