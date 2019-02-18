<template>
  <div>
    <h2 v-if="card">Your cards for today:</h2>
    <div class="row">
      <div class="col-sm-8 offset-sm-2" v-if="card">
        <transition name="flip" mode="out-in">
          <appCard :card="card" :key="card.id"></appCard>
        </transition>
      </div>
      <div class="col-sm-8 offset-sm-2" v-if="!card">
        <h2>Today you repeat all cards!</h2>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card";

export default {
  name: "home",
  components: {
    appCard: Card
  },
  computed: {
    card() {
      return this.$store.getters.getCard;
    }
  }
};
</script>
<style scoped>
.flip-enter-active {
  animation: flip-in 0.3s forwards;
}
.flip-leave-active {
  animation: flip-out 0.3s forwards;
}

@keyframes flip-out {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}

@keyframes flip-in {
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}
</style>
