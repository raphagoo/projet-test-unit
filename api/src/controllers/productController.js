import mongoose from 'mongoose';
import { verifyJwt } from '../services/jwtVerification.js';
import * as https from "https";

export const listProducts = (req, res) => {
    https.get('https://rickandmortyapi.com/api/character', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.status(200).send(data)
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
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

export const changeVisibilityProduct = (req, res) => {
    stripe.products.update(req.params.id, {
        active: req.body.active
    }).then(product => {
        res.status(200).json(product)
    })
}
