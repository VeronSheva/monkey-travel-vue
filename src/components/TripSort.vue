<template>
      <div class="dropdown">
        <button class="btn btn-outline-dark dropdown-toggle" type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
          Сортувати за:
        </button>
        <ul class="dropdown-menu">
          <li v-for="option in options">
            <label class="form-check-label" for="flexRadioDefault">
            <input class="form-check-input ms-2"
                   type="radio"
                   name="criteria"
                   :value="option.value"
                   @change="selectSortOption"
                   id="flexRadioDefault">
              {{ option.name }}
            </label>
          </li>
          <li>
            <hr class="dropdown-divider">
          </li>
          <li v-for="order in orders">
            <label class="form-check-label" for="flexRadioDefault3">
            <input class="form-check-input ms-2"
                   type="radio"
                   name="direction"
                   :value="order.value"
                   @change="selectSortOrder"
                   id="flexRadioDefault3">
              {{ order.name }}
            </label>
          </li>
          <div class="row mt-2 me-1">
            <div class="col-3"></div>
            <div align="right">
              <button
                  type="submit"
                  class="btn btn-primary btn-sm">Відсортувати</button>
            </div>
          </div>
        </ul>
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
      default: ''
    },
    selectedOption: {
      type: String,
      default: ''
    },
  },
  methods: {
    selectSortOption(event) {
      if(event.target.checked) {
        return this.$emit('update:selectedOption', event.target.value )
      }
    },
    selectSortOrder(event) {
      if(event.target.checked) {
        return this.$emit('update:selectedOrder', event.target.value )
      }
    }
  }
}
</script>

<style>

</style>
