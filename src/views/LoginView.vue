<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center mt-3">
      <div class="col-sm-6">
        <form class="card p-3 bg-light">
          <h5 class="card-title mb-3">Вхід в акаунт</h5>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Email</span>
            <input type="email"
                   v-model="credentials.username"
                   class="form-control"
                   placeholder="name@gmail.com"
                   aria-label="Email"
                   aria-describedby="basic-addon1">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon2">Пароль</span>
            <input type="password"
                   v-model="credentials.password"
                   v-show="!showPassword"
                   class="form-control"
                   placeholder="12345678"
                   aria-label="Password"
                   aria-describedby="basic-addon2">
            <input type="text"
                   v-model="credentials.password"
                   v-show="showPassword"
                   class="form-control"
                   placeholder="12345678"
                   aria-label="Password"
                   aria-describedby="basic-addon2">
            <button class="btn btn-primary" @click.prevent="showPassword = !showPassword">
            <span v-show="!showPassword">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye"
                   viewBox="0 0 16 16">
                <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              </svg>
            </span>
              <span v-show="showPassword">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash"
                   viewBox="0 0 16 16">
                <path
                    d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                <path
                    d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                <path
                    d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
              </svg>
            </span>
            </button>
          </div>
          <button type="submit"
                  class="btn btn-primary"
                  @click.prevent="loginUser"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
    <loading class="mt-3" v-if="loading"></loading>
  </div>
</template>

<script>
import HttpService from "@/service/HTTP/HttpService";
import Loading from "@/components/UI/Loading";

export default {
  components: {Loading},
  data() {
    return {
      credentials: {
        username: 'veron.sheva@gmail.com',
        password: 'Sheva27chenkov@'
      },
      showPassword: false,
      loading: false,
    }
  },
  methods: {
    async loginUser() {
      this.loading = true
      const response = await HttpService.post('login', this.credentials)
      if (response) {
        this.loading = false
        window.localStorage.setItem('username', response.username)
        window.localStorage.setItem('token', response.security.token)
        window.localStorage.setItem('refresh_token', response.security.refresh_token)
        window.localStorage.setItem('adminMode', 'true')
        this.$router.push('/admin')
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
