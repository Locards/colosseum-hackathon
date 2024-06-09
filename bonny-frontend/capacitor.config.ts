import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bonny.bonnyapp',
  appName: 'bonny',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
