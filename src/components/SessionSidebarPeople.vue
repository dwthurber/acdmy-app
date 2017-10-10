<template>
  <div>
    <!-- <nav class="level">
      <div class="level-left">
        <b-icon class="level-item" icon="people" size="is-medium"></b-icon>
        <p class="level-item subtitle is-5">
          <span>People</span>
        </p>
      </div>
    </nav> -->
    <b-tabs
      size="is-small"
      type="is-toggle"
      expanded>
      <b-tab-item label="People">
        <article
          class="media"
          v-for="person in room.people">
          <figure class="media-left">
            <p class="image is-24x24">
              <img class="is-circle-image" :src="person.profile_picture">
            </p>
          </figure>
          <div class="media-content">
            {{person.name}}
          </div>
          <div class="media-right">
            <b-icon
              icon="cloud"
              size="is-small"
              type="is-light"
              :class="{'is-success': person.online}" />
          </div>
        </article>
      </b-tab-item>
      <b-tab-item label="Groups">
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>Lorem ipsum dolar sit amet</p>
        <p>End</p>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SessionSidebarPeople',
  computed: {
    ...mapState([
      'room'
    ])
  }
}
</script>

<style scoped>

</style>
