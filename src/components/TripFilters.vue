<template>
  <div class="accordion" id="accordionExample2">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
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
      <div id="collapseOne"
           class="accordion-collapse collapse"
           aria-labelledby="headingOne"
           data-bs-parent="#accordionExample2">
        <div class="accordion-body">
          <div class="row">
            <div class="col-lg-2">
              <div class="dropdown">
                <button
                    :class="'btn dropdown-toggle btn-outline-'
                + (errors ?
                (err('countries') ? 'danger' : 'dark')
                : 'dark')"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                </button>
                <ul class="dropdown-menu">
                  <li v-for="country in countriesFilter">
                    <label class="form-check-label" for="flexCheckDefault">
                      <input class="form-check-input ms-2" type="checkbox"
                             :value="country"
                             :key="country.key"
                             @change="updateCountries"
                             id="flexCheckDefault">
                      {{ country }}
                    </label>
                  </li>
                </ul>
                <error-message
                    v-if="errors"
                    :errors="errors"
                    property="countries"
                >
                </error-message>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="mt-3 ms-lg-2 mt-lg-0" :class="'input-group ' + (errors ? err('min_sum') : 'mb-3') ">
                <span class="input-group-text">Від $</span>
                <input type="number"
                       class="form-control"
                       :value="min_sum"
                       @input="updateMinSum"
                       aria-label="Amount (to the nearest dollar)"
                       placeholder="1">
              </div>
              <error-message
                  v-if="errors"
                  :errors="errors"
                  property="min_sum"
              >
              </error-message>
              <div class="ms-lg-2" :class="'input-group ' + (errors ? err('max_sum') : 'mb-3') ">
                <span class="input-group-text">До $</span>
                <input type="number"
                       class="form-control"
                       :value="max_sum"
                       @input="updateMaxSum"
                       aria-label="Amount (to the nearest dollar)"
                       placeholder="10000">
              </div>
              <error-message
                  v-if="errors"
                  :errors="errors"
                  property="max_sum"
              >
              </error-message>
            </div>
            <div class="col-lg-5">
              <div class="mt-3 mt-lg-0" :class="'input-group ' + (errors ? err('date_start') : 'mb-3') ">
                <span class="input-group-text" id="startDateSelected">З</span>
                <label for="startDate"></label>
                <input id="startDate"
                       class="form-control"
                       type="date"
                       :value="date_start"
                       @input="updateDateStart"/>
              </div>
              <error-message
                  v-if="errors"
                  :errors="errors"
                  property="date_start"
              >
              </error-message>
              <div :class="'input-group ' + (errors ? err('date_end') : 'mb-3') ">
                <span class="input-group-text" id="endDateSelected">По</span>
                <label for="endDate"></label>
                <input id="endDate"
                       class="form-control"
                       type="date"
                       :value="date_end"
                       @input="updateDateEnd"
                />
              </div>
              <error-message
                  v-if="errors"
                  :errors="errors"
                  property="date_end"
              >
              </error-message>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorMessage from "@/components/UI/ErrorMessage";

export default {
  components: {ErrorMessage},
  props: {
    countriesFilter: {
      type: Array,
      required: true
    },
    countries: {
      type: Array
    },
    min_sum: {
      type: [Number, String]
    },
    max_sum: {
      type: [Number, String]
    },
    date_start: {
      type: String,
    },
    date_end: {
      type: String
    },
    errors: {
      type: Map,
      default: new Map()
    }
  },
  data() {
    return {}
  },
  methods: {
    updateCountries(event) {
      if (this.countries.includes(event.target.value)) {
        this.countries.splice(this.countries.indexOf(event.target.value), 1)
      } else {
        this.countries.push(event.target.value)
      }
      return this.$emit('update:countries', this.countries)
    },
    updateMinSum(event) {
      const update = 'update:min_sum'
      if (!this.checkForEmptyString(event, update)) {
        return this.$emit(update, event.target.value)
      }
    },
    updateMaxSum(event) {
      const update = 'update:max_sum'
      if (!this.checkForEmptyString(event, update)) {
        return this.$emit(update, event.target.value)
      }
    },
    updateDateStart(event) {
      const update = 'update:date_start'
      if (!this.checkForEmptyString(event, update)) {
        return this.$emit(update, event.target.value)
      }
    },
    updateDateEnd(event) {
      const update = 'update:date_end'
      if (!this.checkForEmptyString(event, update)) {
        return this.$emit(update, event.target.value)
      }
    },
    checkForEmptyString(event, update) {
      if (event.target.value === '') {
        this.$emit(update, null)
        return true;
      }
      return false;
    },
    err(property) {
      if (this.errors.get(property)) {
        console.log(this.errors.get(property))
        return 'err';
      }
      return false
    }
  }
}
</script>

<style>
.err {
  background: #ffe6ee;
  border: 2px solid rgba(255, 2, 2, 0.82);
  border-radius: 7px;
}
</style>
