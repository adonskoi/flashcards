<template lang="html">
  <div>
    <button type="button" @click="isOpen = !isOpen" class="close">
      <i style="font-size: 50%;" class="far fa-edit"></i>
    </button>
    <form
      class="dropdown-menu p-4"
      :class="{ show: isOpen }"
      @submit.prevent="editCard(card)"
    >
      <div class="form-group">
        <label for="Question">Question</label>
        <input
          type="text"
          class="form-control"
          id="question"
          v-model="card.question"
        />
      </div>
      <div class="form-group">
        <label for="Answer">Answer</label>
        <input
          type="text"
          class="form-control"
          id="answer"
          v-model="card.answer"
        />
      </div>
      <button class="btn btn-primary">
        Update Card
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  props: ["card"],
  methods: {
    editCard(card) {
      this.$store.dispatch("updateCard", {
        id: card.id,
        question: card.question,
        answer: card.answer,
        nextShow: card.nextShow,
        counter: card.counter
      });
      this.isOpen = false;
    }
  }
};
</script>

<style lang="css" scoped></style>
