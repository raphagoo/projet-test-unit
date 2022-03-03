import { listCarts, getCart, createCart, updateCart, deleteCart } from "../controllers/cartController.js";

export const cartRoutes = (app) => {
    app.route('/cart')
        .get(listCarts);

    app.route('/cart')
        .post(createCart)

    app.route('/cart/:id')
        .get(getCart);

    app.route('/cart/:id')
        .put(updateCart);

    app.route('/cart/:id')
        .delete(deleteCart);
}
