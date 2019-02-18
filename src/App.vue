<template>
  <div id="app">
    <div class="container">
      <appTheHeader></appTheHeader>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";

export default {
  components: {
    appTheHeader: TheHeader
  },
  created() {
    if (!this.$store.cards && this.$store.getters.isAuthenticated) {
      this.$store.dispatch("getTodayCards");
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.slide-enter-active {
  animation: slide-in 1s forwards;
  transform: opacity 1s;
}
.slide-leave-active {
  animation: slide-out 1s forwards;
  transition: opacity 1s;
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateX(50px);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
  }
}
</style>
