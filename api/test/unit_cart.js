//import the Cart model
import mongoose from "mongoose";
import {CartSchema} from "../src/models/cartModel.js";
const Cart = mongoose.model('Cart', CartSchema);
import {ProductSchema} from "../src/models/productModel.js";
const Product = mongoose.model('Product', ProductSchema);
import { strict as assert } from 'assert';
import {expect} from "chai";

let cartId = ''

describe('Cart', () => {
    beforeEach( async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("----------------------");
    });

    it('Creates a New Cart', (done) => {
        const newProduct = new Product({ name: 'mon produit', id: 998 });
        newProduct.save() // returns a promise after some time
            .then((product) => {
                const newCart = new Cart({products: [product._id]});
                newCart.save() // returns a promise after some time
                    .then((cart) => {
                        //if the newCart is saved in db and it is not new
                        cartId = cart._id
                        assert(!newCart.isNew);
                        done();
                    });
            });
    });

    it('Finds list of carts', (done) => {
        Cart.find({})
            .then((carts) => {
                expect(carts).to.be.an('array');
                done();
            });
    })

    it('Updates a cart using its id', (done) => {
        const newProduct = new Product({ name: 'mon produit', id: 997 });
        newProduct.save() // returns a promise after some time
            .then((product) => {
                Cart.findByIdAndUpdate(cartId, {products: [product._id]}, {useFindAndModify: false})
                    .then(() => Cart.findById(cartId))
                    .then((cart) => {
                        expect(cart.products === [product._id]);
                        done();
                    });
            })
    })

    it('Removes a cart using its id', (done) => {
        Product.findOneAndRemove({id: 998}, {useFindAndModify: false}).exec()
        Product.findOneAndRemove({id: 997}, {useFindAndModify: false}).exec()
        Cart.findByIdAndRemove(cartId, {useFindAndModify: false})
            .then(() => done())
            .then((cart) => {
                assert(cart === null);
                done();
            })
    })
});
