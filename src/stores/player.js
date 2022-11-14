import {defineStore} from "pinia";
import {useProject} from "boot/config";

export const usePlayerStore = defineStore("player", {
  state: () => ({
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
    async check() {

    },
    async update() {

    },
    logout() {
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
