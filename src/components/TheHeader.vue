<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <a class="navbar-brand" href="#">Flash cards</a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link to="/" tag="li" exact activeClass="active"
          ><a class="nav-link">Home</a></router-link
        >

        <router-link to="/cards" tag="li" exact activeClass="active"
          ><a class="nav-link">Cards</a></router-link
        >

        <app-add-card v-if="isAuth"></app-add-card>
        <router-link
          v-if="!isAuth"
          to="/login"
          tag="li"
          exact
          activeClass="active"
          ><a class="nav-link">Login</a></router-link
        >
        <router-link
          v-if="!isAuth"
          to="/signup"
          tag="li"
          exact
          activeClass="active"
          ><a class="nav-link">SignUp</a></router-link
        >
        <li v-if="isAuth">
          <a class="nav-link" style="cursor: pointer" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import AddCard from "@/components/AddCard";

export default {
  data() {
    return {};
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  components: {
    appAddCard: AddCard
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="css" scoped></style>
