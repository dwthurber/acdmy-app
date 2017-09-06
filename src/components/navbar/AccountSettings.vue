<template>
  <form action="">
    <div class="modal-card" @click.stop>
      <section class="modal-card-body">
        <p class="subtitle is-3">Account Profile</p>
        <div class="columns is-mobile">
          <div class="column is-8">
            <b-field>
              <b-input icon="person" :placeholder="user.displayName" v-model="displayName"></b-input>
            </b-field>
            <b-field>
              <b-input type="email" icon="email"
                :placeholder="user.email" v-model="email">
              </b-input>
            </b-field>
            <br>
            <p class="subtitle is-4">Reset Password</p>
            <b-field label="Current Password">
              <b-input type="password" icon="lock" @keyup.enter="login"
                placeholder="********" v-model="password"
                password-reveal>
              </b-input>
            </b-field>
            <b-field label="New Password">
              <b-input type="password" icon="lock" @keyup.enter="login"
                placeholder="********" v-model="password"
                password-reveal>
              </b-input>
            </b-field>
            <b-field>
              <b-input type="password" icon="lock" @keyup.enter="login"
                placeholder="********" v-model="password"
                password-reveal>
              </b-input>
            </b-field>
          </div>
          <div class="column has-text-right">
            <p class="image is-96x96">
              <img v-if="user.photoURL" class="is-circle-image" :src="user.photoURL" alt="User Profile Image">
              <img v-else class="is-circle-image" src="../../assets/user-placeholder.png" alt="User Profile Image">
            </p>
          </div>
        </div>
        <hr>
        <a class="button is-success">Save changes</a>
        <a class="button" @click="$parent.close()">Cancel</a>
      </section>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'modal-account',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      saving: false,
      displayName: null,
      email: null
    }
  }
}
</script>

<style scoped>
.is-96x96 img {
  max-height: initial;
  height: 96px;
  width: auto;
  overflow: hidden;
}
.image {
  display: inline-block;
}
</style>
