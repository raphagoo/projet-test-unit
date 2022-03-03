
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import { product } from './product.module'
import { basket } from "./basket.module";
import { account } from "./account.module";
import { ticket } from "./ticket.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {product, basket, account, ticket},
    plugins: [createPersistedState()]
});
