<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1"></div>
      <div class="col">
        <div class="row mt-4">
          <div class="col-sm-6">
            <trip-filters
                :countriesFilter="countriesFilter"
                v-model:errors="errors"
                v-model:countries="filters.countries"
                v-model:min_sum="filters.min_sum"
                v-model:max_sum="filters.max_sum"
                v-model:date_start="filters.date_start"
                v-model:date_end="filters.date_end"
                @filterTrips="getTrips"
            ></trip-filters>
          </div>
          <div class="col-sm-6 col-md-5 mt-3 mt-sm-0">
            <trip-sort
                v-model:selectedOption="filters.sort_by"
                v-model:selectedOrder="filters.sort_order"
                :options="sortOptions"
                :orders="sortOrders"
            >
            </trip-sort>
          </div>
          <div class="col-md-1 mt-3 mt-md-0">
            <button type="submit"
                    class="btn btn-primary btn-sm"
                    @click.prevent="getTrips"
            >Застосувати
            </button>
          </div>
        </div>
        <div class="row">
          <pagination
              :pagination="pagination.pagination"
              v-model:currentPage="pagination.currentPage"
              :perPage="pagination.perPage"
              @loadMoreTrips="getTrips">
          </pagination>
          <div class="row">
            <div class="col">
              <button type="button"
                      @click="addNewTrip"
                      class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle mb-1" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Додати подорож
              </button>
            </div>
          </div>
        </div>
        <div class="row"
             v-if="!loading">
          <trip-list :trips="trips">
          </trip-list>
        </div>
        <div v-else>
          <loading></loading>
        </div>
      </div>
      <div class="col-0 col-sm-1"></div>
    </div>
  </div>
</template>

<script>
import TripFilters from "@/components/TripFilters";
import TripSort from "@/components/TripSort";
import TripList from "@/components/TripList";
import Pagination from "@/components/UI/Pagination";
import Loading from "@/components/UI/Loading";
import HttpService from "@/service/HTTP/HttpService"

export default {
  components: {TripList, TripSort, TripFilters, Pagination, Loading},
  props: {
    searchQuery: {
      type: String,
      required: true
    },
    searchTrigger: {
      type: Boolean
    },
  },
  inject: ['adminMode'],
  data() {
    return {
      admin: this.adminMode,
      errors: new Map(),
      loading: false,
      trips: [],
      countriesFilter: [],
      filters: {
        countries: [],
        min_sum: null,
        max_sum: null,
        date_start: null,
        date_end: null,
        sort_order: null,
        sort_by: null,
        search_query: null
      },
      sortOptions: [
        {value: 'price', name: 'Ціна'},
        {value: 'date_start', name: 'Дата'}
      ],
      sortOrders: [
        {value: 'DESC', name: 'Спадання'},
        {value: 'ASC', name: 'Зростання'}
      ],
      pagination: {
        pagination: [1],
        perPage: 5,
        currentPage: 1,
        total: null
      }
    }
  },
  methods: {
    async getTrips() {
      this.errors = new Map()
      this.loading = true
      const response = await HttpService.post('get-trips/' + this.pagination.perPage + '/' + this.pagination.currentPage, this.filters)
      this.loading = false
      if (response.items) {
        this.trips = response.items
        this.pagination.pagination = response.pagination
        this.pagination.perPage = response.per_page
        this.pagination.currentPage = response.current_page
        this.pagination.total = response.total
      } else {
        this.errors = response
      }
    },
    async getCountriesFilter() {
      this.countriesFilter = await HttpService.get('get-countries')
    },
    addNewTrip() {
      this.$router.push('/admin')
      window.localStorage.setItem('showForm', 'true')
    }
  },
  watch: {
    searchTrigger(newSearchTrigger) {
      if (newSearchTrigger) {
        if (this.searchQuery.length > 0) {
          this.filters.search_query = this.searchQuery
          this.getTrips()
          this.filters.search_query = null
        } else {
          this.getTrips()
        }
      }
      this.$emit('update:searchTrigger', false)
    },
  },
  mounted() {
    this.getTrips()
    this.getCountriesFilter()
  }
}
</script>


