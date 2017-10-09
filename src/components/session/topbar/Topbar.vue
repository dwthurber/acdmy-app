<template>
  <div class="topbar hero" :class="{'expanded': expanded}">
    <nav class="level is-marginless animated is-paddingless" v-if="expanded">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-4 has-text-primary">
            {{ room.data.name }} &nbsp;
            <small class="has-text-grey is-size-6">{{ session.name }}</small>
          </p>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <p class="level-item" v-if="option == 'profile'"><router-link class="button is-danger" :to="{name: 'Dashboard-Sessions', params: {roomid: route.params.roomid}}" append exact><b-icon icon="exit_to_app" /> &nbsp; Leave Session</router-link></p>
        <p class="level-item" v-if="option == 'people'"><a class="button is-primary">Start Groups</a></p>
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
    ...mapState(['session', 'room', 'route'])
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
.level {
  padding: 24px 12px 24px 0!important;
}
.expanded {
  /*padding: 20px 12px 20px 0;*/
  height: 74px;
}
.animated {
  position: relative;
  top: -96px;
  animation: slidein 0.6s forwards;
  /*animation: slideout 0.8s forwards;*/
}
@keyframes slidein {
  100% {
    top: 0;
  }
}
</style>
