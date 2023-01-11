export default {
  app: {},
  components: {
    authDialog: {
      labels: {
        cancel: "Cancel",
        steps: {
          verify: "Verify your account",
          deactivate: "Confirm deactivation",
          migrate: "Set new login method",
          reset: "Set new password"
        },
        titles: {
          deactivate: "Deactivate account",
          migrate: "Migrate account",
          reset: "Reset password"
        }
      }
    },
    infoPanels: {
      codePanel: {
        errors: {
          code: "Invalid verification code"
        },
        labels: {
          title: "Check your inboxes",
          description: "We have sent a verification code to the email address {email}.\n" +
            "Enter the code below within 30 minutes to continue. \n" +
            "If this email address is not linked to an existing account, we will create one for you.",
          resendBefore: "Did not receive the code? Check your junk inbox or",
          resend: " resend the code",
          resendAfter: ".",
          code: "Verification Code",
          submit: "Sign In / Sign Up",
          loginWithPassword: "Sign in with password",
          restart: "Start Over"
        },
        notifications: {
          loginSuccess: "Congratulations! You are now logged in"
        }
      },
      deactivatePanel: {
        errors: {
          email: "Invalid email address",
          code: "Invalid verification code"
        },
        labels: {
          email: "Email",
          code: "Verification Code",
          getCode: "Get code",
          verify: "Verify",
          holdOn: "HOLD ON!",
          warning: "This is a ONE-WAY ticket! You would no longer be able to login again!",
          notice: "This action freezes the account and hides info to other players. \n" +
            "We would KEEP your account data in the database for internal review purpose. \n" +
            "If you REALLY want to delete your data, Please reach to support and contact us.",
          cancel: "Let me think",
          confirm: "Okay, go ahead"
        },
        placeholders: {
          email: "Input your email address",
          code: "Input your verification code"
        },
        notifications: {
          getCodeSuccess: "Verification code has been sent to your mailbox",
          deactivateSuccess: "Your account has been deactivated"
        }
      },
      emailPanel: {
        errors: {
          email: "Invalid email address"
        },
        labels: {
          title: "Sign in or Sign up",
          description: "Sign in to your 26F account to sync your game progress and achievements across devices, " +
            "as well as play with your friends online in our games. \n\n" +
            "Does not have an account yet? Sign up by entering your email address or use one of the sign-in options.",
          email: "Email",
          submit: "Continue",
          other: "Or use one of the following sign in options:"
        }
      },
      finishPanel: {
        labels: {
          profile: "Go to profile",
          home: "Go to home page"
        }
      },
      infoPanel: {
        labels: {
          title: "Finishing up the details",
          description: "Please, feel free to spend a few minutes completing the following info about you.",
          username: "Username",
          region: "Region",
          regionHint: "Select region",
          motto: "About me",
          avatar: "Avatar",
          upload: "Upload",
          submit: "Continue",
          maybeLater: "Set up later in profile",
          restart: "Start Over"
        },
        notifications: {
          submitSuccess: "Your account info has been updated"
        }
      },
      passwordPanel: {
        errors: {
          password: "Invalid password"
        },
        labels: {
          title: "Enter your password",
          email: "Email: ",
          password: "Password",
          forgot: "Forgot your password?",
          submit: "Sign In",
          loginWithCode: "Sign in / Sign up with email",
          sendingCode: "Sending email...",
          restart: "Start Over"
        },
        notifications: {
          loginSuccess: "Congratulations! You are now logged in"
        }
      },
      setupPanel: {
        errors: {
          password: "Invalid password",
          confirmPassword: "Two inputs are not the same"
        },
        labels: {
          title: "Welcome aboard!",
          description: "Let’s first create a password. \n\n" +
            "Your password must have at least eight characters and meet 3 of the following constraints: ",
          constraints: "Contains at least 1 lowercase alphabetic character \n" +
            "Contains at least 1 uppercase alphabetic character \n" +
            "Contains at least 1 numeric character \n" +
            "Contains at least 1 special character(#?!{'@'}$%^&*-)",
          password: "Password",
          confirmPassword: "Confirm your Password",
          submit: "Continue",
          maybeLater: "Set up later in profile"
        },
        notifications: {
          setupSuccess: "Password set! You can login with your new password now"
        }
      }
    },
    cropperDialog: {
      labels: {
        title: "Crop Image",
        chooseImage: "Choose Image",
        noImage: "Please choose an image",
        cancel: "Cancel",
        confirm: "Confirm"
      },
      notifications: {
        invalidFile: "Invalid file"
      }
    },
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
          description: "The next generation of Techmino, with more features and more fun!"
        },
        techmino: {
          name: "Techmino",
          description: "Welcome to Techmino, a block-stacking game by 26F Studio! \n" +
            "Immerse yourself in more than 100 modes of this modern yet familiar game, \n" +
            "with a variety of difficulties so everyone can have a great time! \n" +
            "Hang out and challenge your friends and players around the world \n" +
            "in the multiplayer modes, and discover some hidden easter eggs all over the game! \n"
        },
        quatrack: {
          name: "Quatrack",
          description: "Welcome to Quatrack, the music game produced by 26F Studio! \n" +
            "Hit the keyboard/click the screen with the music beat, \n" +
            "enjoy the geometric style animation, get higher scores, \n" +
            "and challenge your record!"
        }
      }
    },
    profileButton: {
      labels: {
        signIn: "Sign Up/Sign In",
        signOut: "Sign Out"
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
    home: {
      labels: {
        header: "Welcome \n" +
          "to \n" +
          "26F Studio!",
        title: "Our products",
        invite: {
          interested: "Interested in \nwhat you see?",
          account: "Create your account now!",
          button: "Sign Up/Log In"
        }
      }
    },
    login: {
      labels: {
        header: "Welcome\n" +
          "(Back)!",
        headerNew: "Welcome!",
        loginWithPassword: "Login With Password",
        loginWithCode: "Login With Verification Code",
        setupInfo: "Setup Your Account Info",
        setupPassword: "Setup A New Password",
        finish: "You Are All Set Now!"
      }
    },
    notFound: {
      labels: {
        notFound: "Oops! Nothing here...",
        home: "Go Home"
      }
    },
    oauth: {
      labels: {
        titles: {
          techmino: "Authorize Techmino",
          techminoGalaxy: "Authorize Techmino Galaxy",
          quatrack: "Authorize Quatrack"
        },
        products: {
          techmino: "Techmino",
          techminoGalaxy: "Techmino Galaxy",
          quatrack: "Quatrack"
        },
        caption: "wants to access your 26F account",
        data: "Personal user data",
        authorize: "Authorize",
        copySuccess: "Tokens has been copied to your clipboard",
        manualCopy: "Copy failed? Click here copy manually"
      },
      notifications: {
        submitSuccess: "Authorization granted successfully"
      }
    },
    profile: {
      labels: {
        username: "Username",
        motto: "Motto",
        region: "Region",
        avatarFrame: "Avatar Frame",
        maybeLater: "Maybe later...",
        submit: "Submit"
      },
      placeholders: {
        username: "Input your username",
        motto: "Input your motto",
        region: "Select your region",
        avatarFrame: "Coming soon..."
      }
    }
  },
  Studio26F: {
    LimitVerifyEmail: {
      tooFrequent: "Sending email too frequently, please try again later"
    },
    PlayerManager: {
      emailSendError: "Failed to send email",
      invalidEmail: "Invalid email",
      invalidEmailPass: "Invalid email or password",
      networkError: "Network error",
      playerNotFound: "Player not found",
      recaptchaFailed: "Failed to verify reCAPTCHA"
    }
  }
};
