<template>
  <span class="status" :class="{ 'is-online': isOnline == true }"></span>
</template>

<script>
export default {
  name: 'StatusIndicator',
  props: ['is-online']
}
</script>

<style scoped>
.status {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 12px;
  border-radius: 50%;
  background-color: hsl(0, 0%, 71%);
}
.status.is-online {
  background-color: hsl(141, 71%, 48%);
}
</style>
