<template>
  <v-app>
     <v-app-bar>
         <router-link to="/">
            <v-btn icon>
                <v-icon class="home">home</v-icon>
            </v-btn>
         </router-link>

         <v-toolbar-title>Front archi</v-toolbar-title>

         <v-spacer></v-spacer>

         

         <router-link to="/basket">
             <v-btn icon>
                <v-icon class="basket">shopping_cart</v-icon>
             </v-btn>
         </router-link>
         
         <router-link to="/login">
           
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
        })
    },
    methods: {
        ...mapActions('account', ['logout']),
        logOut(){
            
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
