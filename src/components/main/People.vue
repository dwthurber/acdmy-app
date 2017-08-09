<template>
  <div>
    <nav class="level is-mobile">
      <div class="level-left">
        <h1 class="title level-item">
          Manage People
        </h1>
      </div>
      <div class="level-right">
        <button class="button level-item is-primary is-outlined"><b-icon icon="add" size="is-small"></b-icon> &nbsp; Add People</button>
      </div>
    </nav>

    <b-tabs v-model="activeTab">
      <b-tab-item label="People">
        <br>
        <b-table
          :data="users"
          :bordered="isBordered"
          :striped="isStriped"
          :narrowed="isNarrowed"
          :checkable="isCheckable"
          :loading="isLoading"
          :mobile-cards="hasMobileCards"
          :paginated="isPaginated"
          :per-page="perPage"
          :pagination-simple="isPaginationSimple"
          default-sort="name"
          :selected.sync="selected"
          :isDetailed="isDetailed"
          :checked-rows.sync="checkedRows">

          <template scope="props">
            <b-table-column field="profile_picture" label="" width="40">
              <img class="is-circle-image image" :src="props.row.profile_picture">
            </b-table-column>
            <b-table-column field="name" label="Name" sortable>
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="status" label="Status" sortable centered>
              <span class="tag is-success">
                Online
              </span>
            </b-table-column>
            <b-table-column field="role" label="Role" sortable>
              {{ props.row.role }}
            </b-table-column>

          </template>

          <template slot="detail" scope="props">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img src="static/img/placeholder-128x128.png">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ props.row.user.first_name }} {{ props.row.user.last_name }}</strong>
                    <small>@{{ props.row.user.first_name }}</small>
                    <small>31m</small>
                    <br>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
                    Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                  </p>
                </div>
              </div>
            </article>
          </template>

          <div slot="empty" class="has-text-centered">
            No people... That's awefully lonely. Add one above.
          </div>
        </b-table>
      </b-tab-item>

      <b-tab-item label="Groups">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque vestibulum dui vel molestie egestas.
        Nulla vulputate elementum diam quis consectetur.
        Integer pulvinar laoreet nibh non faucibus.
        Suspendisse ut cursus lectus. Donec consectetur turpis at leo ultricies rhoncus.
        Cras consequat aliquet eros nec porta.
        Nullam sit amet mollis turpis.
        Aenean vitae tortor et velit sodales faucibus.
      </b-tab-item>

    </b-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard-People',
  computed: {
    ...mapState(['users'])
  },
  data () {
    return {
      activeTab: 0,
      checkedRows: [],
      selected: {},
      isBordered: false,
      isStriped: true,
      isNarrowed: false,
      isCheckable: false,
      isEmpty: false,
      isLoading: true,
      isDetailed: true,
      hasMobileCards: true,
      isPaginated: false,
      isPaginationSimple: false,
      perPage: 10
    }
  },
  mounted () {
    this.isLoading = false
  }
}
</script>

<style scoped>

</style>
