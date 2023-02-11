<template>
  <navbar v-model:searchQuery="searchQuery" @search="search"></navbar>
  <div class="app">
    <router-view
        :searchQuery="searchQuery"
        v-model:searchTrigger="searchTrigger"
    ></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/UI/Navbar"

export default {
  components: {
    Navbar
  },
  data() {
    return {
      searchQuery: '',
      searchTrigger: false
    }
  },
  methods: {
    search() {
      this.searchTrigger = true
    }
  }
}

</script>

<style>
</style>
