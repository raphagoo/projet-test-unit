<template>
    <v-form ref="form" v-model="valid">
        <v-container class="flex align-center justify-center">
            <h1 class="text-center">Register</h1>
            <v-card class="pa-3 mx-auto" max-width="700px">
                <v-card-title>Create a new account</v-card-title>
                <div class="ma-3">
                    <v-text-field
                        outlined
                        v-model="user.email"
                        :rules="emailRules"
                        label="Email"
                        required
                    ></v-text-field>
                </div>
                <div class="ma-3">
                    <v-text-field
                        outlined
                        v-model="user.password"
                        :rules="passwordRules"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>
                </div>
                <v-card-actions>
                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="validate"
                    >
                        Register
                    </v-btn>
                    <router-link to="/login">
                        <v-btn>To Login</v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-form>
</template>

<script>
import {mapActions} from "vuex";
import {router} from "../router";

export default {
    name: 'Register',
    components: {
    },
    data: () => ({
        valid: false,
        user: {
            email: '',
            password: ''
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
            v => !!v || 'Password is required',
        ],
    }),
    methods: {
        ...mapActions("account", ["register"]),
        validate () {
            if(this.$refs.form.validate()){
                this.register(this.user).then(
                    router.push('/')
                )
            }
        },
    },
}
</script>

