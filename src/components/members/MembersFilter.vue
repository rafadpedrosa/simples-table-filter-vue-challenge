<template>
<div class="d-flex justify-content-between">
  <b-form @submit="event.preventDefault()" inline>
      <b-form-group
        label="ROLE"
        class="mb-3 mr-sm-3 mb-sm-0"
      >
        <b-form-select
          :options="[{ text: 'All Roles', value: 'All' }, 'Owner', 'Viewer', 'Editor']"
          :value="'All'"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        label="TIME TRACKING"
      >
        <b-form-select
          :options="[{ text: 'Enabled', value: true },{ text: 'Enabled', value: false }]"
          :value="true"
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
      form: {
        role: '',
        timeTrack: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
