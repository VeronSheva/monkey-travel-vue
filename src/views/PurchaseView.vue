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
      <div class="col-11">
        <div class="row mt-4 mb-2">
          <h3>Ваше бронювання:</h3>
        </div>
        <div class="row">
          <div class="col-md-5">
            <trip-by-id
                :trip="getTripById"
            ></trip-by-id>
          </div>
          <div class="col-md-7">
            <purchase-form
                :phoneCodes="phoneCodes"
                v-model:name="purchaseData.name"
                v-model:email="purchaseData.email"
                v-model:people="purchaseData.people"
                v-model:phone_number="purchaseData.phone_number"
                v-model:country_code="purchaseData.country_code"
                v-model:sum="purchaseData.sum"
                v-model:tripPrice="getTripById"
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
import TripById from "@/views/TripById";

export default {
  components: {
    TripById, PurchaseForm
  },
  data() {
    return {
      chosenTripId: null,
      trips: [
        {
          id: 0,
          name: "Італія-20",
          description: "ілоамтщуйкь",
          price: 400,
          duration: 20,
          date_start: "25-10-2022",
          date_end: "25-10-2022",
          country: "Італія",
          img: "https://cdn.cnn.com/cnnnext/dam/assets/200512103822-maldives-bungalow-aerial.jpg",
          free_places: 30
        },
        {
          id: 1,
          name: "Італія-10",
          description: "ілоамтщуйкь",
          price: 200,
          duration: 10,
          date_start: "10-10-2022",
          date_end: "10-10-2022",
          country: "Італія",
          img: "https://cdn.cnn.com/cnnnext/dam/assets/200512103822-maldives-bungalow-aerial.jpg",
          free_places: 30
        },
        {
          id: 2,
          name: "Італія-5",
          description: "ілоамтщуйкь",
          price: 100,
          duration: 5,
          date_start: "20-10-2022",
          date_end: "20-10-2022",
          country: "Італія",
          img: "https://cdn.cnn.com/cnnnext/dam/assets/200512103822-maldives-bungalow-aerial.jpg",
          free_places: 30
        },
      ],
      phoneCodes: [
        {code: '+380' , abr: 'UA'},
        {code: '+48' , abr: 'PL'},
        {code: '+1' , abr: 'US'},
        {code: '+9' , abr: 'TR'},
        {code: '+373' , abr: 'MD'},
        {code: '+351' , abr: 'PT'},
        {code: '+39' , abr: 'IT'},
        {code: '+44' , abr: 'UK'},
        {code: '+33' , abr: 'FR'},
      ],
      purchaseData: {
        name: '',
        country_code: '',
        phone_number: '',
        email: '',
        trip: null,
        people: null,
        sum: 0,
      },
    }
  },
  computed: {
     getTripById() {
      // const response = axios.get("/api/v1/get-trip/" + this.chosenTripId)
      // return response.data
       if (this.chosenTripId === null) {
         this.chosenTripId = window.localStorage.getItem('chosenTrip')
         this.purchaseData.trip = this.chosenTripId
         window.localStorage.setItem('chosenTripId', null)
       }
       const trip = this.trips.filter(trip => trip.id == this.chosenTripId)
       return trip[0]
    },
  },
}
</script>

<style>

</style>
