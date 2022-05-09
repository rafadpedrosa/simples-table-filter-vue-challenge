<template>
  <div class="home">
    <!-- ::: I'll not over think this exercise. I would/could probably use routers or a code calling a method to change this name 'Members' dynamically but I would like to keep it simple and explain during next interview only if needed. -->
    <h1 class="pb-3 mx-3"> Members </h1>
    <!-- Your implementation should start here -->

    <b-tabs class="mx-3"  content-class="mt-3">
      <template #tabs-end>
        <li class="nav-item tab-input-filter pr-3">
          <b-input-group size="sm" >
            <b-input-group-prepend is-text>
              <b-icon icon="search" font-scale="1.5"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="search" v-model="search" placeholder="Search members"></b-form-input>
          </b-input-group>
        </li>
      </template>

      <b-tab title="MEMBERS" title-link-class="tab-title" active lazy>
        <div class="members">
          <p class="mb-4">1 of 2 members counts towards your pricing plan <b-icon icon="exclamation-circle-fill" variant="secondary" v-b-tooltip.hover  title="Viewers don't count towards your Team of 10 (Premium) plan"></b-icon> </p>

          <members-filter @filters="setFilters"></members-filter>
          <members-list :members="members" :totalMembers="totalMembers"></members-list>

        </div>
      </b-tab>

      <b-tab title="INVITES" title-link-class="tab-title" disabled lazy>
        <invites></invites>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import MembersFilter from '@/components/members/MembersFilter'
import MembersList from '@/components/members/MembersList'
import { mapActions } from 'vuex'
import { FETCH_MEMBERS } from '@/store/cosnts/consts'
import _ from 'lodash'
import Invites from '@/components/Invites'

export default {
  components: {
    MembersFilter,
    MembersList,
    Invites
  },
  name: 'Home',
  data () {
    return { search: '', filters: {} }
  },
  mounted () {
    this.fetchMembers()
  },
  watch: {
    search (search) {
      debugger
      this.setFilters({ filters: { search } })
    }
  },
  methods: {
    ...mapActions({
      fetchMembers: FETCH_MEMBERS
    }),
    setFilters: _.debounce(function (data) {
      debugger
      const { filters } = data
      this.filters = { ...this.filters, ...filters }
    }, 700),
    bySearchText (member) {
      const { search = '' } = this.filters

      return !search || member.name.toUpperCase().includes(search.toUpperCase())
    },
    byTimeTracking (member) {
      const { timeTrack = '' } = this.filters

      return !timeTrack || member.time_tracking.toUpperCase().includes(timeTrack.toUpperCase())
    },
    byRoles (member) {
      const { role = '' } = this.filters

      return !role || member.role.toUpperCase().includes(role.toUpperCase())
    }
  },
  computed: {
    hasFilter () {
      return !_.isEmpty(this.filters)
    },
    membersFiltered () {
      return this.$store.getters.membersList
        .filter(this.byRoles)
        .filter(this.bySearchText)
        .filter(this.byTimeTracking) || []
    },
    members: {
      get () {
        return this.hasFilter ? this.membersFiltered : this.$store.getters.membersList.map(_.cloneDeep)
      }
    },
    totalMembers: {
      get () {
        return this.$store.state.totalMembers
      }
    }
  }
}
</script>

<style lang="scss">
ul.nav.nav-tabs {
  border: 0;
}

ul.nav > li.nav-item {
  .tab-title {
    border: none;
    border-radius: 0;
    border-bottom: 2px solid $gray-300;
  }
  .tab-title.active {
    color: $primary;
    font-weight: bold;
    border-color: $primary;
    border-bottom: 3px solid $primary;
    padding-bottom: 6px;
  }
}

.tab-input-filter {
  position: absolute;
  right: 0;
  border-radius: 1rem;

  .input-group {
    .input-group-prepend {
      .input-group-text {
        border-radius: 5rem 0 0 5rem;
        background-color: white;
        padding-left: 1rem;
      }
    }

    input {
      border-left: none;
      border-radius: 5rem;
      width: 20rem;
    }
  }
}
</style>
