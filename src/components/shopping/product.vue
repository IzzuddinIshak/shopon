<template>
  <v-app>
    <v-container>

      <!-- notifocation after adding product in the shopping cart -->
      <v-snackbar top right v-model="snackbar">
        {{product.name}} added to cart!
        <v-btn color="secondary" flat @click="snackbar = false"> OK </v-btn>
      </v-snackbar>

      <!-- loading bar -->
      <v-layout row wrap v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular indeterminate color="secondary" :width="7" :size="70"></v-progress-circular>
        </v-flex>
      </v-layout>

      <!-- display product detail -->
      <v-layout row wrap>
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card>

            <v-card-title>
              <h2 class="primary--text">{{ product.name }}</h2>
              <template v-if="userIsCreator">
                <v-spacer></v-spacer>
                <app-edit-product-dialog :product="product"></app-edit-product-dialog>
              </template>
            </v-card-title>

            <v-img max-height="300" :src="product.imageUrl" contain align-center></v-img>
            <v-card-text>
              <h2 class="primary--text"> RM {{ product.price }}</h2>
              <div v-html="product.description"></div>
            </v-card-text>

            <!-- share product details to social media -->
            <v-card-actions class="share">
              <facebook style="cursor:pointer" :url="url" scale="2"></facebook>
              <twitter style="cursor:pointer" :url="url" title="Check This Product on ShopOn" scale="2"></twitter>
              <whats-app style="cursor:pointer" :url="url" title="Check This Product on ShopOn" scale="2"></whats-app>
            </v-card-actions>

            <!-- add to cart button properties -->
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn
                  v-if="!userIsCreator"
                  color="secondary"
                  round large
                  class="snipcart-add-item"
                  v-bind:data-item-name="product.name"
                  v-bind:data-item-id="product.id"
                  v-bind:data-item-image="product.imageUrl"
                  data-item-url="https://shopon-e1503.firebaseapp.com/"
                  v-bind:data-item-price="product.price"
                  v-bind:data-item-description="product.description"
                  @click="snackbar=true">
                  <v-icon left>add_shopping_cart</v-icon>
                  Add To Cart
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
  </v-app>
</template>

<script>
  import {
  Facebook,
  Twitter,
  WhatsApp,
  } from "vue-socialmedia-share";

  export default {

    props: ['id'],
    computed: {
      product () {
        return this.$store.getters.loadedProduct(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id == this.product.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    },

    components: {
      Facebook,
      Twitter,
      WhatsApp,
    },

    mounted() {
      this.url = `${this.url}${this.product.id}`
      this.product.description = this.product.description.split('\n').join('<br>')
    },
    data() {
      return {
        snackbar: false,
        url: "https://shopon-e1503.firebaseapp.com/viewproduct/"
      };
    }
  }
</script>

<style>
  .share > span {
  padding: 1em;
  }
</style>
