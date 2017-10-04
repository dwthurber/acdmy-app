<template>
  <div class="topbar hero" :class="{'expanded': expanded}">
    <nav class="level is-marginless animated" v-if="expanded">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item" v-if="option == 'profile'">
          <p class="title is-5 has-text-primary">
            {{ session.name }}
          </p>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <p class="level-item" v-if="option == 'profile'"><a class="button is-danger">End Session</a></p>
        <p class="level-item" v-if="option == 'people'"><a class="button is-primary is-small is-outlined"><b-icon class="" icon="shuffle" size="is-small"></b-icon> &nbsp; Start Random Groups</a></p>
        <a class="level-item" @click="close()">
          <b-icon icon="close" size="is-medium" />
        </a>
      </div>
    </nav>
  </div>
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
.topbar {
  height: 0;
  padding: 0;
  transition: height 0.6s;
}
.expanded {
  /*padding: 20px 12px 20px 0;*/
  height: 76px;
}
.animated {
  padding: 20px 12px 20px 0;
  position: relative;
  top: -76px;
  animation: slidein 0.6s forwards;
  /*animation: slideout 0.8s forwards;*/
}
@keyframes slidein {
  100% {
    top: 0;
  }
}
</style>
