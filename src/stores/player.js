import {defineStore} from "pinia";

import {useApi} from "boot/axios";
import {useProject} from "boot/config";

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
    avatarHash: "",
    avatar_frame: 0,
    clan: 0,
    permission: "Normal",
    email: ""
  }),

  actions: {
    setToken(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
    },
    async check() {
      try {
        await $api.auth.check(this.accessToken);
      } catch (err) {
        if (err.hasOwnProperty('data') && err.data.hasOwnProperty('code')) {
          try {
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
        console.log(data);
        this.id = data.id;
        this.permission = data.permission;
        this.username = data.username;
        this.motto = data.motto;
        this.region = data.region;
        if (this.avatar_hash !== data.avatar_hash) {
          this.avatar = (await $api.user.getAvatar(this.accessToken)).data;
        }
        this.avatar_hash = data.avatar_hash;
        this.email = data.email;
        this.phone = data.phone;
        this.statistics = data.statistics;

        const {following, followers} = (await $api.user.follow(this.accessToken)).data;
        this.following = following;
        this.followers = followers;

        const {data: starredData, collection: starredCollections} = (await $api.user.starred(this.accessToken)).data;
        this.starredData = starredData;
        this.starredCollections = starredCollections;
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
      this.avatarHash = "";
      this.avatar_frame = 0;
      this.clan = 0;
      this.permission = "Normal";
      this.email = "";
    }
  },
  persist: {
    key: `${useProject()}.user`,
  }
});
