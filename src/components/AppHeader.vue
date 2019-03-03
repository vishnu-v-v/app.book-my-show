<template>
  <div id="nav">
    <router-link v-if="showAdminLink()" to="/admin/revenue">Admin Dashboard</router-link>
    <b-link class="nav-link" @click="signOut">Sign out</b-link>
  </div>
</template>

<script>

export default {
  name: "AppHeader",
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    signOut() {
      this.$http.secured
        .delete("/signin")
        .then(() => {
          this.$store.commit("unsetCurrentUser");
          this.$router.replace("/");
        })
        .catch(error => this.setError(error, "Cannot sign out"));
    },
    showAdminLink() {
      return this.$store.getters.isAdmin;
    }
  }
};
</script>
