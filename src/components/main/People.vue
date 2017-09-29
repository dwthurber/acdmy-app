<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <h2 class="subtitle is-3 level-item">
          Manage People
        </h2>
      </div>
      <div class="level-right" v-show="room.user.role == 'Instructor'">
        <button class="button level-item is-primary is-outlined" @click="prompt"><b-icon icon="person_add" size="is-small"></b-icon> &nbsp; Add People</button>
      </div>
    </nav>
    <div class="box">

      <b-tabs v-model="activeTab">
        <b-tab-item label="People">
          <br>
          <b-table
            :data="room.people"
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
            :isDetailed="isDetailed"
            :checked-rows.sync="checkedRows">

            <template scope="props">
              <b-table-column field="profile_picture" label="" width="60" centered>
                <img v-if="props.row.profile_picture" class="is-circle-image image is-32x32" :src="props.row.profile_picture">
                <img v-else class="is-circle-image image is-32x32" src="../../assets/user-placeholder.png" alt="Profile Image">
              </b-table-column>
              <b-table-column field="name" label="Name" sortable>
                {{ props.row.name }}
              </b-table-column>
              <b-table-column field="role" label="Role" sortable>
                {{ props.row.role }}
              </b-table-column>
              <b-table-column field="online" label="Status" width="90" sortable>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard-People',
  computed: {
    ...mapState(['room'])
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
  methods: {
    prompt () {
      let url = 'https://localhost:8080/#/signup?room=' + this.room.data.id
      console.log(url)
      this.$dialog.prompt({
        message: `Copy this link and send to anyone to invite them`,
        inputType: 'url',
        inputPlaceholder: url,
        onConfirm: () => {
        }
      })
    }
  },
  mounted () {
    this.isLoading = false
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .level-right .button {
    margin: 0 auto;
  }
}
</style>
