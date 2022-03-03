import mongoose from 'mongoose';
import { verifyJwt } from '../services/jwtVerification.js';
import {ProductSchema} from "../models/productModel.js";
const Product = mongoose.model('Product', ProductSchema);

export const listProducts = (req, res) => {
    let perPage = 10
        , page = Math.max(0, req.query.page)

    Product.find()
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            id: 'asc'
        })
        .exec(function(err, products) {
            Product.countDocuments().exec(function(err, count) {
                res.status(200).send({
                    products: products,
                    page: page,
                    pages: count / perPage
                })
            })
        })
};

export const getProduct = (req, res) => {
    stripe.products.retrieve(req.params.id).then(product => {
        res.status(200).json(product)
    }).catch(error => {
        res.status(500).json(error)
    })
};


export const createProduct = (req, res) => {
    stripe.products.create({
        name: req.body.name,
        description: req.body.description,
        images: req.body.images.split(','),
        active: req.body.active
    }).then(product => {
        stripe.prices.create({
            unit_amount: req.body.price.data[0].unit_amount,
            currency: 'eur',
            product: product.id
        }).then(price => {
            product.price = price
            res.status(201).json(product)
        })
    })
}
export const updateProduct = (req, res) => {
    stripe.products.update(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        images: req.body.images.split(','),
        active: req.body.active
    }).then(product => {
        stripe.prices.update(req.body.price.data[0].id, {
            active: false
        }).then(() => {
            stripe.prices.create({
                unit_amount: req.body.price.data[0].unit_amount,
                currency: 'eur',
                product: req.params.id
            }).then(price => {
                product.price = price
                res.status(200).json(product)
            }).catch(error => {
                res.status(500).json(error)
            })
        })
    }).catch(error => {
        res.status(500).json(error)
    })
};

export const deleteCart = (req, res) => {
    Cart.findOneAndDelete({"_id": req.params.id}, (err, cart) => {
        if(err) {
            res.status(400).send(err);
        } else {
            if(cart == null) {
                res.sendStatus(404);
            }
            else {
                res.sendStatus(204);
            }
        }
    });
};
