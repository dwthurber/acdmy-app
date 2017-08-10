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
            <b-table-column field="role" label="Role" sortable>
              {{ props.row.role }}
            </b-table-column>
            <b-table-column field="online" label="Status" width="40" sortable centered>
              <span class="tag is-success" v-if="props.row.online">
                Online
              </span>
              <span class="tag is-grey" v-else>
                Offline
              </span>
            </b-table-column>
          </template>

          <div slot="empty" class="has-text-centered">
            Loading...
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
      isDetailed: false,
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
