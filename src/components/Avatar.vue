<template>
  <div draggable="true" class="image is-96x96" :style="{top: top + '%', left: left + '%'}">
    <img class="is-circle-image" :src="photoURL" alt="User Profile Image">
    <span class="tag is-primary">{{displayName}}</span>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: ['photoURL', 'displayName', 'top', 'left'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.image {
  position: absolute;
}
.image:hover {
  cursor:move;
}
.image:hover .tag {
  opacity: 0.9;
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
  /*width: 100%;*/
  bottom: 0;
  /*border-radius: 0 0 4px 4px;*/
  opacity: 0;
}
</style>
