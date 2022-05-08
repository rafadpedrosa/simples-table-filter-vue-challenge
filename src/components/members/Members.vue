<template>
  <div class="members">
    <p class="mb-4">1 of 2 members counts towards your pricing plan <b-icon icon="exclamation-circle-fill" variant="secondary" v-b-tooltip.hover  title="Viewers don't count towards your Team of 10 (Premium) plan"></b-icon> </p>

    <members-filter></members-filter>

  </div>
</template>

<script>
import MembersFilter from '@/components/members/MembersFilter'

export default {
  name: 'Members',
  components: {
    MembersFilter
  }

}
</script>

<style lang="scss">

</style>
