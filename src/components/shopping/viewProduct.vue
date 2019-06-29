<template>
  <v-app>
    <v-container>

      <!-- displaying products on sale in inventory -->
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
    computed: {
      products () {
        return this.$store.getters.loadedProducts
      }
    }
  }
</script>
