<template lang="html">
  <li class="nav-item dropdown">
    <a @click="isOpen = !isOpen" class="nav-link" style="cursor: pointer;"
      >Add card</a
    >
    <div>
      <form
        class="dropdown-menu p-4"
        :class="{ show: isOpen }"
        @submit.prevent="addCard()"
      >
        <div class="form-group">
          <label for="Question">Question</label>
          <input
            type="text"
            class="form-control"
            id="question"
            placeholder="question"
            v-model="question"
          />
        </div>
        <div class="form-group">
          <label for="answer">Answer</label>
          <input
            type="text"
            class="form-control"
            id="answer"
            placeholder="answer"
            v-model="answer"
          />
        </div>
        <button class="btn btn-primary">
          Add card
        </button>
      </form>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      answer: "",
      isOpen: false
    };
  },
  methods: {
    addCard() {
      this.$store.dispatch("addCard", {
        question: this.question,
        answer: this.answer
      });
      this.question = "";
      this.answer = "";
      this.isOpen = false;
    }
  }
};
</script>

<style lang="css" scoped></style>
