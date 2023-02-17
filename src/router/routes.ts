export default [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "home" },
      {
        name: "home",
        path: "home",
        components: {
          header: () => import("@/layouts/headers/MainHeader.vue"),
          drawer: () => import("@/layouts/drawers/MainDrawer.vue"),
          default: () => import("@/pages/HomePage.vue"),
          footer: () => import("@/layouts/footers/MainFooter.vue"),
        },
      },
    ],
  },
  {
    name: "notFound",
    path: "/:catchAll(.*)*",
    components: {
      header: () => import("@/layouts/headers/SimpleHeader.vue"),
      default: () => import("@/pages/NotFoundPage.vue"),
    },
  },
];
