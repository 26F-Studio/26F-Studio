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
          confirmPassword: "两次密码输入不一致"
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
          loginSuccess: "恭喜！您现在已经登录了"
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
          username: "用户名",
          region: "区域",
          regionHint: "选择区域",
          motto: "个人简介",
          avatar: "头像",
          upload: "上传",
          submit: "继续",
          maybeLater: "之后在个人中心继续设置",
          restart: "重新开始"
        },
        notifications: {
          submitSuccess: "你的账号信息已被更新"
        }
      },
      passwordPanel: {
        errors: {
          password: "密码无效"
        },
        labels: {
          title: "输入你的密码",
          email: "邮箱：",
          password: "密码",
          forgot: "忘记密码？",
          submit: "登录",
          loginWithCode: "使用验证码登录/注册",
          sendingCode: "发送验证码中……",
          restart: "重新开始"
        },
        notifications: {
          loginSuccess: "恭喜！您现在已经登录了"
        }
      },
      setupPanel: {
        errors: {
          password: "密码无效",
          confirmPassword: "两次密码输入不一致"
        },
        labels: {
          title: "欢迎加入！",
          description: "首先让我们来设置您的密码\n\n" +
            "您的密码长度必须至少8位并满足以下两种要求：",
          constraints: "包含至少1个小写字母\n" +
            "包含至少1个大写字母\n" +
            "包含至少1个数字\n" +
            "包含至少1个特殊符号（#?!{'@'}$%^&*-）",
          password: "密码",
          confirmPassword: "确认你的密码",
          submit: "继续",
          maybeLater: "之后在个人中心继续设置"
        },
        notifications: {
          setupSuccess: "密码设置成功！现在您可以使用密码登录了"
        }
      }
    },
    cropperDialog: {
      labels: {
        title: "裁剪图片",
        chooseImage: "选择图片",
        noImage: "请选择一张图片",
        cancel: "取消",
        confirm: "确认"
      },
      notifications: {
        invalidFile: "无效文件"
      }
    },
    downloadButton: {
      labels: {
        disable: "即将到来……",
        download: "立刻下载",
        platforms: {
          android: "Android, arm64",
          appstore: "App Store, iOS & macOS",
          linux: "Linux, x64",
          macosDmg: "macOS, 通用磁盘映像",
          macosPkg: "macOS, 通用安装包",
          testflight: "TestFlight, iOS 和 macOS",
          windows32: "Windows, x86",
          windows64: "Windows, x64",
          windowsInstaller: "Windows, 通用安装包"
        }
      },
      notifications: {
        download: "获取下载链接……",
        error: "暂时不可用",
        success: "成功"
      }
    },
    languageList: {},
    productPanel: {
      labels: {
        learnMore: "了解更多"
      },
      notifications: {
        comingSoon: "即将到来！"
      },
      products: {
        techminoGalaxy: {
          name: "Techmino Galaxy",
          description: "下一代Techmino, 好玩！"
        },
        techmino: {
          name: "Techmino",
          description: "欢迎来到Techmino，一款来自 26F Studio 的现代方块堆叠游戏！\n" +
            "在这里，您可以在多达百种游戏模式与丰富多样的难度选项收获有趣的方块体验，\n" +
            "在现代简约的风格中找回儿时游戏的味道。游戏模式难度不一，适合所有水平的玩家。\n" +
            "在多人模式中，您可以向好友和全球玩家发起挑战。游戏中还隐藏着许多彩蛋，等待您的发掘。\n"
        },
        quatrack: {
          name: "Quatrack",
          description: "欢迎来到Quatrack, 一款来自 26F Studio 的音乐节奏游戏！\n" +
            "Hit the keyboard/click the screen with the music beat, \n" +
            "enjoy the geometric style animation, get higher scores, \n" +
            "and challenge your record!"
        }
      }
    },
    profileButton: {
      labels: {
        signIn: "登录/注册",
        signOut: "登出"
      }
    },
    settingList: {
      labels: {
        darkMode: "暗色模式"
      }
    }
  },
  layouts: {
    drawers: {
      main: {
        labels: {
          title: "26F Studio",
          products: "所有产品",
          techminoGalaxy: "Techmino Galaxy",
          techmino: "Techmino",
          quatrack: "Quatrack",
          miscellaneous: "杂项",
          support: "支持中心",
          accountSettings: "账号设置",
          gameManuals: "游戏手册",
          glossary: "游戏术语",
          utilities: "工具",
          about: "关于我们",
          whoWeAre: "我们是谁？",
          brandingGuidelines: "品牌指南",
          contact: "联系我们",
          joinUs: "加入我们",
          languageMenu: "语言",
          settingsMenu: "设置"
        }
      }
    },
    footers: {
      login: {
        labels: {
          login: "登录"
        }
      },
      main: {
        labels: {
          title: "26F Studio",
          products: "所有产品",
          techminoGalaxy: "Techmino Galaxy",
          techmino: "Techmino",
          quatrack: "Quatrack",
          miscellaneous: "杂项",
          support: "支持中心",
          accountSettings: "账号设置",
          gameManuals: "游戏手册",
          glossary: "游戏术语",
          utilities: "工具",
          about: "关于我们",
          whoWeAre: "我们是谁？",
          brandingGuidelines: "品牌指南",
          contact: "联系我们",
          joinUs: "加入我们",
        }
      }
    },
    headers: {
      main: {
        labels: {
          title: "26F Studio",
          products: "所有产品",
          techminoGalaxy: "Techmino Galaxy",
          techmino: "Techmino",
          quatrack: "Quatrack",
          miscellaneous: "杂项",
          support: "支持中心",
          accountSettings: "账号设置",
          gameManuals: "游戏手册",
          glossary: "游戏术语",
          utilities: "工具",
          about: "关于我们",
          whoWeAre: "我们是谁？",
          brandingGuidelines: "品牌指南",
          contact: "联系我们",
          joinUs: "加入我们",
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
        header: "欢迎来到 26F Studio！",
        title: "我们的产品",
        invite: {
          interested: "对你看到的\n内容感兴趣？",
          account: "立刻创建账号！",
          button: "登录/注册"
        }
      }
    },
    login: {
      labels: {
        header: "欢迎（回来）！",
        headerNew: "欢迎！",
        loginWithPassword: "使用密码登录",
        loginWithCode: "使用验证码登录",
        setupInfo: "设置你的账户信息",
        setupPassword: "设置一个新密码",
        finish: "一切都准备好了！"
      }
    },
    notFound: {
      labels: {
        notFound: "啊哦！这里啥都没有……",
        home: "返回主页"
      }
    },
    oauth: {
      labels: {
        header: "欢迎！",
        title: "正在授权 {product}",
        description: "你想要使用26F账户来授权 {product} 吗？\n" +
          "点击“接受”将允许 {product} 访问你的：",
        permissions: {
          common: "常用数据：",
          sensitive: "敏感数据："
        },
        permissionDescriptions: {
          common: "你的个人简介，包括用户名、个人签名、头像以及其他公开信息。",
          sensitive: "你的敏感信息，包括你的邮箱地址、电话号码以及其他私密信息。"
        },
        products: {
          techmino: "Techmino",
          techminoGalaxy: "Techmino Galaxy",
          quatrack: "Quatrack"
        },
        cancel: "拒绝",
        confirm: "接受",
        copySuccess: "授权令牌已复制到你的剪贴板。\n" +
          "现在你可以关闭此页面了。",
        manualCopyBefore: "复制失败？",
        manualCopy: "点击此处",
        manualCopyAfter: "以手动复制。"
      },
      notifications: {
        submitSuccess: "授权成功"
      }
    },
    profile: {
      labels: {
        username: "用户名",
        motto: "个人签名",
        region: "地区",
        submit: "更新个人信息",
        resetPassword: "重置密码",
        sendingCode: "正在发送验证码……"
      },
      placeholders: {
        username: "输入你的用户名",
        motto: "输入你的个人签名",
        region: "选择你所在的地区",
        avatarFrame: "即将到来……"
      },
      notifications: {
        submitSuccess: "个人信息已成功更新"
      }
    }
  },
  Studio26F: {
    LimitVerifyEmail: {
      tooFrequent: "验证码发送过于频繁，请稍后再试"
    },
    PlayerManager: {
      emailSendError: "发送验证码失败",
      invalidEmail: "邮箱无效",
      invalidEmailPass: "邮箱或密码无效",
      invalidAccessToken: "访问令牌无效",
      networkError: "网络错误",
      noPassword: "当前账号尚未设置密码，请先通过“忘记密码”重置密码",
      playerNotFound: "找不到玩家",
      recaptchaFailed: "reCAPTCHA 验证失败"
    }
  }
};
