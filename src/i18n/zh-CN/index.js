export default {
  components: {
    authDialog: {
      labels: {
        cancel: "取消",
        steps: {
          verify: "确认您的账号",
          deactivate: "确认注销账号",
          migrate: "设置新的邮箱登录",
          reset: "设置新密码"
        },
        titles: {
          deactivate: "注销账号",
          migrate: "迁移账号",
          reset: "重置密码"
        }
      }
    },
    authPanels: {
      deactivatePanel: {
        errors: {
          email: "邮箱地址无效",
          code: "验证码无效"
        },
        labels: {
          email: "邮箱",
          code: "验证码",
          getCode: "获取验证码",
          verify: "验证账号",
          holdOn: "等等！",
          warning: "这是一张单程票！您将不能再使用此账号登录！",
          notice: "此操作将冻结您的账号并向其他玩家隐藏您的账号信息。\n" +
            "我们将在后台数据库保留您的账号数据用于审查目的。 \n" +
            "如果您确实需要删除的账号数据，请联系我们。",
          cancel: "再想想",
          confirm: "没问题，继续"
        },
        placeholders: {
          email: "输入您的邮箱地址",
          code: "输入您的验证码"
        },
        notifications: {
          getCodeSuccess: "验证码已经发送至您的邮箱",
          deactivateSuccess: "您的账号已经被成功注销"
        }
      },
      emailPanel: {
        errors: {
          email: "邮箱地址无效"
        },
        labels: {
          title: "验证您的邮箱地址",
          description: "通过邮箱验证您的26F账号以继续操作",
          email: "邮箱",
          submit: "继续",
          sendingCode: "发送验证码中……"
        }
      },
      resetPanel: {
        errors: {
          email: "邮箱地址无效",
          code: "验证码无效",
          password: "密码无效",
          confirmPassword: "密码确认不一致"
        },
        labels: {
          description: "我们已经向您的邮箱 {email} 发送了验证码。\n" +
            "在30分钟内于下方输入您收到的验证码以继续。",
          resendBefore: "没有收到验证码？检查您的垃圾箱或者",
          resend: "重新发送",
          resendAfter: "。",
          reminder: "您的密码长度必须至少8位并满足以下两种要求：",
          constraints: "包含至少1个小写字母\n" +
            "包含至少1个大写字母\n" +
            "包含至少1个数字\n" +
            "包含至少1个特殊符号（#?!{'@'}$%^&*-）",
          email: "邮箱",
          code: "验证码",
          getCode: "获取验证码",
          password: "新密码",
          confirmPassword: "确认新密码",
          submit: "重置密码"
        },
        notifications: {
          codeSent: "验证码已经发送至您的邮箱",
          resetSuccess: "成功重置密码！现在您可以使用新密码登录了"
        }
      }
    },
    loginPanels: {
      codePanel: {
        errors: {
          code: "验证码无效"
        },
        labels: {
          title: "查看您的收件箱",
          description: "我们已经向您的邮箱 {email} 发送了验证码。\n" +
            "在30分钟内于下方输入您收到的验证码以继续。\n" +
            "如果当前邮箱地址没有关联到任何已存在的账号，我们将为您创建一个。",
          resendBefore: "没有收到验证码？检查您的垃圾箱或者",
          resend: "重新发送",
          resendAfter: "。",
          code: "验证码",
          submit: "登录/注册",
          loginWithPassword: "使用密码登录",
          restart: "重新开始"
        },
        notifications: {
          loginSuccess: "恭喜！现在您已经登录了"
        }
      },
      emailPanel: {
        errors: {
          email: "邮箱地址无效"
        },
        labels: {
          title: "登录/注册",
          description: "登录您的26F账号以在不同设备之间同步您的游戏进度和成就，" +
            "同时在我们的游戏内与朋友一起在线游玩\n\n" +
            "还没有账号？输入您的邮箱地址来注册一个：",
          email: "邮箱",
          submit: "继续",
          other: "或者使用下方的其他登录选项："
        }
      },
      finishPanel: {
        labels: {
          profile: "前往个人中心",
          home: "前往首页"
        }
      },
      infoPanel: {
        labels: {
          title: "完善详细信息",
          description: "请您花几分钟完成以下关于您的信息。",
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
            "Your password must have at least eight characters and meet 2 of the following constraints: ",
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
          windows64: "Windows, x64",
          windowsInstaller: "Windows, Universal installer"
        }
      },
      notifications: {
        download: "Getting download link...",
        error: "Not available",
        success: "Succeeded"
      }
    },
    languageList: {},
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
    settingList: {
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
          joinUs: "Join Us",
          languageMenu: "Language",
          settingsMenu: "Settings"
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
        header: "Welcome to 26F Studio!",
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
        header: "Welcome (Back)!",
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
        header: "Welcome!",
        title: "Authorizing {product}",
        description: "Do you want to authorize {product} with your 26F account?\n" +
          "By clicking on “Accept”, you hereby allow {product} to access your: ",
        permissions: {
          common: "Common Data: ",
          sensitive: "Sensitive Data: "
        },
        permissionDescriptions: {
          common: "Your personal profile, including your username, motto, avatar, and other public info.",
          sensitive: "Your sensitive data, including your email address, phone number, and other private info."
        },
        products: {
          techmino: "Techmino",
          techminoGalaxy: "Techmino Galaxy",
          quatrack: "Quatrack"
        },
        cancel: "Decline",
        confirm: "Accept",
        copySuccess: "Tokens has been copied to your clipboard. \n" +
          "You can now close this page.",
        manualCopyBefore: "Copy failed?",
        manualCopy: "Click here",
        manualCopyAfter: "to copy manually."
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
        submit: "Update Profile",
        resetPassword: "Reset Password",
        sendingCode: "Sending email..."
      },
      placeholders: {
        username: "Input your username",
        motto: "Input your motto",
        region: "Select your region",
        avatarFrame: "Coming soon..."
      },
      notifications: {
        submitSuccess: "Profile updated successfully"
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
      invalidAccessToken: "Invalid access token",
      networkError: "Network error",
      noPassword: "Account doesn't have a password, use 'forgot your password' first",
      playerNotFound: "Player not found",
      recaptchaFailed: "Failed to verify reCAPTCHA"
    }
  }
};
