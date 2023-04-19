import { defineStore }from 'pinia';
import { ref } from 'vue';
import { api } from "src/boot/axios";

export const useUserStore = defineStore('user', () => {
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async () => {
    try {
      let res = await api.post("/auth/login", {
        email: "test@test.com",
        password: "1231234",
      });

      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem('user', 'pato al AGUAAAAAAAAAAAAAAAAAAA');
      setTime();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout")
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      sessionStorage.removeItem("user");
    }
  };

  const setTime = () => {
    setTimeout(() => {
      refreshToken();
      console.log('refrescado');
    }, expiresIn.value * 1000 - 6000)
  };

  const refreshToken = async () => {
    console.log("refresh token");
    try {
      const res = await api.get("/auth/refresh");
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem('user', 'pato al AGUAAAAAAAAAAAAAAAAAAA');
      setTime();
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem('user');
    }
  };

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  };


  return {
    token,
    expiresIn,
    access,
    setTime,
    refreshToken,
    logout,
  };
});
