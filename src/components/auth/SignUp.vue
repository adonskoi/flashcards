<template lang="html">
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <h2>Sign Up</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="$v.email.$model"
            required
          />
          <p class="error" v-if="!$v.email.email">
            Please provide a valid email address.
          </p>
          <p class="error" v-if="!$v.email.required && $v.email.$error">
            This field must not be empty.
          </p>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="$v.password.$model"
            required
          />
          <p class="error" v-if="!$v.password.required && $v.password.$error">
            This field must not be empty.
          </p>
          <p class="error" v-if="!$v.password.minLen">
            Password must be at least
            {{ $v.password.$params.minLen.min }} characters.
          </p>
        </div>
        <div class="form-group">
          <label for="password2">Confirm password</label>
          <input
            type="password"
            class="form-control"
            id="password2"
            v-model="$v.password2.$model"
            required
          />
          <p v-if="!$v.password2.sameAs">Invalid confirm password</p>
        </div>
        <button type="submit" :disabled="$v.$error" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: "",
      password2: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    },
    password2: {
      required,
      sameAs: sameAs(vm => {
        return vm.password;
      })
    }
  },
  methods: {
    onSubmit() {
      const userData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signUp", userData);
    }
  }
};
</script>

<style lang="css" scoped></style>
