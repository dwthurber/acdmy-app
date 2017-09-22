<template>
  <form action="">
    <div class="modal-card" @click.stop>
      <section class="modal-card-body">
        <div class="columns is-mobile">
          <div class="column is-8">
            <p class="title is-3">{{user.displayName}}</p>
            <p class="subtitle is-5">{{user.email}}</p>
            <hr>
            <p class="subtitle has-text-primary is-5">Update Account Details</p>
            <b-field>
              <b-input icon="person" :placeholder="user.displayName" v-model="displayName"></b-input>
            </b-field>
            <b-field>
              <b-input type="email" icon="email"
                :placeholder="user.email" v-model="email">
              </b-input>
            </b-field>
            <br>
            <button class="button is-danger is-outlined" @click="resetPassword()">Reset Password</button>
          </div>
          <div class="column has-text-right">
            <p class="image is-96x96">
              <img v-if="user.photoURL" class="is-circle-image" :src="user.photoURL" alt="User Profile Image">
              <img v-else class="is-circle-image" src="../../assets/user-placeholder.png" alt="User Profile Image">
            </p>
          </div>
        </div>
        <hr>
        <a class="button is-primary">Save changes</a>
        <a class="button" @click="$parent.close()">Cancel</a>
      </section>
    </div>
  </form>
</template>

<script>
import Firebase from 'firebase'
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
  },
  methods: {
    resetPassword: function () {
      let toast = this.$toast
      Firebase.auth().sendPasswordResetEmail(this.user.email).then(function () {
        toast.open({
          message: 'Email sent',
          type: 'is-success'
        })
      }).catch(function (error) {
        if (error.code === 'auth/user-not-found') {
          toast.open({
            message: 'No user with that email exists',
            type: 'is-danger'
          })
        } else if (error.code === 'auth/invalid-email') {
          toast.open({
            message: 'Email address bad. Please try again',
            type: 'is-warning'
          })
        } else {
          toast.open({
            message: 'An error occured. Please try again',
            type: 'is-danger'
          })
        }
        console.log(error)
      })
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
