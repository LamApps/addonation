export default {
  expo: {
    name: "Addonation",
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
      buildNumber: "1.0.4",
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
    plugins: [
      [
        "expo-notifications"
      ]
    ]
  }
}
