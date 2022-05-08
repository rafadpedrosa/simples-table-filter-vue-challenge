<template>
  <div class="home">
    <!-- ::: I'll not over think this. I would/could probably use routers or a code calling a method to change this name dynamically but I would like to keep it simple and explain during next interview if needed. -->
    <h1 class="pb-3 mx-3"> Members </h1>
    <!-- Your implementation should start here -->
    <b-tabs class="mx-3"  content-class="mt-3">
      <template #tabs-end>
        <li class="nav-item tab-input-filter pr-3">
          <b-input-group size="sm" >
            <b-input-group-prepend is-text>
              <b-icon icon="search" font-scale="1.5"></b-icon>
            </b-input-group-prepend>
            <b-form-input type="search" placeholder="Search members"></b-form-input>
          </b-input-group>
        </li>
      </template>

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
