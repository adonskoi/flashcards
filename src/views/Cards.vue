<template lang="html">
  <div>
    <div class="row">
      <div class="col-sm-12">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Question</th>
              <th scope="col">Answer</th>
              <th scope="col">Next show</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(card, index) in cards" :key="index">
              <td>{{ card.question }}</td>
              <td>{{ card.answer }}</td>
              <td>{{ card.nextShow.getFormatDate() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <button type="button" class="btn btn-primary" @click="uploadAllCards">
          Upload all
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cards() {
      return this.$store.getters.getCards;
    }
  },
  methods: {
    uploadAllCards() {
      return this.$store.dispatch("getAllCards");
    }
  },
  destroyed() {
    return this.$store.dispatch("clearOldCards");
  }
};
</script>

<style lang="css" scoped>
.card {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
