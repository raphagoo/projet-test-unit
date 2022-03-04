//Require the dev-dependencies
import chai, {expect} from 'chai'
import chaiHttp from "chai-http";
import server from '../index.js'
import {strict as assert} from "assert";
let should = chai.should();


chai.use(chaiHttp);

let cartId = '';
//Our parent block
describe('Cart', () => {

    beforeEach( async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("----------------------");
    });

    describe('/GET carts', () => {
        it('it should GET all the carts', (done) => {
            chai.request(server)
                .get('/cart')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/POST cart', () => {
        it('it should POST a cart', (done) => {
            chai.request(server)
                .post('/product')
                .send({id: 999, name: 'mon test'})
                .end((err, res) => {
                    chai.request(server)
                        .post('/cart')
                        .send({products: [res.body._id]})
                        .end((err, res) => {
                            cartId = res.body._id
                            res.should.have.status(201);
                            done();
                        })
                });
        });
    });

    describe('/GET cart', () => {
        it('it should GET a cart by id', (done) => {
            chai.request(server)
                .get('/cart/' + cartId)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/UPDATE cart', () => {
        it('it should UPDATE a cart', (done) => {
            chai.request(server)
                .post('/product')
                .send({id: 998, name: 'mon test modifié'})
                .end((err, res) => {
                    chai.request(server)
                        .put('/cart/' + cartId)
                        .send({products: [res.body._id]})
                        .end((err, res) => {
                            res.should.have.status(200);
                            expect(res.body.products === [res.body._id]);
                            done();
                        })
                });
        });
    });

    describe('/DELETE cart', () => {
        it('it should DELETE a cart', (done) => {
            chai.request(server)
                .delete('/product/' + 999)
                .end()
            chai.request(server)
                .delete('/cart/' + cartId)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

});
