<template>
  <v-app>
  <v-container>

    <!-- error message when signin -->
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>

    <!-- signin form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12">
          <v-card-text>
            <v-container>
              <form @submit.prevent = "onSignin">

                <v-layout row wrap>
                  <v-flex xs12>
                      <h2 class="primary--text">
                        SIGN IN
                      </h2>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="E-mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>

                    <v-btn round class="secondary" type="submit" :disabled="!formIsValid" :loading="loading">
                      <v-icon left> done_all </v-icon> Sign In
                      <span slot="loader" class="custom-loader">
                        <v-icon light> cached </v-icon>
                      </span>
                    </v-btn>

                    <v-btn round class="primary" router to="/signup">
                      <v-icon left> face </v-icon>
                      NEW USER</v-btn>

                  </v-flex>
                </v-layout>

              </form>
            </v-container>
          </v-card-text>
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
        email: '',
        password: ''
      }
    },
    computed: {
      formIsValid () {
        return this.email !== '' && this.password !== ''
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
          if (value !== null && value !== undefined) {
            this.$router.push ('/')
          }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserin', {email: this.email, password: this.password})
      },
      onDismissed () {
        console.log('Dismissed Alert')
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
