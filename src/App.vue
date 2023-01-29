<template>
  <navbar v-model:searchQuery="searchQuery"></navbar>
  <div class="app">
    <router-view></router-view>
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
    }
  }
}

</script>

<style>
</style>
