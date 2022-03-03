<template>
  <v-app>
     <v-app-bar>
         <router-link to="/">
            <v-btn icon>
                <v-icon>home</v-icon>
            </v-btn>
         </router-link>

         <v-toolbar-title>Front archi</v-toolbar-title>

         <v-spacer></v-spacer>

         <router-link v-if="account" to="/user">
             <v-btn icon>
                 <v-icon>person</v-icon>
             </v-btn>
         </router-link>

         <router-link to="/basket">
             <v-btn icon>
                <v-icon>shopping_cart</v-icon>
             </v-btn>
         </router-link>
         <v-btn v-if="account" @click="logOut" icon>
             <v-icon>logout</v-icon>
         </v-btn>
         <router-link to="/login">
            <v-btn v-if="!account" icon>
                <v-icon>login</v-icon>
            </v-btn>
         </router-link>
     </v-app-bar>
    <router-view/>
  </v-app>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
    computed: {
        ...mapState({
            account: state => state.account.user
        })
    },
    methods: {
        ...mapActions('account', ['logout']),
        logOut(){
            this.logout()
        }
    }
}
</script>
<style lang="scss">
// @import '~normalize.css';
// @import '~reset-css/_reset.scss';
* {
    box-sizing: border-box;
}
header{
    flex: none !important;
}
a{
    text-decoration: none;
}
</style>
