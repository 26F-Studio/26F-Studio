const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "home" },
      {
        name: "home",
        path: "home",
        components: {
          header: () => import("layouts/headers/MainHeader"),
          drawer: () => import("layouts/drawers/MainDrawer"),
          default: () => import("pages/HomePage"),
          footer: () => import("layouts/footers/MainFooter"),
        },
      },
      {
        name: "login",
        path: "login",
        components: {
          header: () => import("layouts/headers/SimpleHeader"),
          drawer: () => import("layouts/drawers/MainDrawer"),
          default: () => import("pages/LoginPage"),
        },
      },
      {
        name: "oauth",
        path: "oauth",
        components: {
          header: () => import("layouts/headers/SimpleHeader"),
          drawer: () => import("layouts/drawers/MainDrawer"),
          default: () => import("pages/OauthPage.vue"),
        },
      },
      {
        path: "products",
        children: [
          {
            name: "techmino",
            path: "techmino",
            components: {
              header: () => import("layouts/headers/MainHeader"),
              drawer: () => import("layouts/drawers/MainDrawer"),
              default: () => import("pages/products/TechminoPage"),
              footer: () => import("layouts/footers/MainFooter"),
            },
          },
          {
            name: "techminoGalaxy",
            path: "techmino-galaxy",
            components: {
              header: () => import("layouts/headers/MainHeader"),
              drawer: () => import("layouts/drawers/MainDrawer"),
              default: () => import("pages/products/TechminoGalaxyPage"),
              footer: () => import("layouts/footers/MainFooter"),
            },
          },
        ],
      },
      {
        name: "profile",
        path: "profile",
        components: {
          header: () => import("layouts/headers/MainHeader"),
          drawer: () => import("layouts/drawers/MainDrawer"),
          default: () => import("pages/ProfilePage"),
          footer: () => import("layouts/footers/MainFooter"),
        },
      },
      {
        name: "notFound",
        path: "/:catchAll(.*)*",
        components: {
          header: () => import("layouts/headers/SimpleHeader"),
          default: () => import("pages/NotFoundPage"),
        },
      },
    ],
  },
];

export default routes;
