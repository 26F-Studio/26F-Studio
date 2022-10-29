import { defineStore } from "pinia";

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

  actions: {}
});
