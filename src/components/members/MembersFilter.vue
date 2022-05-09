<template>
<div class="d-flex justify-content-between">

  <b-form @submit="event.preventDefault()" inline>
      <b-form-group
        label="ROLE"
        class="mb-3 mr-sm-3 mb-sm-0"
      >
        <b-form-select
          :options="[{ text: 'All Roles', value: '' }, 'Owner', 'Viewer', 'Editor']"
          v-model="filters.role"
          :value="filters.role"
          @change="$emit('filters', { filters })"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        label="TIME TRACKING"
      >
        <b-form-select
          :options="[{ text: 'Enabled', value: 'enabled' },{ text: 'Disable', value: 'disabled' }]"
          v-model="filters.timeTrack"
          :value="filters.timeTrack"
          @change="$emit('filters', { filters })"
        ></b-form-select>
      </b-form-group>
  </b-form>

  <b-button variant="primary" class="align-self-end" @click="console.log(':::not implemented')"> Invite member </b-button>
</div>
</template>

<script>
export default {
  name: 'MembersFilter',
  data () {
    return {
      filters: {
        role: '',
        timeTrack: 'enabled'
      }
    }
  }
}
</script>

<style scoped>

</style>
