export default {
  app: {},
  components: {
    downloadButton: {
      labels: {
        disable: "Coming soon...",
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
    loginSteps: {
      codePanel: {
        labels: {
          login: "Login",
          email: "Email",
          code: "Verification Code",
          getCode: "Get code",
          loginWithPassword: "Login with password",
          notice: "We would create a new account for you if the verified email does not have an associated account."
        },
        placeholders: {
          email: "Input your email address",
          code: "Input your verification code"
        },
        notifications: {
          getCodeSuccess: "Verification code has been sent to your mailbox",
          loginSuccess: "Congratulations! You are now logged in"
        }
      },
      passwordPanel: {
        labels: {
          login: "Login",
          email: "Email",
          password: "Password",
          rememberMe: "Remember Me",
          loginWithCode: "Login with code",
          forgot: "Forgot your password?"
        },
        placeholders: {
          email: "Input your email address",
          password: "Input your password",
        },
        notifications: {
          loginSuccess: "Congratulations! You are now logged in"
        }
      },
    },
    productPanel: {
      labels: {
        learnMore: "Learn More"
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
    },
    settingsMenu: {
      labels: {
        darkMode: "Dark Mode"
      }
    }
  },
  layouts: {
    drawers: {
      main: {
        labels: {
          title: "26F Studio",
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
    footers: {
      login: {
        labels: {
          login: "Login"
        }
      },
      main: {
        labels: {
          title: "26F Studio",
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
          contact: "Contact"
        }
      },
      simple: {
        labels: {
          title: "26F Studio"
        }
      }
    },
    main: {}
  },
  pages: {
    login: {
      labels: {
        header: "Welcome\n" +
          "(Back)!",
      }
    },
    main: {
      labels: {
        header: "Welcome to\n" +
          "26F Studio!",
        title: "Our products",
        invite: {
          interested: "Interested in \nwhat you see?",
          account: "Create your account now!",
          button: "Sign Up/Log In"
        }
      }
    },
    notFound: {
      labels: {
        notFound: "Oops! Nothing here...",
        home: "Go Home"
      }
    }
  },
  Studio26F: {
    PlayerManager: {
      invalidEmail: "Invalid email",
      invalidEmailPass: "Invalid email or password",
      playerNotFound: "Player not found"
    }
  }
};
