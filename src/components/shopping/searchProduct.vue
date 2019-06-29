<template>
  <v-app>
  <v-container>

    <v-layout row wrap align-center>

      <!-- <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-text-field
            label="What you're looking for ..."
            solo dark
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
            @input="searchForItems($event)"
          ></v-text-field>
        </v-flex> -->

        <!-- <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <ais-instant-search :search-client="searchClient" index-name="products" :query="searchQuery">
            <ais-search-box></ais-search-box>

                      <v-list three-line subheader>
                      <ais-hits class="row">
                          <template slot="item" slot-scope="{ item }">

                            <div class="col-12 col-md-4 mb-4">
                              <div class="card">
                                <div class="card-body">
                                  <h4 class="card-title"><ais-highlight :hit="item" attribute="name"></ais-highlight></h4>
                                  <p class="card-text"><ais-highlight :hit="item" attribute="price"></ais-highlight></p>
                                  <a href="#" class="btn btn-primary">View</a>
                                </div>
                              </div>
                            </div>

                              <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                    <ais-highlight :hit="item" attribute="name"></ais-highlight>
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                    <ais-highlight :hit="item" attribute="price"></ais-highlight>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                              </v-list-tile>
                          </template>
                      </ais-hits>
                      </v-list>

                  </ais-instant-search>
        </v-flex> -->

        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>

          <ais-instant-search :search-client="searchClient" index-name="products" :routing="routing">
            <ais-search-box placeholder=" What you're looking for? "/>
            <ais-hits class="row">

                <template slot="item" slot-scope="{ item }">
                  <div class="col-12 col-md-4 mb-4">
                    <div>
                      <div class="card-body">
                        <h4 class="card-title"><ais-highlight :hit="item" attribute="name"></ais-highlight></h4>
                        <p class="card-text"><ais-highlight :hit="item" attribute="price"></ais-highlight></p>
                        <v-btn color="primary" href="/">view</v-btn>
                      </div>
                    </div>

                    </div>
                  </div>
                </template>

              </ais-hits>
            </ais-instant-search>

          </v-flex>

      </v-layout>

    </v-container>
  </v-app>
</template>

<script>
    import algoliasearch from 'algoliasearch/lite';
    import { history as historyRouter } from 'instantsearch.js/es/lib/routers';
    import { simple as simpleMapping } from 'instantsearch.js/es/lib/stateMappings';

    export default {

      props:[],
      data() {
        return {
          // searchQuery:"",
          searchClient: algoliasearch(
          'N809D4GYRR',
          'd8be8191ce2acbfb12ead0d91bc62318'),

          routing: {
            router: historyRouter(),
            stateMapping: simpleMapping(),
          }
        };
      }
    };
</script>
