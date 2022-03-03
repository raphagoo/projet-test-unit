import { listProducts, getProduct, createProduct, updateProduct, changeVisibilityProduct } from "../controllers/productController.js";

export const productRoutes = (app) => {
    app.route('/product/list')
        .get(listProducts);

    app.route('/product')
        .post(createProduct)

    app.route('/product/:id')
        .get(getProduct);

    app.route('/product/:id')
        .put(updateProduct);

    app.route('/product/hide/:id')
        .put(changeVisibilityProduct);
}
