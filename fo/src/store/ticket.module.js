const state = {};
import api from '../interfaces/apiInterface';

const actions = {
    createTicket({commit}, ticket){
        api.post('/ticket', ticket).then(() => {
            commit('createTicketSuccess')
        })
    },
};

const mutations = {
    createTicketSuccess(){

    },
    removeFromCartSuccess(state, id){
        state.all = state.all.filter(function( obj ) {
            return obj.id !== id;
        });
    }
};

export const ticket = {
    namespaced: true,
    state,
    actions,
    mutations
};
