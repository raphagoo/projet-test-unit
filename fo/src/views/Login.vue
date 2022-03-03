<template>
    <v-form ref="form" v-model="valid">
        <v-container class="flex align-center justify-center">
            <h1 class="text-center">FO Archi</h1>
            <v-card class="pa-3 mx-auto" max-width="700px">
                <v-card-title>Login</v-card-title>
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
                        Login
                    </v-btn>
                    <router-link to="/register">
                        <v-btn>To Register</v-btn>
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
    name: 'Login',
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
        ...mapActions("account", ["login"]),
        validate () {
            if(this.$refs.form.validate()){
                this.login(this.user).then(
                    router.push('/')
                )
            }
        },
    },
}
</script>
