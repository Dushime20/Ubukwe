type TranslationCache = Record<string, Record<string, string>>;

class TranslationService {
  private currentLanguage = 'en';
  private cache: TranslationCache = {};
  private rateLimitUntil: number | null = null;
  private pendingTranslations = new Map<string, Promise<string>>();

  init(language = 'en') {
    this.currentLanguage = language;
    this.loadCache();
    this.loadRateLimitStatus();
  }

  private loadCache() {
    if (typeof window === 'undefined') return;
    try {
      const cached = localStorage.getItem('translation_cache');
      if (cached) this.cache = JSON.parse(cached);
    } catch {}
  }

  private saveCache() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('translation_cache', JSON.stringify(this.cache));
    } catch {}
  }

  private loadRateLimitStatus() {
    if (typeof window === 'undefined') return;
    try {
      const until = localStorage.getItem('translation_rate_limit');
      if (until) {
        const timestamp = parseInt(until);
        if (Date.now() < timestamp) {
          this.rateLimitUntil = timestamp;
        } else {
          localStorage.removeItem('translation_rate_limit');
        }
      }
    } catch {}
  }

  private saveRateLimitStatus() {
    if (typeof window === 'undefined') return;
    try {
      if (this.rateLimitUntil) {
        localStorage.setItem('translation_rate_limit', this.rateLimitUntil.toString());
      } else {
        localStorage.removeItem('translation_rate_limit');
      }
    } catch {}
  }

  setLanguage(lang: string) {
    this.currentLanguage = lang;
  }

  getLanguage() {
    return this.currentLanguage;
  }

  async translate(text: string, targetLang?: string): Promise<string> {
    if (!text?.trim()) return text;
    
    const lang = targetLang || this.currentLanguage;
    if (lang === 'en') return text;

    const key = text.toLowerCase().trim();
    const cacheKey = `${key}:${lang}`;
    
    // Check cache first
    if (this.cache[key]?.[lang]) {
      return this.cache[key][lang];
    }

    // Check if translation is already in progress
    if (this.pendingTranslations.has(cacheKey)) {
      return this.pendingTranslations.get(cacheKey)!;
    }

    // Check rate limit
    if (this.rateLimitUntil && Date.now() < this.rateLimitUntil) {
      return text;
    }

    // Start new translation
    const translationPromise = this.performTranslation(text, lang, key);
    this.pendingTranslations.set(cacheKey, translationPromise);

    try {
      const result = await translationPromise;
      return result;
    } finally {
      this.pendingTranslations.delete(cacheKey);
    }
  }

  private async performTranslation(text: string, lang: string, key: string): Promise<string> {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`,
        { method: 'GET' }
      );
      
      if (response.status === 429) {
        this.rateLimitUntil = Date.now() + 3600000; // 1 hour
        this.saveRateLimitStatus();
        return text;
      }

      if (!response.ok) {
        return text;
      }

      const data = await response.json();
      const translated = data.responseData?.translatedText || text;

      // Save to cache
      if (!this.cache[key]) this.cache[key] = {};
      this.cache[key][lang] = translated;
      this.saveCache();

      return translated;
    } catch {
      return text;
    }
  }

  translateSync(text: string, targetLang?: string): string {
    if (!text?.trim()) return text;
    
    const lang = targetLang || this.currentLanguage;
    if (lang === 'en') return text;

    const key = text.toLowerCase().trim();
    return this.cache[key]?.[lang] || text;
  }

  async translateBatch(texts: string[], targetLang?: string): Promise<string[]> {
    return Promise.all(texts.map(text => this.translate(text, targetLang)));
  }

  clearCache() {
    this.cache = {};
    this.saveCache();
  }

  getRateLimitStatus() {
    if (!this.rateLimitUntil || Date.now() >= this.rateLimitUntil) {
      this.rateLimitUntil = null;
      this.saveRateLimitStatus();
      return { isLimited: false, minutesRemaining: 0 };
    }
    const minutesRemaining = Math.ceil((this.rateLimitUntil - Date.now()) / 60000);
    return { isLimited: true, minutesRemaining };
  }
}

export const translationService = new TranslationService();
