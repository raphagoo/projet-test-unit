<template>
    <v-container fluid class="fill-height grey lighten-5">
        <h1>Accueil</h1>
        <v-row dense>
            <v-col cols="4" v-for="product in products" :key="product.id">
                <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="text-overline mb-4">
                                {{product.metadata.type}}
                            </div>
                            <v-list-item-title class="text-h5 mb-1">
                                {{product.name}}
                            </v-list-item-title>
                            <v-list-item-subtitle>{{product.price.data[0].unit_amount * 1.0 / 100}} €</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar tile size="80"><v-img :src="product.images[0]"></v-img></v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                        <v-btn @click="addBasket(product)" outlined rounded text><v-icon>add</v-icon>Add to basket</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar v-model="snackbar" color="success" :timeout="3000">
            Article ajouté au panier
        </v-snackbar>
    </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'home',
    components: {
    },
    computed: {
        ...mapState({
            account: state => state.account,
            products: state => state.product.list
        })
    },
    data(){
        return{
            snackbar: false
        }
    },
    methods: {
        ...mapActions('product', {
            listProducts: 'listProducts'
        }),
        ...mapActions('basket', {
            addToBasket: 'addToBasket'
        }),
        addBasket(product){
            this.snackbar = true
            this.addToBasket(product)
        }
    },
    created() {
        this.listProducts()
    }
}
</script>
<style>
.fill-height{
    align-content: start;
    justify-content: start;
}
</style>
