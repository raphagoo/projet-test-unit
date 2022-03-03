import mongoose from "mongoose";
import {ProductSchema} from "../src/models/productModel.js";
const Product = mongoose.model('Product', ProductSchema);
//Require the dev-dependencies
import chai from 'chai'
import chaiHttp from "chai-http";
import server from '../index.js'
let should = chai.should();

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


chai.use(chaiHttp);
//Our parent block
describe('Products', () => {
    describe('/GET products', () => {
        it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/product/list')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('products')
                    done();
                });
        });
    });

    describe('/DELETE products', () => {
        it('it should DELETE a product', (done) => {
            chai.request(server)
                .delete('/product/' + getRandomArbitrary(1, 820))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('products')
                    done();
                });
        });
    });

    describe('/POST products', () => {
        it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/product/list')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('products')
                    done();
                });
        });
    });

});
