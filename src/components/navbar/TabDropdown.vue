<template>
  <div class="modal is-active" v-if="isActive">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-dropdown',
  props: {
    isActive: Boolean,
    content: String
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.modal {
  top: 53px;
}
.modal-background {
  background-color: rgba(10, 10, 10, 0.14);
}
.modal-card {
  position: absolute;
  top: 0;
  border-radius: 0 0 5px 5px;
  box-shadow: 1px 1px 5px 1px #bbb;
  height: 350px;
  text-align: left;
}
.modal-card-body {
  /*padding: 0;*/
}
@media screen and (min-width: 769px) {
  .modal-card {
    width: 760px;
  }
}
</style>
