<template>
  <div class="row">
    <trip-item
    v-for="trip in trips"
    :trip="trip"
    :key="trip.id"
    >
    </trip-item>
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

<style>

</style>
