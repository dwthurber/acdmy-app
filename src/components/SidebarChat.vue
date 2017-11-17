<template>
  <b-dropdown
    class="is-marginless has-text-left is-right-top">
    <a
      class="navbar-item is-close"
      slot="trigger"
      title="chat">
      <b-icon
        icon="chat"
        :class="{'is-small': fullscreen}" />
    </a>

    <b-dropdown-item custom class="is-wide-dropdown">
      <div class="columns is-mobile">
        <div class="column is-narrow">
          <aside class="menu">
            <p class="menu-label">
              Channels
            </p>
            <ul class="menu-list">
              <li><a>General</a></li>
            </ul>
            <p class="menu-label">
              Personal
            </p>
            <ul class="menu-list">
            </ul>
          </aside>
        </div>
        <div class="column">
          <div class="hero is-medium">
            <div class="hero-body">
              <div class="media-wrapper">
                <article class="media ">
                  <figure class="media-left">
                    <p class="image is-64x64">
                      <img src="https://bulma.io/images/placeholders/128x128.png">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>Barbara Middleton</strong>
                        <br>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
                        <br>
                        <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
                      </p>
                    </div>

                    <article class="media">
                      <figure class="media-left">
                        <p class="image is-48x48">
                          <img src="https://bulma.io/images/placeholders/96x96.png">
                        </p>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>Sean Brown</strong>
                            <br>
                            Donec sollicitudin urna eget eros malesuada sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam blandit nisl a nulla sagittis, a lobortis leo feugiat.
                            <br>
                            <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                          </p>
                        </div>

                        <article class="media">
                          Vivamus quis semper metus, non tincidunt dolor. Vivamus in mi eu lorem cursus ullamcorper sit amet nec massa.
                        </article>

                        <article class="media">
                          Morbi vitae diam et purus tincidunt porttitor vel vitae augue. Praesent malesuada metus sed pharetra euismod. Cras tellus odio, tincidunt iaculis diam non, porta aliquet tortor.
                        </article>
                      </div>
                    </article>
                  </div>
                </article>
              </div>
            </div>
            <div class="hero-end">
              <b-field>
                <b-input
                  expanded
                  v-model="message"
                  icon="send"
                  placeholder="Type message...">
                </b-input>
                <p class="control">
                  <button class="button">Post</button>
                </p>
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'SidebarChat',
  props: {
    fullscreen: Boolean
  },
  data () {
    return {
      message: null
    }
  }
}
</script>

<style scoped>
.is-wide-dropdown {
  width: 40vw;
  /*height: 60vh;*/
}
.column {
  height: 100%;
  /*overflow: scroll;*/
}
.menu {
  height: 450px;
  overflow: scroll;
}
.hero-body {
  overflow: scroll;
  height: 386px;
  margin: 1.5rem 0;
  padding: 0!important;
}
.is-medium {
  height: 450px;
  justify-content: flex-end;
}
.media-wrapper {
  height: 386px;
}
</style>
