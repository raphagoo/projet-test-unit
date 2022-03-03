<template>
    <v-container>
        <h1 class="text-center">User</h1>
        <v-card class="ma-3" :key="order.id" v-for="order in user.orders">
            <v-card-title>{{order.description}}</v-card-title>
            <v-card-subtitle>{{order.amount * 1.0 / 100}} € - Payé via {{order.charges.data[0].payment_method_details.card.brand}} -{{order.charges.data[0].payment_method_details.card.last4}}</v-card-subtitle>
            <v-card-text>Adresse d'expédition : <br/> {{order.charges.data[0].billing_details.address.line1}} {{order.charges.data[0].billing_details.address.line2}} <br/> {{order.charges.data[0].billing_details.address.city}}</v-card-text>
            <v-card-actions>
                <v-btn>Refund</v-btn>
                <v-btn v-if="!order.ticket" @click="showModal(order)">Contact support</v-btn>
                <v-btn v-else disabled>Reviewing ticket</v-btn>
            </v-card-actions>
        </v-card>
        <span v-if="user.orders.length < 1">Pas de commandes réalisées</span>
        <v-dialog v-model="overlay">
            <v-form ref="form" v-model="valid">
                <v-card class="pa-3">
                    <h2 class="pa-3">{{ticket.title}}</h2>
                    <div class="ma-3">
                        <v-text-field
                            v-model="ticket.subtitle"
                            label="Title"
                            required
                        ></v-text-field>
                    </div>
                    <div class="ma-3">
                        <v-textarea
                            v-model="ticket.description"
                            label="Description"
                            required
                        ></v-textarea>
                    </div>
                    <v-card-actions>
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4"
                            @click="validate"
                        >
                            Send
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "User",
    data(){
        return{
            valid: false,
            overlay: false,
            ticket: {
                subtitle: '',
                title: '',
                description: '',
                order_id: '',
                emitter: this.$store.state.account.user._id
            }
        }
    },
    computed: {
        ...mapState({
            user: state => state.account.user
        })
    },
    methods: {
        ...mapActions('account', {
            listOrders: 'listOrders',
        }),
        ...mapActions('ticket', {
            createTicket: 'createTicket',
        }),
        showModal(order){
            console.log(this.ticket)
            this.ticket.title = 'Customer : Problem with order ' + order.id
            this.ticket.order_id = order.id
            this.overlay = true
        },
        validate(){
            if(this.$refs.form.validate()){
                this.createTicket(this.ticket)
            }
        }
    },
    created() {
        this.listOrders(this.$store.state.account.user.stripe_id)
    }
}
</script>

<style scoped>

</style>
