<template>
  <div class="private-layout container-fluid">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'PrivateLayout'
}
</script>

<style lang="scss" scoped>
  .private-layout {
    padding-top: 3rem;
  }
</style>
