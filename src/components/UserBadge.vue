<template>
  <div class="row mt-3 ms-1">
    <div class="col-1">
      <button type="button" @click="updateShowLogout" class="btn btn-secondary mb-2 user">
          <span class="badge bg-secondary">
            {{ username }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-person-fill mb-1"
                 viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            </svg>
          </span>
      </button>
      <button type="button"
              v-if="showLogout"
              @click="$emit('logoutUser')"
              class="btn btn-sm btn-primary logout">
          <span class="badge bg-primary">
            Вийти
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fill-rule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
          </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showLogout: {
      type: Boolean,
      default: false
    },
    username: {
      type: String
    }

  },
  methods: {
    updateShowLogout() {
      this.$emit('update:showLogout', !this.showLogout)
    }
  }
}
</script>

<style>
.logout {
  margin-left: auto;
  order: 2;
}

.user {
  margin-left: auto;
}
</style>
