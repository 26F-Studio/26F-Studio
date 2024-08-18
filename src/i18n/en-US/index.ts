export default {
  layouts: {
    drawers: {
      LeftMainDrawer: {
        navigations: { home: 'Home' },
      },
    },
    headers: {
      MainHeader: {
        labels: {
          toggleDarkMode: 'Toggle Dark Mode',
        },
        navigationGroups: {
          games: {
            label: 'Games',
            items: {
              techminoGalaxy: 'Techmino Galaxy',
              techmino: 'Techmino',
              quatrack: 'Quatrack',
              more: 'More',
            },
          },
          resources: {
            label: 'Resources',
            items: {
              glossary: 'Glossary',
            },
          },
          utilities: {
            label: 'Utilities',
            items: {},
          },
          aboutUs: {
            label: 'About Us',
            items: {
              github: 'GitHub',
            },
          },
        },
      },
    },
  },
  pages: {
    HomePage: {
      labels: {},
    },
  },
};
