<template>
  <div class="row mt-3">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
            v-for="page in pagination"
            :class="'page-item page-link ' + active(page)"
            :key="page.key"
            :id="page"
            @click="updateCurrentPage(page)"
        >
          {{ page }}
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    perPage: {
      type: Number
    },
    currentPage: {
      type: Number
    },
    total: {
      type: Number
    },
    pagination: {
      type: Array,
    }
  },
  methods: {
    updateCurrentPage(page) {
      this.$emit('update:currentPage', page)
      this.$emit('loadMoreTrips')
    },
    active(page) {
      let active = ''
      if (page === this.currentPage) {
        active = 'active'
      return active
      }
  },

  }

}
</script>

<style>

</style>
