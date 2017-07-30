<template>
  <section class="hero is-fullheight is-primary is-dark">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
              Register for an Account
            </h1>
            <div class="box">
              <a class="button is-google is-social">Sign up with Google</a>
              <hr>
              <b-field label="Name">
                  <b-input icon="person" placeholder="Jane Smith"></b-input>
              </b-field>
              <b-field label="Email (username)">
                  <b-input type="email" icon="email"
                      placeholder="jsmith@example.org">
                  </b-input>
              </b-field>
              <b-field label="Password">
                  <b-input type="password" icon="lock"
                      placeholder="Str0ngP@ssword"
                      password-reveal>
                  </b-input>
              </b-field>
              <hr>
              <p class="control">
                <button class="button is-primary">Register</button>
                <button class="button is-default">Cancel</button>
              </p>
            </div>
            <p class="has-text-centered">
              <a href="#/login">Login</a>
              |
              <a href="#">Need help?</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.is-social {
  width: 100%;
  margin: 4px 0;
}
.is-dark {
  background-color: #F62459;
  background-image: linear-gradient(rgba(70, 116, 149, 0.6),rgba(70, 160, 119, 0.6)),linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url('../assets/bg.jpg');
  background-position: center;
}
</style>
