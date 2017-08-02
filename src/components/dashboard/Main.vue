<template>
  <div>
    <section class="hero is-small">

      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Admin Dashboard
          </h1>
          <h2 class="subtitle">
            A simple admin template
          </h2>
        </div>
      </div>
    </section>
    <section>
      <div class="container is-fluid">
        <div class="columns">
          <div class="column is-one-third">
            <nav class="panel">
              <p class="panel-heading">
                People
              </p>
              <div class="panel-block">
                <b-field>
                  <b-input placeholder="Search..."
                      type="search"
                      icon="search"
                      expanded>
                  </b-input>
                </b-field>
              </div>
              <p class="panel-tabs">
                <a class="is-active">all</a>
                <a>teachers</a>
                <a>students</a>
              </p>
              <a v-for="user in users" class="panel-block" :key="user.displayName">
                <StatusIndicator :is-online="user.online" /> {{ user.displayName }} <small class="is-role has-text-grey is-size-7"> {{ user.role }}</small>
                <div class="block is-right" :class="{ 'is-online': user.online == true }">
                  <b-icon icon="question_answer" size="is-small" type="is-grey"></b-icon>
                  <b-icon icon="videocam" size="is-small" type="is-grey"></b-icon>
                </div>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StatusIndicator from '@/components/StatusIndicator'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard-Main',
  components: { StatusIndicator },
  computed: {
    ...mapGetters(['users'])
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.is-right {
  margin-left: auto;
}
.is-online .icon {
  color: hsl(0, 0%, 29%)!important;
}
.is-online .icon:hover {
  color: hsl(205, 36%, 43%)!important;
}
.is-role {
  margin-left: 4px;
  text-transform: uppercase;
}
</style>
