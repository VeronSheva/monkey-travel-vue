<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-airplane-fill mb-1 ms-3" viewBox="0 0 16 16">
            <path
                d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z"/>
          </svg>
          Monkey-Travel
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto ">
            <li class="nav-item active">
              <router-link to="/feedbacks" class="nav-link"><span class="sr-only">Відгуки</span></router-link>
            </li>
            <li class="nav-item">
              <router-link to="/trips" class="nav-link"><span class="sr-only">Подорожі</span></router-link>
            </li>
            <li class="nav-item" v-if="admin">
              <router-link to="/admin" class="nav-link"><span class="sr-only">Адмін</span></router-link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
                class="form-control me-2"
                type="search"
                placeholder="Пошук"
                aria-label="Search"
                @focus="$router.push('/trips')"
                :value="searchQuery"
                @input="$emit('update:searchQuery', $event.target.value)"
            >
            <button
                class="btn btn-outline-primary"
                @click.prevent="$emit('search')"
                type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   class="bi bi-search mb-1" viewBox="0 0 16 16">
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin: this.adminMode
    }
  },
  props: {
    searchQuery: {
      type: String,
    }
  },
  inject: ['adminMode']
}
</script>

<style></style>
