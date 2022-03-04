import mongoose from "mongoose";

import axios from "axios";
import {ProductSchema} from "../src/models/productModel.js";
const Product = mongoose.model('Product', ProductSchema);
import {CartSchema} from "../src/models/cartModel.js";

const Cart = mongoose.model('Cart', CartSchema);

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://raphagoo:password1234@raphcluster.hjbxp.mongodb.net/projetTestUnit', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, error => {
    if(error) {
        console.log(error);
        process.exit(1);
    }
});
Cart.deleteMany({}).exec()
Product.deleteMany({}).exec().then(() => {

    let pages = []
    let promises = []
    let counter = 0
    axios.get('https://rickandmortyapi.com/api/character').then(response => {
        for (let i = 1; i < response.data.info.pages; i++) {
            promises.push(
                new Promise((resolve, reject) => {
                    axios.get('https://rickandmortyapi.com/api/character/?page=' + i).then(r => {
                        pages.push(r.data.results)
                        resolve()
                    })
                })
            )
        }
        Promise.all(promises).then(() => {
            pages.forEach(page => {
                page.forEach(character => {
                    let newProd = new Product({
                        id: character.id,
                        name: character.name,
                        status: character.status,
                        species: character.species,
                        image: character.image
                    })
                    newProd.save().then(prod => {
                        counter++
                        if (counter === 820) {
                            process.exit(0)
                        }
                    })
                })
            })
        })
    })
})
