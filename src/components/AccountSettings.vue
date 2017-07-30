<template>
  <form action="">
    <div class="modal-card" @click.stop>
      <header class="modal-card-head">
        <p class="modal-card-title">Account Settings</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
            <b-input icon="person" placeholder="Jane Smith" v-model="displayName"></b-input>
        </b-field>
        <b-field label="Email (username)">
            <b-input type="email" icon="email"
                placeholder="jsmith@example.org" v-model="email">
            </b-input>
        </b-field>
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
      emailsent: false,
      displayName: this.user.displayName,
      email: this.user.email
    }
  }
}
</script>

<style scoped>

</style>
