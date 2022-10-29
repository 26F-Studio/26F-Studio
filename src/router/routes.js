const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {path: '', redirect: 'home'},
      {
        name: "home",
        path: "home",
        components: {
          header: () => import("layouts/headers/MainHeader"),
          default: () => import("pages/HomePage"),
          footer: () => import("layouts/footers/MainFooter")
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
];

export default routes;
