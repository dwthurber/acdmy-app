<template>
  <section class="hero is-fullheight is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
              Sign In
            </h1>
            <div class="box">
              <label class="label">Username</label>
              <p class="control">
                <input class="input" type="text" placeholder="jsmith">
              </p>
              <label class="label">Password</label>
              <p class="control">
                <input class="input" type="password" placeholder="●●●●●●●">
              </p>
              <hr>
              <p class="control">
                <button class="button is-primary">Sign In</button>
              </p>
            </div>
            <div class="box">
              <a class="button is-danger is-social">Sign in with Google</a>
            </div>
            <p class="has-text-centered">
              <a href="#/register">Sign Up</a>
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
  name: 'login',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.label {
  margin-top: 8px;
}
.is-social {
  width: 100%;
  margin: 4px 0;
}
</style>
