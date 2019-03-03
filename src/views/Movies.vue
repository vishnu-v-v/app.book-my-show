<template>
  <div>
    <AppHeader />
    <b-container class="bv-example-row">
      <b-row>
        <b-col v-for="show in movieList" :key="show.id">
          <b-card
            :title="`${show.type} ${show.id}`"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </b-card-text>

            <b-button @click="selectShow(show)" variant="primary"
              >Book Now</b-button
            >
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import { mapState } from "vuex";

export default {
  name: "Movies",
  components: { AppHeader },
  created() {
    this.checkSignedIn();
    this.getAllShows();
  },
  computed: mapState({
    movieList: "shows"
  }),
  methods: {
    getAllShows() {
      this.$http.secured
        .get("/shows")
        .then(response => {
          this.$store.commit("setShowsList", response);
        })
        .catch(error => this.setError(error, "Cannot fetch the shows list"));
    },
    selectShow(show) {
      this.$http.secured
        .get(`/shows/${show.id}`)
        .then(response => {
          this.$store.commit("setCurrentShow", response.data.data);
          this.$store.commit("setSeats", response.data.included);
          this.$router.replace("/book-seats");
        })
        .catch(error => this.setError(error, "Cannot fetch the shows list"));
    },
    checkSignedIn() {
      if (!this.$store.state.signedIn) {
        this.$router.replace("/signin");
      }
    }
  }
};
</script>
