<template>
  <div class="home">
    <!-- ::: I'll not over think this. I would/could probably use routers or a code calling a method to change this name dynamically but I would like to keep it simple and explain during next interview if needed. -->
    <h1 class="pb-3 mx-3"> Members </h1>
    <!-- Your implementation should start here -->
    <b-tabs class="mx-3"  content-class="mt-3">
      <b-tab title="MEMBERS" title-link-class="tab-title" active lazy>
        <members></members>
      </b-tab>
      <b-tab title="INVITES" title-link-class="tab-title" disabled lazy>
        <invites></invites>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Members from '@/components/members/Members'
import Invites from '@/components/Invites'

export default {
  components: {
    Members,
    Invites
  },
  name: 'Home'
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

</style>
