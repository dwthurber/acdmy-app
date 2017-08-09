<template>
  <section class="hero">
    <div class="hero-body" id="container"></div>
  </section>
</template>

<script>
import Konva from 'konva'
import { roomsRef, roomsUsersRef } from '@/firebase'
import { mapState } from 'vuex'

export default {
  name: 'Classroom',
  components: {

  },
  computed: {
    ...mapState(['users'])
  },
  mounted () {
    this.$store.dispatch('setCurrentRoom', roomsRef.child(this.$route.params.roomid))
    this.$store.dispatch('setUsers', roomsUsersRef.child(this.$route.params.roomid))
    var width = window.innerWidth - 32
    var height = window.innerHeight - 89
    var stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    })
    var layer = new Konva.Layer()
    stage.add(layer)
    var tempLayer = new Konva.Layer()
    stage.add(tempLayer)
    var text = new Konva.Text({
      fill: 'black'
    })
    layer.add(text)
    var star
    for (var i = 0; i < 10; i++) {
      star = new Konva.Star({
        x: stage.width() * Math.random(),
        y: stage.height() * Math.random(),
        fill: 'blue',
        numPoints: 10,
        innerRadius: 20,
        outerRadius: 25,
        draggable: true,
        name: 'star ' + i
      })
      layer.add(star)
    }
    layer.draw()
    stage.on('dragstart', function (e) {
      e.target.moveTo(tempLayer)
      text.text('Moving ' + e.target.name())
      layer.draw()
    })
    var previousShape
    stage.on('dragmove', function (evt) {
      var pos = stage.getPointerPosition()
      var shape = layer.getIntersection(pos)
      if (previousShape && shape) {
        if (previousShape !== shape) {
          // leave from old targer
          previousShape.fire('dragleave', {
            type: 'dragleave',
            target: previousShape,
            evt: evt.evt
          }, true)
          // enter new targer
          shape.fire('dragenter', {
            type: 'dragenter',
            target: shape,
            evt: evt.evt
          }, true)
          previousShape = shape
        } else {
          previousShape.fire('dragover', {
            type: 'dragover',
            target: previousShape,
            evt: evt.evt
          }, true)
        }
      } else if (!previousShape && shape) {
        previousShape = shape
        shape.fire('dragenter', {
          type: 'dragenter',
          target: shape,
          evt: evt.evt
        }, true)
      } else if (previousShape && !shape) {
        previousShape.fire('dragleave', {
          type: 'dragleave',
          target: previousShape,
          evt: evt.evt
        }, true)
        previousShape = undefined
      }
    })
    stage.on('dragend', function (e) {
      var pos = stage.getPointerPosition()
      var shape = layer.getIntersection(pos)
      if (shape) {
        previousShape.fire('drop', {
          type: 'drop',
          target: previousShape,
          evt: e.evt
        }, true)
      }
      previousShape = undefined
      e.target.moveTo(layer)
      layer.draw()
      tempLayer.draw()
    })
    stage.on('dragenter', function (e) {
      e.target.fill('green')
      text.text('dragenter ' + e.target.name())
      layer.draw()
    })
    stage.on('dragleave', function (e) {
      e.target.fill('blue')
      text.text('dragleave ' + e.target.name())
      layer.draw()
    })
    stage.on('dragover', function (e) {
      text.text('dragover ' + e.target.name())
      layer.draw()
    })
    stage.on('drop', function (e) {
      e.target.fill('red')
      text.text('drop ' + e.target.name())
      layer.draw()
    })
  },
  methods: {
    randomNumber: function () {
      return Math.floor(Math.random() * 90)
    },
    checkOffset: function (evt) {
      var offset = this.offset()
      var xPos = offset.left
      var yPos = offset.top
      console.log(xPos, yPos)
    }
  },
  data () {
    return {
      offest: null
    }
  }
}
</script>

<style scoped>
.hero {
  position: fixed;
  top: 0;
  left: 0;
}
.hero-body {
  padding: 73px 16px 16px 16px!important;
}
/*.hero {
  margin-top: -57px;
}*/
/*.hero-body {
  position: relative;
}
.is-avatar {
  border-radius: 50%;
  overflow: hidden
}
.image {
  position: absolute;
}
.is-avatar:hover .tag {
  opacity: 0.8;
  transition-duration: 0.2s;
  cursor: move;
}
.tag {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 100%;
  border-radius: 0;
  opacity: 0;
  transition-duration: 0.5s;
  overflow: ellipse;
}
.add-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 200px;
  width: 200px;
  margin-top: -100px;
  margin-left: -100px;
  border: 1px dotted hsl(205, 36%, 43%);
  border-radius: 50%;
}
.add-circle .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -16px;
  margin-left: -16px;
}*/
</style>
