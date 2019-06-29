<template>
  <v-app>

      <v-container>

        <!-- notifocation after adding product in the shopping cart -->
        <v-snackbar top right v-model="snackbar">
          {{productToBeDeleted ? productToBeDeleted.name: null}} deleted!
          <v-btn color="secondary" flat @click="snackbar = false"> OK </v-btn>
        </v-snackbar>

        <!-- confirmation message before deleting product -->
        <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-text>Are you sure?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false"> cancel </v-btn>
                <v-btn color="warning" flat @click="deleteProduct()"> confirm </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        <v-layout row wrap class="mb-4">
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
            <v-btn class="secondary" large router to="/addproduct" round>
              <v-icon left>add</v-icon>
              Add Product</v-btn>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="mb-4">
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
            <v-alert color="primary" :value="true">
              <div> To edit product parameters, preview and click edit button at corner! </div>
            </v-alert>
          </v-flex>
        </v-layout>

        <!-- display products added by the seller (big screen) -->
        <v-layout row wrap v-for="product in products" :key="product.id" class="hidden-sm-and-down">

          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
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
                        </div>
                    </v-card-title>

                    <!-- button for previewing product page and delete product -->
                    <v-card-actions>
                      <v-btn :to="'viewproduct/' + product.id" class="secondary" round>
                        <v-icon left>arrow_forward</v-icon>
                        Preview
                      </v-btn>

                      <v-btn @click="openDialog(product)" class="warning" round>
                        <v-icon left>delete</v-icon>
                        Delete
                      </v-btn>
                    </v-card-actions>

                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>

        <!-- display products added by the seller (small screen) -->
        <v-layout row wrap v-for="product in products" :key="product.id" class="hidden-md-and-up">

          <!-- confirmation message before deleting product -->
          <v-dialog v-model="dialog2" width="500">
              <v-card>
                <v-card-text>Are you sure?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="dialog2 = false"> cancel </v-btn>
                  <v-btn color="warning" flat @click="deleteProduct(product)"> confirm </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
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
                        </div>
                    </v-card-title>

                    <!-- button for previewing product page and delete product -->
                    <v-card-actions>
                      <v-btn icon :to="'viewproduct/' + product.id" class="secondary">
                        <v-icon small>create</v-icon>
                      </v-btn>
                      <v-btn icon class="warning" @click="openDialog(product)">
                        <v-icon small>delete</v-icon>
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
        dialog: false,
        snackbar: false,
        productToBeDeleted: null
      }
    },
    computed: {
      products () {
        return this.$store.getters.filteredProducts
      }
    },
    methods: {
      deleteProduct() {
        this.dialog = false
        this.snackbar = true
        this.$store.dispatch('deleteProductData', this.productToBeDeleted)
      },
      openDialog(product) {
        this.productToBeDeleted = product
        this.dialog = true
      }
    }
  }
</script>
