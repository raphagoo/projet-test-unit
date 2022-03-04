import mongoose from 'mongoose';
import {ProductSchema} from "../models/productModel.js";
const Product = mongoose.model('Product', ProductSchema);
import {expect} from "chai";

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
    Product.findOne({id: req.params.id})
        .exec((err, cart) => {
            if(err) {
                res.status(400).send(err);
            } else if(cart == null) {
                res.sendStatus(404)
            } else {
                res.status(200).json(cart)
            }
        });
};


export const createProduct = (req, res) => {
    let newProduct = new Product(req.body);
    newProduct.save((err, product) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(product)
        }
    })
}
export const updateProduct = (req, res) => {
    if(req.params){
        Product.findOneAndUpdate({"id": req.params.id}, req.body, {new: true, useFindAndModify: false})
            .exec((err, product) => {
                if(err) {
                    res.status(400).send(err);
                } else {
                    if(product == null) {
                        res.sendStatus(404);
                    }
                    else {
                        res.status(200).json(product);
                    }
                }
            });
    }
    else{
        res.sendStatus(403)
    }
};

export const deleteProduct = (req, res) => {
    Product.findOneAndDelete({"id": req.params.id}, (err, cart) => {
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
