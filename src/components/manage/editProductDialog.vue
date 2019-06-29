<!-- pop up page for editing product details -->
<template>
  <v-dialog persistent max-width="500px" transition="dialog-transition" v-model="editDialog">
    <v-btn class="secondary" fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container>

        <!-- page title -->
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>
              <h2 class="primary--text">
                EDIT PRODUCT
              </h2>
            </v-card-title>
          </v-flex>
        </v-layout>

        <!-- edit product form -->
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>

              <!-- product name textfield -->
              <v-text-field
              name="name"
              label="Product Name"
              id="name"
              v-model="editedName"
              required></v-text-field>

              <!-- product price textfield -->
              <v-text-field
              name="price"
              label="Product Price"
              id="price"
              v-model="editedPrice"
              required></v-text-field>

              <!-- product description textfield -->
              <v-textarea
              name="description"
              label="Product Description"
              id="description"
              v-model="editedDescription"
              required></v-textarea>

            </v-card-text>
          </v-flex>
        </v-layout>

        <!-- button for saving and closing edit form -->
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat round color="warning" @click="editDialog=false"> CLOSE </v-btn>
              <v-btn flat round color="secondary" @click="onSaveChanges"> SAVE </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['product'],
    data () {
      return {
        editDialog : false,
        editedName : this.product.name,
        editedPrice : this.product.price,
        editedDescription : this.product.description
      }
    },

    methods: {

      // saving new changes
      onSaveChanges () {
        if (this.editedName.trim() === '' || this.editedPrice.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateProductData', {
          id: this.product.id,
          name: this.editedName,
          price: this.editedPrice,
          description: this.editedDescription
        })
      }
    }
  }
</script>
