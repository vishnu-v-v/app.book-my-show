<template>
  <div>
    <AppHeader />
    <b-container class="bv-example-row">
      <b-row>
        <div v-for="(seat, index) in seats" :key="seat.id">
          <button
            class="btn"
            :class="{
              'btn-primary': seat.selected,
              'btn-secondary': !seat.selected,
              'btn-danger': seat.attributes.reserved
            }"
            :disabled="seat.attributes.reserved"
            @click="selectSeats(index)"
          >
            {{ seat.attributes.name }}
          </button>
        </div>
      </b-row>
    </b-container>
    <b-button @click="bookTickets" variant="success">Book Tickets</b-button>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import { mapState } from "vuex";

export default {
  name: "Movies",
  components: { AppHeader },
  computed: mapState({
    show: "show",
    seats: "seats"
  }),
  methods: {
    selectSeats(index) {
      this.$store.commit("selectSeat", index);
    },
    bookTickets() {
      let selected_seats = [];
      this.seats.map(function(seat) {
        if (seat.selected) selected_seats.push(seat.id);
      });
      let params = {
        booking: {
          seat_ids: selected_seats
        }
      };
      this.$http.secured
        .post(`/shows/${this.show.id}/bookings`, params)
        .then(response => {
          let success_message = `${
            response.data.message
          }\nKrishi Kalyan Cess: ${
            response.data.krishi_kalyan_cess
          }\nSwach Bharath Cess: ${
            response.data.swach_bharath_cess
          }\nService Tax: ${response.data.service_tax}\nNet Amount: ${
            response.data.net_amount
          }\nTotal: ${response.data.total}`;
          alert(success_message);
          this.$router.replace("/movies");
        })
        .catch(error =>
          this.setError(error, "Some error occured, please try again later")
        );
    }
  }
};
</script>
