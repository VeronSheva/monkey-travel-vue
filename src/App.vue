<template>
  <navbar v-model:searchQuery="searchQuery" @search="search"></navbar>
  <div class="app">
    <user-badge v-if="admin && username"
                v-model:show-logout="showLogout"
                :username="username"
                @logoutUser="logoutUser"
    ></user-badge>
    <router-view
        :searchQuery="searchQuery"
        v-model:searchTrigger="searchTrigger"
    ></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/UI/Navbar"
import UserBadge from "@/components/UserBadge";
import {computed, readonly, ref} from "vue";

export default {
  components: {
    UserBadge,
    Navbar
  },
  data() {
    return {
      searchQuery: '',
      searchTrigger: false,
      username: this.checkUser(),
      showLogout: false,
      admin: ref(window.localStorage.getItem('adminMode'))
    }
  },
  provide() {
    return {
      adminMode: computed(() => this.admin)
    }
  },
  methods: {
    search() {
      this.searchTrigger = true
    },
    checkUser() {
      if (window.localStorage.getItem('username')) {
        return this.setUser()
      }
    },
    setUser() {
      return window.localStorage.getItem('username')
    },
    logoutUser() {
      console.log('works')
    }
  },
  computed: {
    isAdminMode() {
      if (!this.admin || !this.username) {
        this.logoutUser()
      }
    }
  },
}

</script>

<style>
</style>
