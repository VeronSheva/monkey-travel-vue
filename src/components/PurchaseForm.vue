<template>
  <form class="card p-3 bg-light">
    <div class="input-group mb-3">
      <input type="text"
             class="form-control"
             placeholder="Ім'я та прізвище"
             aria-label="Username"
             @input="updateName"
             aria-describedby="basic-addon1">
    </div>
    <div class="row">
      <div class="col-7">
        <div class="row">
          <div class="col-5">
            <div class="input-group mb-3">
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
          </div>
          <div class="col-7">
            <div class="input-group mb-3">
              <input type="tel"
                     @input="updatePhoneNumber"
                     class="form-control"
                     placeholder="Номер телефону"
                     aria-label="Recipient's username" aria-describedby="basic-addon2">
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-12 col-sm-5 col-lg-5">
        <div class="input-group mb-3">
          <input type="number"
                 @input="updatePeople"
                 class="form-control"
                 placeholder="Кількість людей"
                 aria-label="Amount (to the nearest dollar)">
        </div>
      </div>
    </div>

    <div class="input-group mb-3">
      <input type="text"
             @input="updateEmail"
             placeholder="Email"
             class="form-control"
             aria-label="Email"
             id="basic-url"
             aria-describedby="basic-addon3">
    </div>

    <div class="row">
      <div class="col-6"></div>
      <div class="col-6" align="right">
        <h5>Сума: ${{ sum }} </h5>
        <button type="submit" class="btn btn-primary mt-2">Підтвердити</button>
      </div>
    </div>

  </form>
</template>

<script>
export default {
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
    sum: {
      type: Number
    },
    tripPrice: {
      type: Object
    }
  },
  methods: {
    updateEmail(event) {
      this.$emit('update:email', event.target.value)
    },
    updatePeople(event) {
      this.updateSum(event.target.value)
      this.$emit('update:people', event.target.value)
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
      this.$emit('update:sum', this.tripPrice.price * people)
    }
  }
}
</script>

<style>

</style>
