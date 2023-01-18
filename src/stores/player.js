import { defineStore } from "pinia";

import { ResultCode, useApi } from "boot/axios";
import { useProject } from "boot/config";

const $api = useApi();

export const usePlayerStore = defineStore("player", {
  state: () => ({
    accessToken: "",

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
      return this.accessToken.length === 0;
    },
    info() {
      return {
        username: this.username,
        motto: this.motto,
        region: this.region,
        avatar: this.avatar
      };
    }
  },
  actions: {
    async check() {
      try {
        const { code, data } = await $api.auth.check(this.accessToken);
        this.id = data.playerId;
        if (code === ResultCode.Continued) {
          this.accessToken = data.accessToken;
        }
      } catch (err) {
        this.logout();
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
