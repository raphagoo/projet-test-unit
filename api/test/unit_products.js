//import the Product model
import mongoose from "mongoose";
import {ProductSchema} from "../src/models/productModel.js";
const Product = mongoose.model('Product', ProductSchema);
import { strict as assert } from 'assert';

describe('Product', () => {
    beforeEach( async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("----------------------");
    });

    it('Creates a New Product', (done) => {
        const newProduct = new Product({ name: 'mon produit', id: 999 });
        newProduct.save() // returns a promise after some time
            .then(() => {
                //if the newProduct is saved in db and it is not new
                assert(!newProduct.isNew);
                done();
            });
    });

    it('Finds product with the id', (done) => {
        Product.findOne({ id: 999 })
            .then((product) => {
                assert(product.id === 999);
                done();
            });
    })

    it('Updates a product using its id', (done) => {
        Product.findOneAndUpdate({id: 999}, {name: 'mon product modifié'}, {useFindAndModify: false})
            .then(() => Product.findOne({ name: 'mon product modifié' }))
            .then((product) => {
                assert(product.id === 999);
                done();
            });
    })

    it('Removes a product using its id', (done) => {
        Product.findOneAndRemove({id: 999}, {useFindAndModify: false})
            .then(() => Product.findOne({ id: 999 }))
            .catch((err) => console.log(err))
            .then((product) => {
                assert(product === null);
                done();
            })
            .catch((err) => console.log(err))
    })
});
