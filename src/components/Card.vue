<template lang="html">
  <div class="">
    <!-- <transition name="flip" mode="out-in"> -->
    <div class="card text-center" v-if="card" :key="card.id">
      <!-- <h3 class="card-header">Deck's name</h3> -->
      <div class="card-body">
        <h5 class="card-title">{{ card.question }}</h5>
        <p class="card-text" v-show="showAnswer">{{ card.answer }}</p>
        <button
          class="btn btn-default"
          v-show="!showAnswer"
          @click="showAnswer = !showAnswer"
        >
          Show answer
        </button>
        <button
          type="button"
          v-show="showAnswer"
          @click="next(card)"
          class="btn btn-default"
          aria-label="Close"
        >
          <i class="fa fa-check"></i> Next
          <!-- <p class="text-muted" style="font-size: 80%;">
            {{ card.nextShow.getFormatDate() }}
          </p> -->
        </button>
        <button
          type="button"
          v-show="showAnswer"
          @click="nextRepeat(card)"
          class="btn btn-default"
          aria-label="Close"
        >
          Repeat
        </button>
      </div>
      <div class="card-footer text-muted">
        <div class="row">
          <div class="col-sm-4">
            <app-edit-card :card="card"></app-edit-card>
          </div>
          <div class="col-sm-4">
            <button type="button" @click="removeCard(card.id)" class="close">
              <i style="font-size: 50%;" class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import EditCard from "@/components/EditCard";

export default {
  components: {
    appEditCard: EditCard
  },
  data() {
    return {
      showAnswer: false
    };
  },
  props: {
    card: {
      required: true
    }
  },
  methods: {
    removeCard(cardId) {
      this.$store.dispatch("removeCard", cardId);
    },
    next(card) {
      this.$store.dispatch("nextCard", card);
      this.showAnswer = false;
    },
    nextRepeat(card) {
      card.counter = 0;
      card.nextShow = new Date(Date.now());
      this.$store.dispatch("updateCard", card);
      this.showAnswer = false;
    }
  }
};
</script>

<style lang="css" scoped>
.flip-enter-active {
  animation: flip-in .5s forwards;
}
.flip-leave-active {
  animation: flip-out .5s forwards;
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
