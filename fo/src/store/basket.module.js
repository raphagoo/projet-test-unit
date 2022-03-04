const state = {products: [], productsId: []};
import api from '../interfaces/apiInterface';
const actions = {
    
    addToBasket({commit}, product){
        commit('addToBasketSuccess', product)
       // console.log(product)
    },
    
    addBasketBDD({commit}, arrayBasket){
        api.post('/cart', {products : arrayBasket}).then(products => {
            
            commit('addBasketSucces', products)
        })
    },
    removeOne({commit}, product) {
        commit('removeOneProductSuccess', product)
    },
    remove({commit}, product) {
        commit('removeFromCartSuccess', product)
    }
};

const mutations = {
    addToBasketSuccess(state, product){
        product.quantity = 1
        let exists = state.products.find(item => item._id === product._id)
        if(typeof exists === "undefined"){
            state.products.push(product)
            state.productsId.push(product._id)
        } else {
            state.products.forEach(item => {
                if(item._id === product._id){
                    item.quantity++
                }
            })
        }
    },

    addBasketSucces(){

    }
    ,
    removeOneProductSuccess(state, product){
        state.products.forEach(item => {
            if(product._id === item._id){
                product.quantity--
            }
        })
    },

    removeFromCartSuccess(state, product){
        state.products = state.products.filter(function( obj ) {
          //  console.log(state.products)
            return obj._id !== product._id;
        });
        
        state.productsId = state.productsId.filter(productId => productId !== product._id);

        
    },
    
};

export const basket = {
    namespaced: true,
    state,
    actions,
    mutations
};
