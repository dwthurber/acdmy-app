<template>
  <div v-if="user !== false">
    <b-loading :active.sync="isLoading" :canCancel="false"></b-loading>
    <div class="columns">
      <aside class="column is-2 aside is-primary hero is-fullheight is-hidden-mobile">
        <div>
          <div class="main">
            <div class="title">Main</div>
            <a href="#" class="item active"><span class="icon"><i class="fa fa-home"></i></span><span class="name">Dashboard</span></a>
            <a href="#" class="item"><span class="icon"><i class="fa fa-map-marker"></i></span><span class="name">Activity</span></a>
            <a href="#" class="item"><span class="icon"><i class="fa fa-th-list"></i></span><span class="name">Timeline</span></a>
            <a href="#" class="item"><span class="icon"><i class="fa fa-folder-o"></i></span><span class="name">Folders</span></a>
          </div>
        </div>
      </aside>
      <div class="column admin-panel">
        <nav class="nav has-shadow" id="top">
          <div class="container">
            <div class="nav-left">
              <a class="nav-item" href="../index.html">
                <img src="../assets/acdmyA.png" alt="Description">
              </a>
            </div>
            <span class="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <div class="nav-right nav-menu is-hidden-tablet">
              <a href="#" class="nav-item is-active">
                Dashboard
              </a>
              <a href="#" class="nav-item">
                Activity
              </a>
              <a href="#" class="nav-item">
                Timeline
              </a>
              <a href="#" class="nav-item">
                Folders
              </a>
            </div>
          </div>
        </nav>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: { },
  name: 'dashboard',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      isLoading: true
    }
  },
  mounted () {
    this.isLoading = false
  }
}
</script>

<style scoped>
.aside {
  margin-right: -10px;
}
.aside .main {
  padding: 40px;
}
.aside .title {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
.aside .main .item {
  display: block;
  padding: 10px 0;
}
.aside .main .icon {
  font-size: 19px;
  padding-right: 30px;
}
.aside .main .name {
  font-size: 16px;
  font-weight: bold;
}
.admin-panel {
  padding-bottom: 0;
}
.content {
  display: block;
  background-color: #fff;
  padding: 40px 20px;
}
.hero .tabs ul {
    border-bottom: 1px solid #d3d6db;
}
</style>
