<template>
  <div>
    <AppHeader />
    <b-jumbotron
      :header="`Total: Rs.${revenue.total.toString()}`"
      :lead="`Net. Amount: Rs.${revenue.net_amount.toString()}`"
    >
      <p>Service Tax: {{ revenue.service_tax }}</p>
      <p>Krishi Kalyan Cess: {{ revenue.krishi_kalyan_cess }}</p>
      <p>Swach Bharath Cess: {{ revenue.swach_bharath_cess }}</p>
    </b-jumbotron>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";

export default {
  name: "Revenue",
  components: { AppHeader },
  data: function() {
    return {
      revenue: {
        total: ""
      }
    };
  },
  created() {
    this.getRevenue();
  },
  methods: {
    getRevenue() {
      this.$http.secured
        .get("/admin/revenue")
        .then(response => {
          this.revenue = response.data;
        })
        .catch(error => this.setError(error, "Cannot fetch the shows list"));
    }
  }
};
</script>
