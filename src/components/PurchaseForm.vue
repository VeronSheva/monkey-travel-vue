<template>
  <form class="card p-3 bg-light">
    <div :class="'input-group ' + (errors ? err('name') : 'mb-3') ">
      <input type="text"
             :class="'form-control' "
             placeholder="Ім'я та прізвище"
             aria-label="Username"
             @input="updateName"
             aria-describedby="basic-addon1">
    </div>
    <div class="form-text err__msg mb-3"
        v-if="errors"
    >{{ errors.get('name') }}
    </div>
    <div class="row">
      <div class="col-12 col-md-12 col-sm-7 col-lg-7">
        <div class="row">
          <div class="col-5">
            <div :class="'input-group ' + (errors ? err('country_code') : 'mb-3') ">
              <select
                  @input="updateCountryCode"
                  class="form-select"
                  aria-label="Default select example">
                <option value="" selected disabled>Оберіть</option>
                <option
                    v-for="code in phoneCodes"
                    :key="code.abr"
                    :value="code.abr"
                >{{ code.code }} ({{ code.abr }})
                </option>
              </select>
            </div>
            <div class="form-text err__msg mb-3"
                v-if="errors"
            >{{ errors.get('country_code') }}
            </div>
          </div>
          <div class="col-7">
            <div :class="'input-group ' + (errors ? err('phone_number') : 'mb-3') ">
              <input type="tel"
                     @input="updatePhoneNumber"
                     class="form-control"
                     placeholder="Номер телефону"
                     aria-label="Recipient's username" aria-describedby="basic-addon2">
            </div>
            <div class="form-text err__msg mb-3"
                v-if="errors"
            >{{ errors.get('phone_number') }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-12 col-sm-5 col-lg-5">
        <div :class="'input-group ' + (errors ? err('people') : 'mb-3') ">
          <input type="number"
                 @input="updatePeople"
                 class="form-control"
                 placeholder="Кількість людей"
                 aria-label="Amount (to the nearest dollar)">
        </div>
        <div class="form-text err__msg mb-3"
            v-if="errors"
        >{{ errors.get('people') }}
        </div>
      </div>
    </div>
    <div :class="'input-group ' + (errors ? err('email') : 'mb-3') ">
      <input type="email"
             @input="updateEmail"
             placeholder="Email"
             class="form-control"
             aria-label="Email"
             id="basic-url"
             aria-describedby="basic-addon3">
    </div>
    <div class="form-text err__msg mb-3"
        v-if="errors"
    >{{ errors.get('email') }}
    </div>
    <div class="row">
      <div class="col-6"></div>
      <div class="col-6" align="right">
        <h5>Сума: ${{ sum }} </h5>
        <button type="submit"
                class="btn btn-primary mt-2"
                @click.prevent="$emit('savePurchase')"
        >Підтвердити
        </button>
      </div>
    </div>

  </form>
</template>

<script>
export default {
  data() {
    return {
      sum: 0
    }
  },
  props: {
    phoneCodes: {
      type: Array,
      required: true,
    },
    name: {
      type: String
    },
    country_code: {
      type: String
    },
    phone_number: {
      type: String
    },
    email: {
      type: String
    },
    people: {
      type: Number
    },
    tripPrice: {
      type: Number
    },
    errors: {
      type: Map,
      default: false
    }
  },
  methods: {
    updateEmail(event) {
      this.$emit('update:email', event.target.value)
    },
    updatePeople(event) {
      const value = event.target.value
      this.$emit('update:people', value)
      if (value > 0 && value <= 20 && value !== '' ) {
        this.updateSum(event.target.value)
      }
    },
    updateName(event) {
      this.$emit('update:name', event.target.value)
    },
    updatePhoneNumber(event) {
      this.$emit('update:phone_number', event.target.value)
    },
    updateCountryCode(event) {
      this.$emit('update:country_code', event.target.value)
    },
    updateSum(people) {
      this.sum = this.tripPrice * people
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
.err__msg {
  color: rgba(255, 2, 2, 0.82);
  font-weight: bold;
}
</style>
