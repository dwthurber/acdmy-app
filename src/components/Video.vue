<template>
  <div class="column is-1">
    <div class="box is-paddingless" :id="'video' + user.id">
      <b-icon title="feature user" class="is-success is-hand" icon="pan_tool" v-if="user.hand"></b-icon>
      <span class="tag is-primary">{{user.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'videoContainer',
  props: ['user'],
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>
.box {
  height: 100px;
  position: relative;
}
.box:hover {
  cursor:move;
}
.is-hand {
  position: absolute;
  right: 4px;
  top: 4px;
}
.is-hand:hover {
  cursor:pointer;
}
.tag {
  position: absolute;
  width: 100%;
  bottom: 0;
  border-radius: 0 0 4px 4px;
  opacity: 0.9;
}
</style>
