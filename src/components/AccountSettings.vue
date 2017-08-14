<template>
  <form action="">
    <div class="modal-card" @click.stop>
      <header class="modal-card-head has-text-centered">

      </header>
      <section class="modal-card-body">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p class="title is-4">Account Profile</p>
              <b-field>
                  <b-input icon="person" :placeholder="user.displayName" v-model="displayName"></b-input>
              </b-field>
              <b-field>
                  <b-input type="email" icon="email"
                      :placeholder="user.email" v-model="email">
                  </b-input>
              </b-field>
            </div>
          </div>
          <figure class="media-right">
            <p class="image is-96x96">
              <img v-if="user.photoURL" class="is-circle-image" :src="user.photoURL" alt="User Profile Image">
              <img v-else class="is-circle-image" src="../assets/user-placeholder.png" alt="User Profile Image">
            </p>
          </figure>
        </article>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success">Save changes</a>
        <a class="button" @click="$parent.close()">Cancel</a>
      </footer>
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
</style>
