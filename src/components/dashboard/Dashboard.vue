<template>
  <div class="container is-fluid">
    <div class="columns is-mobile">
      <aside class="column is-narrow aside">
        <b-menu>
          <b-menu-list>
            <router-link :to="{name: 'Dashboard'}" tag="li" exact append >
              <a><b-icon class="re-align" icon="home" />
                <span class="is-hidden-touch">Home</span>
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-Sessions'}" tag="li" append exact>
              <a><b-icon class="re-align" icon="view_list" />
                <span class="is-hidden-touch">Sessions</span>
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-Activities'}" tag="li" append exact>
              <a><b-icon class="re-align" icon="extension" />
                <span class="is-hidden-touch">Activities</span>
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-People'}" tag="li" exact append >
              <a><b-icon class="re-align" icon="people" />
                <span class="is-hidden-touch">People</span>
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-Assets'}" tag="li" append exact>
              <a><b-icon class="re-align" icon="folder" />
                <span class="is-hidden-touch">Assets</span>
              </a>
            </router-link>
            <router-link :to="{name: 'Dashboard-Settings'}" tag="li" append exact>
              <a><b-icon class="re-align" icon="settings" />
                <span class="is-hidden-touch">Settings</span>
              </a>
            </router-link>
          </b-menu-list>
        </b-menu>
      </aside>
      <div class="column admin-panel">
        <router-view></router-view>
      </div>
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
  /*padding: 32px;*/
  position: fixed;
}
.router-link-active {
  /*border-left: 3px solid hsl(205, 36%, 43%);
  background-color: hsl(0, 0%, 96%);*/
}
.router-link-active a {
  font-weight: bolder;
  color: hsl(205, 36%, 43%);
}
</style>
