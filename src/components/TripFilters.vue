<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseOne" aria-expanded="false"
                aria-controls="collapseOne">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               fill="currentColor"
               class="bi bi-filter me-1" viewBox="0 0 16 16">
            <path
                d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
          </svg>
          Фільтри
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
           data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <div class="row">
            <div class="col-lg-3">
              <div class="dropdown">
                <button class="btn btn-outline-dark dropdown-toggle" type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                  Країни
                </button>
                <ul class="dropdown-menu">
                  <li v-for="country in countriesFilter">
                    <label class="form-check-label" for="flexCheckDefault">
                    <input class="form-check-input ms-2" type="checkbox"
                           :value="country.en"
                           :key="country.key"
                           @change="updateCountries"
                           id="flexCheckDefault">
                      {{ country.ukr }}
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-5 col-md-6">
              <div class="input-group mb-3 mt-3 ms-lg-2 mt-lg-0">
                <span class="input-group-text">Від $</span>
                <input type="number"
                       class="form-control"
                       :value="min_price"
                       @input="updateMinPrice"
                       aria-label="Amount (to the nearest dollar)"
                       placeholder="1">
              </div>
              <div class="input-group mb-3 ms-lg-2">
                <span class="input-group-text">До $</span>
                <input type="number"
                       class="form-control"
                       :value="max_price"
                       @input="updateMaxPrice"
                       aria-label="Amount (to the nearest dollar)"
                       placeholder="10000">
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="input-group mb-3 mt-3 mt-lg-0">
                <span class="input-group-text" id="startDateSelected">З</span>
                <label for="startDate"></label>
                <input id="startDate"
                       class="form-control"
                       type="date"
                       :value="date_start"
                       @input="updateDateStart"/>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="endDateSelected">По</span>
                <label for="endDate"></label>
                <input id="endDate"
                       class="form-control"
                       type="date"
                       :value="date_end"
                       @input="updateDateEnd"/>
              </div>
              <div class="row">
                <div class="col-6"></div>
                <div align="right">
                  <button type="submit"
                          class="btn btn-primary btn-sm"
                  >Застосувати
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    countriesFilter: {
      type: Array,
      required: true
    },
    countries: {
      type: Array
    },
    min_price: {
      type: [Number, String]
    },
    max_price: {
      type: [Number, String]
    },
    date_start: {
      type: String
    },
    date_end: {
      type: String
    }
  },
  data() {
    return {
    }
  },
  methods: {
    updateCountries(event) {
      if (this.countries.includes(event.target.value)) {
        this.countries.splice(this.countries.indexOf(event.target.value), 1)
      } else {
        this.countries.push(event.target.value)
      }
      this.$emit('update:countries', this.countries)
    },
    updateMinPrice(event) {
      this.$emit('update:min_price', event.target.value)
    },
    updateMaxPrice(event) {
      this.$emit('update:max_price', event.target.value)
    },
    updateDateStart(event) {
      this.$emit('update:date_start', event.target.value)
    },
    updateDateEnd(event) {
      this.$emit('update:date_end', event.target.value)
    }
  }
}
</script>

<style>

</style>
