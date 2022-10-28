export default {
  app: {},
  components: {
    downloadButton: {
      labels: {
        download: "Download Now",
        platforms: {
          android: "Android, arm64",
          appstore: "App Store, iOS & macOS",
          linux: "Linux, x64",
          macosDmg: "macOS, Universal dmg",
          macosPkg: "macOS, Universal installer",
          testflight: "TestFlight, iOS & macOS",
          windows32: "Windows, x86",
          windows64: "Windows, x64"
        }
      },
      notifications: {
        download: "Getting download link...",
        error: "Not available",
        success: "Succeeded"
      }
    },
    languagesMenu: {},
    settingsMenu: {
      labels: {
        darkMode: "Dark Mode"
      }
    }
  },
  layouts: {
    footers: {
      main: {
        labels: {
          products: "Products",
          techminoGalaxy: "Techmino Galaxy",
          techmino: "Techmino",
          quatrack: "Quatrack",
          miscellaneous: "Miscellaneous",
          support: "Support",
          accountSettings: "Account Settings",
          gameManuals: "Game Manuals",
          glossary: "Glossary",
          utilities: "Utilities",
          about: "About",
          whoWeAre: "Who We Are",
          brandingGuidelines: "Branding Guidelines",
          contact: "Contact",
          joinUs: "Join Us"
        }
      }
    },
    headers: {
      main: {
        labels: {
          title: "26F Studio",
          products: "Products",
          support: "Support",
          about: "About",
          contact: "Contact",
          sign: "Sign Up/Sign In"
        }
      }
    },
    main: {}
  },
  pages: {
    main: {
      labels: {
        header: "Welcome to\n" +
          "26F Studio!",
        title: "Our products",
        invite: {
          interested: "Interested in what you see?",
          account: "Create your account now!",
          button: "Sign Up/Log In"
        }
      },
      notifications: {
        comingSoon: "Coming soon!"
      },
      products: {
        techminoGalaxy: {
          name: "Techmino Galaxy",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting\n" +
            "industry. Lorem Ipsum has been the industry's standard dummy text\n" +
            "ever since the 1500s, when an unknown printer took a galley of type\n" +
            "and scrambled it to make a type specimen book."
        },
        techmino: {
          name: "Techmino",
          description: "Welcome to Techmino, a block-stacking game by 26F Studio!\n" +
            "Immerse yourself in more than 100 modes of this modern yet familiar game,\n" +
            "with a variety of difficulties so everyone can have a great time!\n" +
            "Hang out and challenge your friends and players around the world\n" +
            "in the multiplayer modes, and discover some hidden easter eggs all over the game!\n"
        },
        quatrack: {
          name: "Quatrack",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting " +
            "industry. Lorem Ipsum has been the industry's standard dummy text " +
            "ever since the 1500s, when an unknown printer took a galley of type " +
            "and scrambled it to make a type specimen book."
        }
      }
    }
  }
};
