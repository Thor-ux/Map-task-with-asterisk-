class Settings {
    constructor() {
      this.defaultSettings = new Map([
        ['theme', 'dark'],
        ['music', 'trance'],
        ['difficulty', 'easy']
      ]);
      this.userSettings = new Map();
    }
  
    setUserSetting(name, value) {
      if (this.defaultSettings.has(name)) {
        this.userSettings.set(name, value);
      } else {
        throw new Error(`Invalid setting name: ${name}`);
      }
    }
  
    get settings() {
      const mergedSettings = new Map(this.defaultSettings);
      for (const [key, value] of this.userSettings) {
        mergedSettings.set(key, value);
      }
      return mergedSettings;
    }
  }
  
  module.exports = Settings;