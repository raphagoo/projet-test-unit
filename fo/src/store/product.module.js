const state = {};
import api from '../interfaces/apiInterface';

const actions = {
    listProducts({commit}){
        api.get('/product/list').then(products => {
            commit('listProductsSuccess', products)
        })
    },
    nextProducts({commit}, num){
        api.get('/product/list?page='+num).then(products => {
            commit('listProductsSuccess', products)
        })
    },
};



const mutations = {
    listProductsSuccess(state, products){
        state.list = products.data.products,
        state.page = products.data
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
