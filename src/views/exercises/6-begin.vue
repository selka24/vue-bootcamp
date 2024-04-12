<script setup>
import { reactive, computed } from "vue";
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  interests: [],
  agreeTerms: false
})

const formErrors = reactive({
  email: false,
  password: false,
  confirmPassword: false,
  interests: false,
  agreeTerms: false
})

const validations = {
  email: (value) => value.match(emailRegex),
  interests: (value) => value.length > 0,
  password: (value) => value.length > 0,
  confirmPassword: (value) => form.password === value && value.length > 0,
  agreeTerms: (value) => value
}

const formValidation = (formInput) => {
  const value = form[formInput];
  const isValid = validations[formInput](value);

  formErrors[formInput] = !isValid;
}

const formIsValid = computed(() => {
  for (const errorKey in formErrors) {
    if (formErrors[errorKey])
      return false;
  }
  return true;
})

const validateAllForm = () => {
  for (const input in form) {
    formValidation(input)
  }
}
const handleFormSubmit = () => {
  validateAllForm();
  console.log(formIsValid.value, 'fooorrm');
  if (formIsValid.value) {
    console.log(form);
  } else {
    alert('Form is invalid')
  }
}
</script>

<template>
  <div class="page-wrapper">
    <h1>Register</h1>
    <form @submit.prevent="handleFormSubmit">
      <label class="form-control">
        <div class="label">Email</div>
        <input id="email" type="text" v-model.lazy="form.email" @change="formValidation('email')" name="email"
          :class="['input input-bordered', { 'input-error': formErrors.email }]" />
        <div class="label" v-show="formErrors.email">
          <span class="text-red-500 label-text-alt">A valid email is required</span>
        </div>
      </label>

      <label class="form-control">
        <div class="label">Password</div>
        <input id="password" @change="formValidation('password')" v-model.lazy="form.password" type="password"
          name="password" :class="['input input-bordered', { 'input-error': formErrors.password }]" />
        <div class="label" v-show="formErrors.password">
          <span class="text-red-500 label-text-alt">Password is required</span>
        </div>
      </label>

      <label class="form-control">
        <div class="label">Confirm Password</div>
        <input id="confirm_password" v-model.lazy="form.confirmPassword" @change="formValidation('confirmPassword')"
          type="password" name="confirm_password"
          :class="['input input-bordered', { 'input-error': formErrors.confirmPassword }]" />
        <!-- Show if invalid -->
        <div class="label" v-show="formErrors.confirmPassword">
          <span class="text-red-500 label-text-alt">Passwords must match</span>
        </div>
      </label>

      <div class="form-control">
        <label class="label">Interested in...</label>
        <div class="flex gap-5">
          <label class="flex items-center" v-for="interst in ['hiking', 'biking', 'camping', 'skiing']" :key="interst">
            <input type="checkbox" name="interests" :value="interst" @change="formValidation('interests')"
              v-model="form.interests" />{{ interst }}
          </label>
        </div>

        <!-- Show if invalid -->
        <div class="label" v-show="formErrors.interests">
          <span class="mt-5 text-red-500 label-text-alt">Must select at least one interest</span>
        </div>
      </div>

      <hr class="my-5 opacity-20" />

      <label class="flex items-center">
        <input type="checkbox" v-model="form.agreeTerms" @change="formValidation('agreeTerms')" name="terms"
          class="w-auto checkbox checkbox-primary" />
        <span class="label-text">I agree to the terms and conditions</span>
      </label>

      <!-- Show if invalid -->
      <div class="label" v-show="formErrors.agreeTerms">
        <span class="mt-5 text-red-500 label-text-alt">You must agree to the terms and conditions</span>
      </div>

      <button class="block w-full mt-5 btn btn-primary" type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<style scoped>
.page-wrapper {
  @apply w-[960px] m-auto mt-20;
}

h1 {
  @apply text-3xl mb-5;
}

h2 {
  @apply text-xl mb-3;
}

input,
textarea,
select {
  @apply block mb-3 w-full;
}

input[type="checkbox"] {
  @apply checkbox inline-block my-0 mr-3;
}
</style>
