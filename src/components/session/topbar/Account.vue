<template>
  <nav class="level is-marginless animated">
    <!-- Left side -->
    <div class="level-left">
      <div class="level-item">
        <p class="subtitle is-5">
          {{ session.name }}
        </p>
      </div>
    </div>

    <!-- Right side -->
    <div class="level-right">
      <p class="level-item"><a class="button is-danger">End Session</a></p>
      <a class="level-item" @click="close()">
        <b-icon icon="close" size="is-medium" />
      </a>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'topbar',
  props: ['option', 'expanded'],
  computed: {
    ...mapState(['session'])
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('update:option', null)
      this.$emit('update:expanded', !this.expanded)
    }
  }
}
</script>

<style scoped>
.animated {
  padding: 20px 12px 20px 0;
  position: relative;
  top: -76px;
  animation: slidein 0.8s forwards;
  /*animation: slideout 0.8s forwards;*/
}
@keyframes slidein {
  100% {
    top: 0;
  }
}
</style>
