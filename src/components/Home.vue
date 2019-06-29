<template>
  <v-app>
  <v-container grid-list-md>

    <!-- loading animation before content completely loaded -->
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="secondary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>

    <!-- welcome message -->
    <v-snackbar top right v-model="snackbar">
      Welcome to ShopOn!
      <v-btn color="secondary" flat @click="snackbar = false"> OK </v-btn>
    </v-snackbar>

    <v-layout row wrap class="mt-2 mb-5" v-if="!loading">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>

        <!-- carousel properties for big screen -->
        <v-carousel style="cursor:pointer" class="hidden-sm-and-down">
          <v-carousel-item
            v-for="product in fproducts"
            :src="product.imageUrl"
            :key="product.id"
            @click="onLoadProduct(product.id)"
            contain>
          </v-carousel-item>
        </v-carousel>

        <!-- carousel properties for small screen -->
        <v-carousel style="cursor:pointer" class="hidden-md-and-up" height="300">
          <v-carousel-item
            v-for="product in fproducts"
            :src="product.imageUrl"
            :key="product.id"
            @click="onLoadProduct(product.id)"
            contain>
          </v-carousel-item>
        </v-carousel>

      </v-flex>
    </v-layout>

    <v-layout row wrap class="mb-4">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-alert color="teal" :value="true">
          <div> Selamat Berpuasa :) </div>
          <div> Check out our products at the lowest price ever ! </div>
        </v-alert>
      </v-flex>
    </v-layout>

    <!-- displaying all products in the inventory -->
    <v-layout row wrap v-for="product in products" :key="product.id" class="mb-4">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2 >
        <v-card>
          <v-container fluid>
            <v-layout row>

              <v-flex xs5 sm4 md3>
                <v-img contain :src="product.imageUrl" height="150px"></v-img>
              </v-flex>

              <v-flex xs7 sm8 md9 offset-md1>
                <v-card-title>
                    <div>
                      <h2 class="primary--text">{{ product.name }}</h2>
                      <div>RM {{ product.price }}</div>
                    </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn :to="'viewproduct/' + product.id" class="secondary" round>
                    <v-icon left>arrow_forward</v-icon>
                    View Product
                  </v-btn>
                </v-card-actions>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <v-scroll-to-top></v-scroll-to-top>

  </v-container>
</v-app>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: true,
      }
    },
    computed: {
      fproducts () {
        return this.$store.getters.featuredProducts
      },
      products () {
        return this.$store.getters.loadedProducts
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods:{
      onLoadProduct (id) {
        this.$router.push('/viewproduct/' + id)
      }
    }
  }
</script>

<style scoped>
  .title{
    position: center;
    top: 50px;
    color: white;
  }
</style>
