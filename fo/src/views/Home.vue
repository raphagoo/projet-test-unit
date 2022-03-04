<template>
  <v-container fluid class="fill-height grey lighten-5">
    <h1>Accueil</h1>
    <v-row dense v-if="pagesL">
      <v-col class="testtt" cols="4" v-for="product in products" :key="product.id">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                {{ product.name }}
              </div>
              <v-list-item-title class="text-h5 mb-1">
                {{ product.species }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ product.genre }} </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80"
              ><v-img :src="product.image"></v-img
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn  @click="addBasket(product)" outlined rounded text
              ><v-icon>add</v-icon> <span class="add"> to basket </span></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

      <v-pagination class="next" @input="next" v-model="page" :length="pagesL.pages" :total-visible="7" circle> </v-pagination>
   

    <v-snackbar v-model="snackbar" color="success" :timeout="3000">
      Article ajouté au panier
    </v-snackbar>
  </v-container>
</template>



<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "home",
  components: {},
  computed: {
    ...mapState({
      products: (state) => state.product.list,
      pagesL: (state) => state.product.page,
    }),
    
  },

  
  data() {
    
    return {
      snackbar: false,
      page: 1,
    };

    
  },



  methods: {
    ...mapActions("product", {
      listProducts: "listProducts",
      nextProducts: "nextProducts",
    }),
    ...mapActions("basket", {
      addToBasket: "addToBasket",
    }),

    addBasket(product) {
      this.snackbar = true;
      this.addToBasket(product);
    },

    next(num){
      this.nextProducts(num);
    }
   
  },
  created() {
    this.listProducts();
    
  },
  
  
};
</script>



<style>
.fill-height {
  align-content: start;
  justify-content: start;
}
</style>
