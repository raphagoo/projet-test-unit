const state = {};
import api from '../interfaces/apiInterface';

const actions = {
    listProducts({commit}){
        api.get('/product/list').then(products => {
            commit('listProductsSuccess', products)
        })
    },
};

const mutations = {
    listProductsSuccess(state, products){
        state.list = products.data.data
    },
    removeFromCartSuccess(state, id){
        state.all = state.all.filter(function( obj ) {
            return obj.id !== id;
        });
    }
};

export const product = {
    namespaced: true,
    state,
    actions,
    mutations
};
