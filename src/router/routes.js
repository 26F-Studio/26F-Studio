const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {path: '', redirect: 'home'},
      {
        name: "login",
        path: "login",
        components: {
          header: () => import("layouts/headers/SimpleHeader"),
          drawer: () => import("layouts/drawers/MainDrawer"),
          default: () => import("pages/LoginPage")
        }
      },
      {
        name: "home",
        path: "home",
        components: {
          header: () => import("layouts/headers/MainHeader"),
          drawer: () => import("layouts/drawers/MainDrawer"),
          default: () => import("pages/HomePage"),
          footer: () => import("layouts/footers/MainFooter")
        }
      },
      {
        path: "products",
        children: [
          {
            name: "techmino-galaxy",
            path: "techmino-galaxy",
            components: {
              header: () => import("layouts/headers/MainHeader"),
              drawer: () => import("layouts/drawers/MainDrawer"),
              default: () => import("pages/products/TechminoGalaxyPage"),
              footer: () => import("layouts/footers/MainFooter")
            }
          }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/NotFoundPage")
  }
];

export default routes;
