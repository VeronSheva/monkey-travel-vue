<template>
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col-3">
        <button @click="$router.push('/trips')" type="button" class="btn btn-secondary">
          До каталогу
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-arrow-return-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="row mt-4">
          <h3>Ваше бронювання:</h3>
        </div>
        <div class="row">
          <div class="col-md-5">
            <trip-by-id
                :trip="trip"
            ></trip-by-id>
          </div>
          <div class="col-md-7">
            <purchase-form class="mt-3"
                           :phoneCodes="phoneCodes"
                           v-model:errors="errors"
                           v-model:name="purchaseData.name"
                           v-model:email="purchaseData.email"
                           v-model:people="purchaseData.people"
                           v-model:phone_number="purchaseData.phone_number"
                           v-model:country_code="purchaseData.country_code"
                           v-model:sum="purchaseData.sum"
                           v-model:tripPrice="trip.price"
                           @savePurchase="savePurchase"
            >
            </purchase-form>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
import PurchaseForm from "@/components/PurchaseForm"
import TripById from "@/components/TripById";
import HttpService from "@/service/HTTP/HttpService";
import InvalidData from "@/Exception/InvalidData";

export default {
  components: {
    TripById, PurchaseForm
  },
  data() {
    return {
      errors: new Map(),
      chosenTripId: null,
      trip: {},
      phoneCodes: [],
      purchaseData: {
        name: '',
        country_code: '',
        phone_number: '',
        email: '',
        trip: null,
        people: null,
      },
    }
  },
  mounted() {
    this.getTripById()
    this.getPhoneCodes()
  },
  methods: {
    async getTripById() {
      this.chosenTripId = window.localStorage.getItem('chosenTrip')
      this.purchaseData.trip = this.chosenTripId
      const response = await HttpService.get('get-trip/' + this.chosenTripId)
      this.trip = response.items[0]
    },
    async getPhoneCodes() {
      this.phoneCodes = await HttpService.get('get-country-codes')
    },
    async savePurchase() {
      this.errors = new Map()
      const response = await HttpService.post('save-purchase', this.purchaseData)
      console.log(response)
      this.$toast.success("Заявку прийнято. Ми зв'яжемося з Вами найближчим часом")
    }
  }
}
</script>

<style>

</style>
