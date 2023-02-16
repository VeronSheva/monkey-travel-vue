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
                :errors="errors"
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

export default {
  components: {
    TripById, PurchaseForm
  },
  data() {
    return {
      errors: false,
      chosenTripId: null,
      trip: {},
      phoneCodes: [
        {code: '+380', abr: 'UA'},
        {code: '+48', abr: 'PL'},
        {code: '+1', abr: 'US'},
        {code: '+9', abr: 'TR'},
        {code: '+373', abr: 'MD'},
        {code: '+351', abr: 'PT'},
        {code: '+39', abr: 'IT'},
        {code: '+44', abr: 'UK'},
        {code: '+33', abr: 'FR'},
      ],
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
  methods: {
    async getTripById() {
      this.chosenTripId = window.localStorage.getItem('chosenTrip')
      this.purchaseData.trip = this.chosenTripId
      window.localStorage.setItem('chosenTripId', null)
      const response = await HttpService.get('get-trip/' + this.chosenTripId)
      this.trip = response.items[0]
    },
    async getPhoneCodes() {
      this.phoneCodes = await HttpService.get('get-country-codes')
    },
    async savePurchase() {
      this.errors = await HttpService.post('save-purchase', this.purchaseData)
    }
  },
  mounted() {
    this.getTripById()
    this.getPhoneCodes()
  }
}
</script>

<style>

</style>
