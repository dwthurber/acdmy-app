<template>
  <input v-if="imageOnly" :data-preview-step="preview" type="hidden" data-images-only :data-crop="crop" :data-image-shrink="shrink">
  <input v-else :data-preview-step="preview" type="hidden">
</template>

<script>
import uploadcare from 'uploadcare-widget'

export default {
  props: {
    url: {
      required: true
    },
    preview: Boolean,
    imageOnly: Boolean,
    crop: String,
    shrink: String
  },
  data () {
    return {
      uploadcareUrl: '',
      widget: ''
    }
  },
  mounted () {
    this.initWidget()
  },
  watch: {
    uploadcareUrl () {
      this.updatePropUrl()
    },
    url () {
      this.updateWidgetValue()
    }
  },
  methods: {
    initWidget () {
      this.widget = uploadcare.Widget(this.$el)
      this.updateWidgetValue()
      this.widget.onUploadComplete((info) => {
        this.uploadcareUrl = info.cdnUrl
      })
    },

    updatePropUrl () {
      this.$emit('update:url', this.uploadcareUrl)
    },
    updateWidgetValue () {
      this.widget && this.widget.value(this.url)
    }
  }
}
</script>

<style>
.uploadcare--widget__button {
  font-weight: 300;
}
.uploadcare--widget__button:hover {
  font-weight: 300;
  cursor: pointer;
}
.uploadcare--widget__button_type_open {
  background: hsl(205, 36%, 43%);
}
.uploadcare--widget__button_type_open:hover {
  background: #426d8c;
}
</style>
