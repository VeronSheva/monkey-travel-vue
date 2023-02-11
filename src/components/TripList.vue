<template>
  <div class="row" v-if="trips.length > 0">
    <trip-item
        v-for="trip in trips"
        :trip="trip"
        :key="trip.id"
    >
    </trip-item>
  </div>
  <div v-else class="notFound"><h3>Даних за Вашим запитом не знайдено</h3>
    <div class="img">
      <img
          src="https://thumbs.dreamstime.com/b/emoticon-throws-up-his-hands-i-do-not-know-emoticon-i-have-not-emoticon-no-idea-emoji-amazement-emotion-76862793.jpg"
          class="img_item" alt="...">
    </div>
  </div>
</template>

<script>
import TripItem from "@/components/TripItem";

export default {
  components: {TripItem},
  props: {
    trips: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.notFound {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
}

.img {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img_item {
  height: 300px;
  width: auto
}
</style>
