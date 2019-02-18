<template lang="html">
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <h2>Login</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            v-model="$v.email.$model"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="$v.password.$model"
          />
        </div>
        <button class="btn btn-primary">
          Submit
        </button>
        <p>First time on Flashcards? Please <a href="/signup">Sign up</a></p>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("ERRROR");
      } else {
        const userData = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("login", userData);
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
