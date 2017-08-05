<template>
  <div class="columns is-mobile is-gapless">
    <aside class="column is-narrow aside hero is-fullheight">
      <b-menu>
        <b-menu-list>
          <router-link :to="{name: 'Dashboard'}" tag="li" exact append >
            <a><b-icon size="is-small" class="re-align" icon="home" />
              Home
            </a>
          </router-link>
          <router-link :to="{name: 'Dashboard-Classroom'}" tag="li" append exact>
            <a><b-icon size="is-small" class="re-align" icon="view_list" />
              Session
            </a>
          </router-link>
          <router-link :to="{name: 'Dashboard-Chat'}" tag="li" append exact>
            <a><b-icon size="is-small" class="re-align" icon="extension" />
              Activities
            </a>
          </router-link>
          <router-link :to="{name: 'Dashboard-Analytics'}" tag="li" exact append >
            <a><b-icon size="is-small" class="re-align" icon="people" />
              People
            </a>
          </router-link>
          <router-link :to="{name: 'Dashboard-Sessions'}" tag="li" append exact>
            <a><b-icon size="is-small" class="re-align" icon="folder" />
              Assets
            </a>
          </router-link>
          <router-link :to="{name: 'Dashboard-Assets'}" tag="li" append>
            <a><b-icon size="is-small" class="re-align" icon="settings" />
              Settings
            </a>
          </router-link>
        </b-menu-list>
      </b-menu>
    </aside>
    <div class="column admin-panel">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.aside {
  background-color: #fcfcfc;
  padding: 12px 0!important;
  position: fixed;
}
.router-link-active {
  border-left: 3px solid hsl(205, 36%, 43%);
  background-color: hsl(0, 0%, 96%);
}
.router-link-active a {
  font-weight: bolder;
  color: hsl(205, 36%, 43%);
}
</style>
