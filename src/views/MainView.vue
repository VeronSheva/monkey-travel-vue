<template>
  <div class="container">
    <div class="row mt-4 mb-4">
      <div class="col"></div>
      <div class="col-md-8">
        <h1 class="text-center">Пізнавай світ з нами!</h1>
      </div>
      <div class="col"></div>
    </div>

    <div class="row">
      <div class="col-sm-8">
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="10000">
              <img src="https://cdn.cnn.com/cnnnext/dam/assets/200512103822-maldives-bungalow-aerial.jpg"
                   class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="2000">
              <img src="https://static.dw.com/image/60495959_605.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="https://i.natgeofe.com/k/b4b412f8-fe02-482c-b6d6-e1b579cb7fff/turkey-istanbul.jpg?w=636&h=358"
                   class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
                  data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
                  data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div class="col">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">10 років роботи</li>
          <li class="list-group-item">Тисячі задоволених клієнтів</li>
          <li class="list-group-item">Приємні ціни</li>
          <li class="list-group-item">Подорожі на будь-який смак</li>
          <li class="list-group-item">Організуємо все за вас</li>
        </ul>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
