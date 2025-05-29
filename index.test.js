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
      throw new Error('Invalid setting name');
    }
  }

  get settings() {
    const resultSettings = new Map(this.defaultSettings);
    for (let [key, value] of this.userSettings) {
      resultSettings.set(key, value);
    }
    return resultSettings;
  }
}

describe('Settings', () => {
  let settings;

  beforeEach(() => {
    settings = new Settings();
  });

  test('should initialize with default settings', () => {
    expect(settings.settings.get('theme')).toBe('dark');
    expect(settings.settings.get('music')).toBe('trance');
    expect(settings.settings.get('difficulty')).toBe('easy');
  });

  test('should allow setting a user preference', () => {
    settings.setUserSetting('theme', 'light');
    expect(settings.settings.get('theme')).toBe('light');
  });

  test('should maintain default settings for unset preferences', () => {
    settings.setUserSetting('theme', 'light');
    expect(settings.settings.get('music')).toBe('trance');
    expect(settings.settings.get('difficulty')).toBe('easy');
  });

  test('should allow overwriting user preferences', () => {
    settings.setUserSetting('theme', 'light');
    settings.setUserSetting('theme', 'gray');
    expect(settings.settings.get('theme')).toBe('gray');
  });

  test('should throw an error for invalid setting names', () => {
    expect(() => {
      settings.setUserSetting('invalidSetting', 'value');
    }).toThrow('Invalid setting name');
  });

  test('should allow setting all preferences', () => {
    settings.setUserSetting('theme', 'light');
    settings.setUserSetting('music', 'pop');
    settings.setUserSetting('difficulty', 'hard');
    expect(settings.settings.get('theme')).toBe('light');
    expect(settings.settings.get('music')).toBe('pop');
    expect(settings.settings.get('difficulty')).toBe('hard');
  });

  test('should return a new Map object from settings getter', () => {
    const settingsMap1 = settings.settings;
    const settingsMap2 = settings.settings;
    expect(settingsMap1).not.toBe(settingsMap2);
  });

  test('should not allow direct modification of returned settings', () => {
    const settingsMap = settings.settings;
    settingsMap.set('theme', 'light');
    expect(settings.settings.get('theme')).toBe('dark');
  });
});