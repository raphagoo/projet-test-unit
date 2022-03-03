<template>
    <v-container fluid class="fill-height grey lighten-5">
        <h1>Panier</h1>
        <v-row dense no-gutters>
            <v-col class="pa-1" cols="3" v-for="product in basket.products" :key="product.id">
                <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="text-overline mb-4">
                                {{product.metadata.type}}
                            </div>
                            <v-list-item-title class="text-h5 mb-1">
                                {{product.quantity}}x {{product.name}}
                            </v-list-item-title>
                            <v-list-item-subtitle>{{product.quantity * product.price.data[0].unit_amount * 1.0 / 100}} €</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar tile size="80"><v-img :src="product.images[0]"></v-img></v-list-item-avatar>
                    </v-list-item>
                    <v-card-actions>
                        <v-btn v-if="product.quantity > 1" outlined rounded @click="removeOneProduct(product)" color="error">Retirer 1</v-btn>
                        <v-btn outlined rounded @click="removeProduct(product)" color="error">Supprimer</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <div v-if="basket.products.length > 0">
            <span>Total : {{basket.totalPrice}} €</span>
            <stripe-checkout
                ref="checkoutRef"
                mode="payment"
                :pk="publishableKey"
                :line-items="lineItems"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="v => loading = v"
            />
            <v-btn class="ma-3 cyan" @click="submit">Pay now!</v-btn>
            <h2>Ajouter d'autres produits..</h2>
            <v-row dense>
                <v-col cols="4" v-for="product in matchingProducts" :key="product.id">
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
        </div>
        <div v-else>
            Votre panier est vide
        </div>
    </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {StripeCheckout} from '@vue-stripe/vue-stripe';
import $config from 'config'
import Swal from "sweetalert2";

export default {
    name: "Basket",
    components: {StripeCheckout},
    computed: {
        ...mapState({
            basket: state => state.basket,
            products: state => state.product.list
        }),
        matchingProducts(){
            let typeArray = []
            let matchingProducts = []
            this.$store.state.basket.products.forEach(product => {
                typeArray.push(product.metadata.type)
            })
            this.$store.state.product.list.forEach(product => {
                if(typeArray.includes(product.metadata.type)) {
                    matchingProducts.push(product)
                    this.$store.state.basket.products.forEach(item => {
                        if(item.id === product.id){
                            matchingProducts = matchingProducts.filter(toFilter => toFilter.id !== item.id)
                        }
                    })
                }
            })
            // Shuffle array
            const shuffled = matchingProducts.sort(() => 0.5 - Math.random());

            // Get sub-array of first n elements after shuffled
            return shuffled.slice(0, 4)
        }
    },
    created() {
        let url_string = window.location.href
        let url = new URL(url_string);
        let succeeded = url.searchParams.get("success");
        if(succeeded !== null) {
            if (succeeded === '1') {
                this.$store.state.basket.products = []
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Payment is successful'
                })
            } else if (succeeded === '0') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Payment has been canceled'
                })
            }
        }
        this.$store.state.basket.products.forEach(product => {
            let formattedProduct = {}
            formattedProduct.price = product.price.data[0].id
            formattedProduct.quantity = product.quantity
            this.lineItems.push(formattedProduct)
        })
    },
    data () {
        return {
            publishableKey: $config.stripe.publishableKey,
            loading: false,
            lineItems: [],
            successURL: 'http://localhost:8080/basket?success=1',
            cancelURL: 'http://localhost:8080/basket?success=0',
        };
    },
    methods: {
        ...mapActions('basket', {
            removeOne: 'removeOne',
            addToBasket: 'addToBasket',
            remove: 'remove'
        }),
        submit () {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
        removeOneProduct(product){
            this.removeOne(product)
        },
        removeProduct(product){
            this.remove(product)
        },
        addBasket(product){
            this.addToBasket(product)
        }
    },
}
</script>

<style scoped>
.fill-height{
    align-content: start;
    justify-content: start;
}
</style>
