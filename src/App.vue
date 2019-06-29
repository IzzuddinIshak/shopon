<template>
    <v-app>

      <!-- the confirmation message before logging out -->
      <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-text>Are you sure?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="dialog = false"> cancel </v-btn>
              <v-btn color="warning" flat @click="onLogout"> confirm </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      <!-- toolbar properties -->
      <v-toolbar dark class="primary">
        <v-toolbar-side-icon @click.stop="sideNav=!sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer">SHOPON</router-link></v-toolbar-title>

        <v-spacer></v-spacer>

          <v-btn icon class="snipcart-summary">
            <span class="snipcart-total-items">0</span>
            <v-icon href="#" class="snipcart-checkout">shopping_cart</v-icon>
          </v-btn>

        <v-toolbar-items class="hidden-xs-only">

          <v-btn icon v-if="userIsAuthenticated" to="/viewProduct">
            <v-icon>toc</v-icon>
          </v-btn>

          <v-btn icon v-if="userIsAuthenticated" to="/manageProduct">
            <v-icon>create</v-icon>
          </v-btn>

          <v-btn
            v-if="userIsAuthenticated"
            @click = "dialog=true"
            flat>
            <v-icon dark left>exit_to_app</v-icon>
            Logout
          </v-btn>

          <v-btn
            v-if="!userIsAuthenticated"
            to="/signup"
            flat>
            <v-icon dark left>account_circle</v-icon>
            Signup
          </v-btn>

          <v-btn
            v-if="!userIsAuthenticated"
            to="/signin"
            flat>
            <v-icon dark left>lock_open</v-icon>
            Signin
          </v-btn>

        </v-toolbar-items>

      </v-toolbar>

      <!-- nav-drawer properties -->
      <v-navigation-drawer v-model="sideNav" temporary absolute>
        <v-list>

          <v-list-tile
              v-if="userIsAuthenticated"
              to="/viewproduct"
              >
              <v-list-tile-action>
              <v-icon> toc </v-icon>
            </v-list-tile-action>
          <v-list-tile-content>View Product</v-list-tile-content>
          </v-list-tile>

          <v-list-tile
              v-if="userIsAuthenticated"
              to="/manageproduct"
              >
              <v-list-tile-action>
              <v-icon> create </v-icon>
            </v-list-tile-action>
          <v-list-tile-content>Manage Product</v-list-tile-content>
          </v-list-tile>

          <v-list-tile
              v-if="!userIsAuthenticated"
              to="/signin"
              >
              <v-list-tile-action>
              <v-icon> lock_open </v-icon>
            </v-list-tile-action>
          <v-list-tile-content>Signin</v-list-tile-content>
          </v-list-tile>

          <v-list-tile
              v-if="!userIsAuthenticated"
              to="/signup"
              >
              <v-list-tile-action>
              <v-icon> account_circle </v-icon>
            </v-list-tile-action>
          <v-list-tile-content>Signup</v-list-tile-content>
          </v-list-tile>

          <v-list-tile
              v-if="userIsAuthenticated"
              @click = "dialog = true"
              >
              <v-list-tile-action>
              <v-icon> exit_to_app </v-icon>
            </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-navigation-drawer>

      <!-- viewing page content from the router link -->
      <v-content>
        <router-view></router-view>
      </v-content>

  </v-app>
</template>

<script>

  export default {

    data () {
      return {
        sideNav: false,
        dialog: false,
        snackbar: false
      }
    },
    computed: {
        // to check whether user has signed-in or not
        userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },

    methods: {
      // for logout 
      onLogout () {
        this.dialog = false
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
.snipcart-total-items {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  right: -1px;
  background-color: #FBC02D;
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
