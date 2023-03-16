<template>
  <table class="table table-bordered">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Подорож</th>
      <th scope="col">Ім'я</th>
      <th scope="col">Код країни</th>
      <th scope="col">Номер телефону</th>
      <th scope="col">Email</th>
      <th scope="col">Час замовлення</th>
      <th scope="col">К-сть людей</th>
      <th scope="col">Сума</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="purchase in purchases">
      <th scope="row">{{ purchase.id }}</th>
      <td>{{ purchase.trip }}</td>
      <td>{{ purchase.name }}</td>
      <td>{{ purchase.country_code }}</td>
      <td>{{ purchase.phone_number }}</td>
      <td>{{ purchase.email }}</td>
      <td>{{ purchase.order_time }}</td>
      <td>{{ purchase.people }}</td>
      <td>{{ purchase.sum }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    purchases: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
