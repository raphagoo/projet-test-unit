//Require the dev-dependencies
import chai from 'chai'
import chaiHttp from "chai-http";
import server from '../index.js'
let should = chai.should();
chai.use(chaiHttp);
//Our parent block
describe('Products', () => {

    beforeEach( async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("----------------------");
    });

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

    describe('/POST products', () => {
        it('it should POST a product', (done) => {
            chai.request(server)
                .post('/product')
                .send({id: 999, name: 'mon test'})
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('_id')
                    done();
                });
        });
    });

    describe('/GET product', () => {
        it('it should GET a product by id', (done) => {
            chai.request(server)
                .get('/product/' + 999)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/PUT products', () => {
        it('it should UPDATE a product', (done) => {
            chai.request(server)
                .put('/product/' + 999)
                .send({name: 'mon test modifié'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('_id')
                    done();
                });
        });
    });

    describe('/DELETE products', () => {
        it('it should DELETE a product', (done) => {
            chai.request(server)
                .delete('/product/' + 999)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });

});
