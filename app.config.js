import 'dotenv/config';


export default {
  expo: {
    name: "addonation",
    slug: "addonation",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#D36209"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "com.addonation.donatesixsec",
      buildNumber: "1.0.0",
      supportsTablet: true,
      requireFullScreen: true,
      googleServicesFile: "./GoogleService-Info.plist",
    },
    android: {
      package: "com.addonation.donatesixsec",
      versionCode: 100,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      permissions: [
        "RECEIVE_BOOT_COMPLETED"
      ],
      googleServicesFile: "./google-services.json",
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      databaseURL: process.env.DATABASE_URL,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      androidOauthClientId: process.env.ANDROID_OAUTH_CLIENT_ID,
      iosOauthClientId: process.env.IOS_OAUTH_CLIENT_ID
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/adaptive-icon.png",
          color: "#ffffff",
          mode: "production"
        }
      ]
    ],
    scheme: "mycoolredirect"
  }
}
