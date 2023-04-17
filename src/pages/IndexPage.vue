<template>
  <q-page padding>
    <q-btn label="Crear link" color="primary q-ml-md" @click="userStore.createLink" />
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
import { useUserStore } from "src/stores/user-store";

const userStore = useUserStore();

const createLink = async () => {
  try {
    const res = await api({
      method: 'POST',
      url: '/links',
      headers: {
        'Authorization': 'Bearer ' + token.value
      },
      data: {
        longLink: 'https://axios-http.com/docs/req_config'
      }
    });

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
</script>
