import { defineStore } from "pinia";

import { useApi } from "boot/axios";
import { useProject } from "boot/config";

const $api = useApi();

export const usePlayerStore = defineStore("player", {
  state: () => ({
    accessToken: "",
    refreshToken: "",

    id: 0,
    username: "Stacker",
    motto: "",
    region: 0,
    avatar: "",
    avatar_hash: "",
    avatar_frame: 0,
    permission: "Normal",
    email: "",
    phone: ""
  }),
  getters: {
    loggedIn() {
      return this.id > 0;
    },
    noToken() {
      return this.accessToken.length === 0 || this.refreshToken.length === 0;
    }
  },
  actions: {
    setToken(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },
    async check() {
      try {
        await $api.auth.check(this.accessToken);
      } catch (err) {
        if (err.hasOwnProperty("data") && err.data.hasOwnProperty("code")) {
          try {
            console.log("Refreshing tokens");
            const body = await $api.auth.refresh(this.refreshToken);
            this.accessToken = body.data.accessToken;
            this.refreshToken = body.data.refreshToken;
          } catch (refreshError) {
            this.logout();
          }
        } else {
          console.warn(err);
        }
      }
    },
    async update() {
      try {
        const data = (await $api.player.getInfo(this.accessToken)).data;
        this.id = data.id;
        this.username = data.username;
        this.motto = data.motto;
        this.region = data.region;
        if (this.avatar_hash !== data.avatar_hash) {
          console.log("Refreshing avatar");
          this.avatar = (await $api.player.getAvatar(this.accessToken)).data;
        }
        this.avatar_hash = data.avatar_hash;
        this.avatar_frame = data.avatar_frame;
        this.permission = data.permission;
        this.email = data.email;
        this.phone = data.phone;
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      this.accessToken = "";
      this.refreshToken = "";
      this.id = 0;
      this.username = "Stacker";
      this.motto = "";
      this.region = 0;
      this.avatar = "";
      this.avatar_hash = "";
      this.avatar_frame = 0;
      this.permission = "Normal";
      this.email = "";
      this.phone = "";
    }
  },
  persist: {
    key: `${useProject()}.player`
  }
});
