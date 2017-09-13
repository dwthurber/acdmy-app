<template>
  <section class="hero is-maxheight">
    <div class="hero-body box">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half has-text-centered">
            <h2 class="subtitle is-5">
              Drag and Drop or Choose
            </h2>

            <hr>
            <div class="columns is-centered is-mobile is-multiline">
              <div class="column is-2">
                <b-icon icon="question_answer" size="is-medium"></b-icon>
                <p class="is-size-7">Collaboration</p>
              </div>
              <div class="column is-2">
                <b-icon icon="folder" size="is-medium"></b-icon>
                <p class="is-size-7">Asset</p>
              </div>
              <div class="column is-2">
                <b-icon icon="videocam" size="is-medium"></b-icon>
                <p class="is-size-7">Video</p>
              </div>
              <div class="column is-2">
                <b-icon icon="poll" size="is-medium"></b-icon>
                <p class="is-size-7">Poll</p>
              </div>
              <div class="column is-2">
                <b-icon icon="picture_in_picture" size="is-medium"></b-icon>
                <p class="is-size-7">Whiteboard</p>
              </div>
              <div class="column is-2">
                <b-icon icon="screen_share" size="is-medium"></b-icon>
                <p class="is-size-7">Screen Share</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'block',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.hero.is-maxheight {
  /*padding-top: 53px;*/
}
.hero.is-maxheight .hero-body {
  align-items: center;
  display: flex
}
</style>
