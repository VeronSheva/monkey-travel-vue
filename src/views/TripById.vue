<template>
  <div class="card mb-3 mt-3 bg-light">
    <img :src="trip.img"
         class="card-img-top" alt="...">
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <h5 class="card-title">{{ trip.name }}</h5>
        </div>
        <div class="col-6">
          <h6 class="card-text">Ціна: ${{ trip.price }}</h6>
        </div>
      </div>
      <p class="card-text"><span class="border border-2 border-dark-subtle rounded-pill p-1">{{ trip.date_start }}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-calendar-week mb-1" viewBox="0 0 16 16">
            <path
                d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
            <path
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
          </svg>
          {{ trip.date_end }}</span></p>
      <p class="card-text">{{ trip.description }}</p>
      <div class="row">
        <div class="col-6">
          <p class="card-text">Країна: {{ trip.country }}</p>
        </div>
        <div class="col-6">
          <p class="card-text">Тривалість: {{ trip.duration }} днів</p>
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-6">
          <p class="card-text"><small class="text-muted">Залишилося {{ trip.free_places }} місць</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trip: {
      type: Object,
      required: true
    },
  },
}
</script>

<style>

</style>
