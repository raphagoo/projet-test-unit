import mongoose from 'mongoose';
import { CartSchema } from "../models/cartModel.js";
const Cart = mongoose.model('Cart', CartSchema);

export const createCart = (req, res) => {
    let newCart = new Cart(req.body);
    newCart.save((err, cart) => {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(cart)
        }
    })
};

export const listCarts = (req, res) => {
    Cart.find({})
        .exec((err, carts) => {
            if(err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(carts)
            }
        })
};

export const getCart = (req, res) => {
    Cart.findById(req.params.id)
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

export const updateCart = (req, res) => {
    if(req.params){
        Cart.findOneAndUpdate({"_id": req.params.id}, req.body, {new: true, useFindAndModify: false})
            .exec((err, cart) => {
                if(err) {
                    res.status(400).send(err);
                } else {
                    if(cart == null) {
                        res.sendStatus(404);
                    }
                    else {
                        res.status(200).json(cart);
                    }
                }
            });
    }
    else{
        res.sendStatus(403)
    }
};

export const deleteCart = (req, res) => {
    Cart.findOneAndDelete({"id": req.params.id}, (err, cart) => {
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
