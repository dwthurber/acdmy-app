<template>
  <section class="box is-maxheight is-paddingless">
    <div v-if="!full" class="columns is-maxheight is-marginless is-multiline is-centered">
      <div class="column is-narrow has-text-centered">
        <h2 class="subtitle is-5 has-text-grey">
          Drag and Drop or Choose
        </h2>

        <hr>
        <div class="columns is-centered is-multiline">
          <div class="column is-4">
            <a class="has-text-grey">
              <b-icon icon="edit" size="is-medium"></b-icon>
              <p class="is-size-7 is-uppercase">Collaboration</p>
            </a>
          </div>
          <div class="column is-4">
            <a class="has-text-grey">
              <b-icon icon="folder" size="is-medium"></b-icon>
              <p class="is-size-7 is-uppercase">Asset</p>
            </a>
          </div>
          <div class="column is-4">
            <a class="has-text-grey">
              <b-icon icon="question_answer" size="is-medium"></b-icon>
              <p class="is-size-7 is-uppercase">Chat</p>
            </a>
          </div>
          <div class="column is-4">
            <a class="has-text-grey">
              <b-icon icon="poll" size="is-medium"></b-icon>
              <p class="is-size-7 is-uppercase">Poll</p>
            </a>
          </div>
          <div class="column is-4">
            <a class="has-text-grey">
              <b-icon icon="picture_in_picture" size="is-medium"></b-icon>
              <p class="is-size-7 is-uppercase">Whiteboard</p>
            </a>
          </div>
          <div class="column is-4">
            <a class="has-text-grey">
              <b-icon icon="screen_share" size="is-medium"></b-icon>
              <p class="is-size-7 is-uppercase">Screen Share</p>
            </a>
          </div>
          <!-- <div class="column is-3">
            <b-icon icon="extension" size="is-medium"></b-icon>
            <p class="is-size-8">Plugin</p>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'block',
  props: {
    full: Boolean
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.columns.is-maxheight {
  justify-content: center;
  align-items: center;
}
.hero-body {
  align-items: center;
  display: flex
}
/*.is-size-8 {
  opacity: 0;
}
.box:hover .is-size-8 {
  opacity: 1;
}*/
</style>
