<template>
  <div class="form-text err__msg mb-3">
    {{ errors.get(property) }}
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Map
    },
    property: {
      type: String
    }
  }
}
</script>

<style>
.err__msg {
  color: rgba(255, 2, 2, 0.82);
  font-weight: bold;
}
</style>
