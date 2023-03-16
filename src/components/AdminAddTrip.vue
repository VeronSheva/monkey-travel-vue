<template>
  <form class="card p-3 bg-light">
    <div class="row">
      <div class="col-4">
        <div :class="'input-group ' + (errors ? err('name') : 'mb-3') ">
          <span class="input-group-text">Назва</span>
          <input type="text"
                 :class="'form-control' "
                 @input="updateName"
                 aria-describedby="basic-addon1">
        </div>
        <error-message
            v-if="errors"
            :errors="errors"
            property="name"
        >
        </error-message>
      </div>
      <div class="col-4">
        <div :class="'input-group ' + (errors ? err('price') : 'mb-3') ">
          <span class="input-group-text">Ціна</span>
          <input type="number"
                 :class="'form-control' "
                 @input="updatePrice"
                 aria-describedby="basic-addon1">
        </div>
        <error-message
            v-if="errors"
            :errors="errors"
            property="price"
        >
        </error-message>
      </div>
      <div class="col-4">
        <div :class="'input-group ' + (errors ? err('country') : 'mb-3')">
          <span class="input-group-text">Країна</span>
          <select
              @input="updateCountry"
              class="form-select"
              aria-label="Default select example">
            <option value="" selected disabled>Оберіть</option>
            <option
                v-for="country in countries"
                :key="country.key"
                :value="country"
            >{{ country }}
            </option>
          </select>
        </div>
        <error-message
            v-if="errors"
            :errors="errors"
            property="country"
        >
        </error-message>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div :class="'input-group ' + (errors ? err('free_places') : 'mb-3') ">
          <span class="input-group-text">К-сть місць</span>
          <input type="number"
                 @input="updateFreePlaces"
                 class="form-control"
                 aria-describedby="basic-addon2">
        </div>
        <error-message
            v-if="errors"
            :errors="errors"
            property="free_places"
        >
        </error-message>
      </div>
      <div class="col-4">
        <div :class="'input-group ' + (errors ? err('duration') : 'mb-3') ">
          <span class="input-group-text">Тривалість</span>
          <input type="number"
                 @input="updateDuration"
                 class="form-control">
        </div>
        <error-message
            v-if="errors"
            :errors="errors"
            property="duration"
        >
        </error-message>
      </div>
      <div class="col-4">
        <div :class="'input-group ' + (errors ? err('img') : 'mb-3') ">
          <span class="input-group-text">Фото</span>
          <input type="text"
                 @input="updateImg"
                 class="form-control"
                 aria-describedby="basic-addon3">
        </div>
        <error-message
            v-if="errors"
            :errors="errors"
            property="img"
        >
        </error-message>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div :class="'input-group ' + (errors ? err('date_start') : 'mb-3') ">
          <span class="input-group-text">Початок</span>
          <input type="date"
                 @input="updateDateStart"
                 class="form-control"
                 aria-describedby="basic-addon3">
        </div>
        <error-message
            v-if="errors"
            :errors="errors"
            property="date_start"
        >
        </error-message>
      </div>
      <div class="col-6">
        <div :class="'input-group ' + (errors ? err('date_end') : 'mb-3') ">
          <span class="input-group-text">Кінець</span>
          <input type="date"
                 @input="updateDateEnd"
                 class="form-control"
                 aria-describedby="basic-addon3">
        </div>
        <error-message
            v-if="errors"
            :errors="errors"
            property="date_end"
        >
        </error-message>
      </div>
    </div>
    <div class="row">
    <div :class="'input-group ' + (errors ? err('description') : 'mb-3') ">
      <span class="input-group-text">Опис</span>
      <input type="text"
             @input="updateDescription"
             class="form-control"
             aria-describedby="basic-addon3">
    </div>
    <error-message
        v-if="errors"
        :errors="errors"
        property="description"
    >
    </error-message>
    </div>
    <div class="row">
      <div class="col-6"></div>
      <div class="col-6" align="right">
        <button type="submit"
                class="btn btn-primary mt-2"
                @click.prevent="$emit('saveTrip')"
        >Підтвердити
        </button>
      </div>
    </div>

  </form>
</template>

<script>
import ErrorMessage from "@/components/UI/ErrorMessage";

export default {
  components: {ErrorMessage},
  props: {
    countries: {
      type: Array,
      required: true
    },
    errors: {
      type: Map,
      default: new Map()
    },
    name: {
      type: String
    },
    price: {
      type: Number
    },
    description: {
      type: String
    },
    img: {
      type: String
    },
    free_places: {
      type: Number
    },
    duration: {
      type: Number
    },
    date_start: {
      type: String
    },
    date_end: {
      type: String
    },
    country: {
      type: String
    }
  },
  methods: {
    updateErrors(errors) {
      this.$emit('update:errors', errors)
    },
    updateName(event) {
      this.$emit('update:name', event.target.value)
    },
    updateDescription(event) {
      this.$emit('update:description', event.target.value)
    },
    updatePrice(event) {
      this.$emit('update:price', event.target.value)
    },
    updateCountry(event) {
      this.$emit('update:country', event.target.value)
    }
    , updateFreePlaces(event) {
      this.$emit('update:free_places', event.target.value)
    },
    updateDateStart(event) {
      this.$emit('update:date_start', event.target.value)
    },
    updateDateEnd(event) {
      this.$emit('update:date_end', event.target.value)
    },
    updateDuration(event) {
      this.$emit('update:duration', event.target.value)
    },
    updateImg(event) {
      this.$emit('update:img', event.target.value)
    },
    err(property) {
      if (this.errors.get(property)) {
        return 'err';
      }
    }
  }
}
</script>

<style>
.err {
  background: #ffe6ee;
  border: 2px solid rgba(255, 2, 2, 0.82);
  border-radius: 7px;
}
</style>
