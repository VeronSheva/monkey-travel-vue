<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1"></div>
      <div class="col">
        <div class="row mt-4">
          <div class="col-sm-6">
            <trip-filters
                :countriesFilter="countriesFilter"
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
                  @click="getTrips"
          >Застосувати
          </button>
          </div>
        </div>
        <div class="row"
        >
          <pagination
              :pagination="pagination.pagination"
              v-model:currentPage="pagination.currentPage"
              :perPage="pagination.perPage"
              @loadMoreTrips="getTrips"
          >
          </pagination>
        </div>
        <div class="row"
             v-if="!loading">
          <trip-list :trips="trips">
          </trip-list>
        </div>
        <div v-else>
          <div class="preloader">
            <svg class="preloader__image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                    d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
              </path>
            </svg>
          </div>
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
import HttpService from "@/service/HTTP/HttpService"

export default {
  components: {TripList, TripSort, TripFilters, Pagination},
  props: {
    searchQuery: {
      type: String,
      required: true
    },
    searchTrigger: {
      type: Boolean
    }
  },
  data() {
    return {
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
      this.loading = true
      const response = await HttpService.post('get-trips/' + this.pagination.perPage + '/' + this.pagination.currentPage, this.filters)
        this.loading = false
        this.trips = response.items
        this.pagination.pagination = response.pagination
        this.pagination.perPage = response.per_page
        this.pagination.currentPage = response.current_page
        this.pagination.total = response.total
    },
    async getCountriesFilter() {
      this.countriesFilter = await HttpService.get('get-countries')
    }
  },
  watch: {
    searchTrigger(newSearchTrigger) {
      if (newSearchTrigger) {
        if (this.searchQuery.length > 0){
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

<style>
.preloader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /* фоновый цвет */
}

.preloader__image {
  position: relative;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  margin-top: -35px;
  margin-left: -35px;
  text-align: center;
  animation: preloader-rotate 2s infinite linear;
}

@keyframes preloader-rotate {
  100% {
    transform: rotate(360deg);
  }
}

.loaded_hiding .preloader {
  transition: 0.3s opacity;
  opacity: 0;
}

.loaded .preloader {
  display: none;
}
</style>
