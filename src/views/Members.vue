<template>
  <div class="members">
    <p class="mb-4">1 of 2 members counts towards your pricing plan <b-icon icon="exclamation-circle-fill" variant="secondary" v-b-tooltip.hover  title="Viewers don't count towards your Team of 10 (Premium) plan"></b-icon> </p>

    <members-filter></members-filter>
    <members-list :members="members" :totalMembers="totalMembers"></members-list>
  </div>
</template>

<script>
import MembersFilter from '@/components/members/MembersFilter'
import MembersList from '@/components/members/MembersList'
import { mapActions } from 'vuex'
import { FETCH_MEMBERS } from '@/store/cosnts/consts'

export default {
  name: 'Members',
  components: {
    MembersFilter,
    MembersList
  },
  mounted () {
    this.fetchMembers()
  },
  methods: {
    ...mapActions({
      fetchMembers: FETCH_MEMBERS
    })
  },
  computed: {
    members: {
      get () {
        return this.$store.getters.membersList
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

<style lang="scss"></style>
