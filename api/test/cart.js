//Require the dev-dependencies
import chai from 'chai'
import chaiHttp from "chai-http";
import server from '../index.js'
let should = chai.should();


chai.use(chaiHttp);

let cartId = '';
//Our parent block
describe('Cart', () => {

    beforeEach( async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
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
