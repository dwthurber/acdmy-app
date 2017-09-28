<template>
  <section class="hero is-maxheight">
    <div class="hero-body box">
      <div class="container">
        <div class="columns is-multiline is-centered">
          <div class="column is-narrow has-text-centered">
            <h2 class="subtitle is-5 has-text-grey">
              Drag and Drop or Choose
            </h2>

            <hr>
            <div class="columns is-centered is-multiline">
              <div class="column is-4 has-text-centered">
                <a class="has-text-grey">
                  <b-icon icon="edit" size="is-medium"></b-icon>
                  <p class="is-size-7">Document</p>
                </a>
              </div>
              <div class="column is-4">
                <a class="has-text-grey">
                  <b-icon icon="folder" size="is-medium"></b-icon>
                  <p class="is-size-7">Asset</p>
                </a>
              </div>
              <div class="column is-4">
                <a class="has-text-grey">
                  <b-icon icon="question_answer" size="is-medium"></b-icon>
                  <p class="is-size-7">Chat</p>
                </a>
              </div>
              <div class="column is-4">
                <a class="has-text-grey">
                  <b-icon icon="poll" size="is-medium"></b-icon>
                  <p class="is-size-7">Poll</p>
                </a>
              </div>
              <div class="column is-4">
                <a class="has-text-grey">
                  <b-icon icon="picture_in_picture" size="is-medium"></b-icon>
                  <p class="is-size-7">Whiteboard</p>
                </a>
              </div>
              <div class="column is-4">
                <a class="has-text-grey">
                  <b-icon icon="screen_share" size="is-medium"></b-icon>
                  <p class="is-size-7">Screen Share</p>
                </a>
              </div>
              <!-- <div class="column is-3">
                <b-icon icon="extension" size="is-medium"></b-icon>
                <p class="is-size-7">Plugin</p>
              </div> -->
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
a.has-text-grey:hover {
  color: hsl(0, 0%, 71%)!important;
}
</style>
