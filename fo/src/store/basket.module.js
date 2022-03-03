const state = {products: [], totalPrice: 0};

const actions = {
    addToBasket({commit}, product){
        commit('addToBasketSuccess', product)
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
        state.totalPrice = state.totalPrice + (product.price.data[0].unit_amount * 1.0 / 100)
        product.quantity = 1
        let exists = state.products.find(item => item.id === product.id)
        if(typeof exists === "undefined"){
            state.products.push(product)
        } else {
            state.products.forEach(item => {
                if(item.id === product.id){
                    item.quantity++
                }
            })
        }
    },
    removeOneProductSuccess(state, product){
        state.totalPrice = state.totalPrice - (product.price.data[0].unit_amount * 1.0 / 100)
        state.products.forEach(item => {
            if(product.id === item.id){
                product.quantity--
            }
        })
    },
    removeFromCartSuccess(state, product){
        state.totalPrice = state.totalPrice - (product.price.data[0].unit_amount * 1.0 / 100 * product.quantity)
        state.products = state.products.filter(function( obj ) {
            return obj.id !== product.id;
        });
    }
};

export const basket = {
    namespaced: true,
    state,
    actions,
    mutations
};
