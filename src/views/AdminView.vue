<template>
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col">
        <button type="button"
                v-if="showPurchases"
                @click="showPurchases = !showPurchases"
                class="btn btn-primary">
          Сховати історію замовлень
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up mb-1"
               viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
          </svg>
        </button>
        <button type="button"
                v-else
                @click="showPurchases = !showPurchases"
                class="btn btn-primary">
          Показати історію замовлень
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-down mb-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
          </svg>
        </button>

        <button type="button"
                @click="showForm = !showForm"
                class="btn btn-primary ms-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-plus-circle mb-1" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Додати подорож
        </button>
      </div>

    </div>
    <div class="row mt-2">
      <loading v-if="loading"></loading>
      <admin-add-trip
          v-if="showForm"
          :countries="countries"
          :errors="errors"
          v-model:name="newTrip.name"
          v-model:description="newTrip.description"
          v-model:duration="newTrip.duration"
          v-model:country="newTrip.country"
          v-model:date_end="newTrip.date_end"
          v-model:date_start="newTrip.date_start"
          v-model:img="newTrip.img"
          v-model:price="newTrip.price"
          v-model:free_places="newTrip.free_places"
          @saveTrip="saveNewTrip"
      >
      </admin-add-trip>
      <admin-purchases
          class="mt-2"
          v-if="showPurchases"
          :purchases="purchases">
      </admin-purchases>
    </div>
  </div>
</template>

<script>
import AdminAddTrip from "@/components/AdminAddTrip";
import UserBadge from "@/components/UserBadge";
import AdminPurchases from "@/components/AdminPurchases";
import HttpService from "@/service/HTTP/HttpService";
import RequestConfig from "@/service/HTTP/RequestConfig";
import Loading from "@/components/UI/Loading";

export default {
  components: {Loading, AdminPurchases, UserBadge, AdminAddTrip},
  data() {
    return {
      showLogout: false,
      showForm: false,
      showPurchases: true,
      loading: false,
      username: '',
      admin: this.adminMode,
      purchases: [],
      errors: new Map(),
      newTrip: {
        name: '',
        price: 0,
        description: '',
        img: '',
        date_start: '',
        date_end: '',
        free_places: 0,
        duration: 0,
        country: '',
      },
      countries: []
    }
  },
  inject: ['adminMode'],
  methods: {
    checkUser() {
      if (window.localStorage.getItem('username')) {
        this.setUser()
      } else {
        this.$router.push('/login')
        throw new Error('Увійдіть в акаунт')
      }
    },
    setUser() {
      this.username = window.localStorage.getItem('username')
    },
    async getPurchases() {
      this.loading = true
      const config = new RequestConfig()
      config.header = {'Authorization': 'Bearer ' + localStorage.getItem("token")}
      const response = await HttpService.get('admin/get-purchases', config)
      if (response === "refreshed") {
        return await this.getPurchases()
      }
      this.purchases = response.items
      this.loading = false
    },
    async getCountries() {
      this.countries = await HttpService.get('get-countries')
    },
    async saveNewTrip() {
      this.errors = new Map()
      const config = new RequestConfig()
      config.header = {'Authorization': 'Bearer ' + localStorage.getItem("token")}
      await HttpService.post('admin/save-trip', this.newTrip, config)
      this.$toast.success("Подорож збережено")
    }
  },
  mounted() {
    this.checkUser()
    this.getPurchases()
    this.getCountries()
  },
  computed: {
    isAdminMode() {
      if (!this.adminMode) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style>

</style>
