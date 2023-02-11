<template>
  <div class="accordion" id="accordionExample1">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseOne">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-sort-down me-1" viewBox="0 0 16 16">
            <path
                d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
          </svg>
          Сортувати за
        </button>
      </h2>
      <div id="collapseTwo"
           class="accordion-collapse collapse"
           aria-labelledby="headingTwo"
           data-bs-parent="#accordionExample1">
        <div class="accordion-body">
          <div class="row">
            <div class="row border border-2 border-dark-subtle rounded ms-1 mb-1">
              <div class="col-6 col-md-12 col-lg-6 col-sm-12" v-for="option in options">
                <label class="form-check-label" for="flexRadioDefault">
                  <input class="form-check-input ms-2"
                         type="radio"
                         name="criteria"
                         :value="option.value"
                         @change="selectSortOption"
                         id="flexRadioDefault">
                  {{ option.name }}
                </label>
              </div>
            </div>
            <div class="row border border-2 border-dark-subtle rounded ms-1">
              <div class="col-12 col-md-12 col-lg-6 col-sm-12" v-for="order in orders">
                <label class="form-check-label" for="flexRadioDefault3">
                  <input class="form-check-input ms-2"
                         type="radio"
                         name="direction"
                         :value="order.value"
                         @change="selectSortOrder"
                         id="flexRadioDefault3">
                  {{ order.name }}
                </label>
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
    options: {
      type: Array,
      required: true
    },
    orders: {
      type: Array,
      required: true
    },
    selectedOrder: {
      type: String,
      default: null
    },
    selectedOption: {
      type: String,
      default: null
    },
  },
  methods: {
    selectSortOption(event) {
      if (event.target.checked) {
        return this.$emit('update:selectedOption', event.target.value)
      }
    },
    selectSortOrder(event) {
      if (event.target.checked) {
        return this.$emit('update:selectedOrder', event.target.value)
      }
    }
  }
}
</script>

<style>

</style>
