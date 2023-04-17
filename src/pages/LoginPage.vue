<template>
  <q-page>
    <h3>Login {{ token }}</h3>
  </q-page>
</template>

<script setup>
import {useUserStore} from '../stores/user-store'

const { token } = useUserStore();

</script>

<style lang="scss"></style>
