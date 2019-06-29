
<!-- adding new product -->

<template>
  <v-app>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card>
          <form @submit.prevent="onAddProduct">

          <v-card-title primary-title>
            <div>
              <h2 class="primary--text">ADD NEW PRODUCT</h2>
            </div>
            <v-spacer></v-spacer>
          </v-card-title>

          <!-- product name textfield -->
          <v-card-actions>
            <v-text-field
            name="name"
            label="Product Name"
            id="name"
            v-model="name"
            required></v-text-field>
          </v-card-actions>

          <!-- product price textfield -->
          <v-card-actions>
            <v-text-field
            name="price"
            label="Product Price (excluding 'RM')"
            id="price"
            v-model="price"
            required></v-text-field>
          </v-card-actions>

          <!-- product description textfield -->
          <v-card-actions>
            <v-textarea
            name="description"
            label="Product Description"
            id="description"
            v-model="description"
            required></v-textarea>
          </v-card-actions>

          <!-- product category dropdown -->
          <v-card-actions>
            <v-select chips :items="category" @change="changeSelected" label="Product Category">{{ category }}</v-select>
          </v-card-actions>

          <!-- product image file picker -->
          <v-card-actions>
            <v-btn round raised @click="onPickFile">
              <v-icon left>cloud_upload</v-icon>
              Upload Image </v-btn>
            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
          </v-card-actions>

          <v-card-actions>
            <img :src="imageUrl" height="150">
          </v-card-actions>

          <!-- submit button for adding new product data -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn round large class="secondary" :disabled="!formIsValid" type="submit">
              <v-icon left>library_add</v-icon>
              Add</v-btn>
          </v-card-actions>

        </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</v-app>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        price: '',
        description: '',
        category: ['Bags', 'Shoes', 'Accessories'],
        selectedCategory: '',
        imageUrl: '',
        image: null
      }
    },
    computed: {
      // check whether all forms have been filled in
      formIsValid () {
        return this.name !== '' && this.price !== '' && this.description !== '' && this.selectedCategory !== '' && this.item !== '' && this.imageUrl !== ''
      }
    },
    methods: {
      // check the selected category from the dropdown
      changeSelected(category) {
        this.selectedCategory = category
      },
      // adding new product
      onAddProduct () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        const productData = {
          name:this.name,
          price:this.price,
          description:this.description,
          category:this.selectedCategory,
          image:this.image
        }
        this.$store.dispatch('addNewProduct', productData)
        this.$router.push('/viewproduct')
      },

      // picking image file from local storage
      onPickFile () {
        this.$refs.fileInput.click()
      },

      // locate the added image file
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert ('Add valid files only!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener ('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL (files[0])
        this.image = files[0]
      }
    }
  }
</script>
