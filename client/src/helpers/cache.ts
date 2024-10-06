import { secrets } from '../config/secrets';

type CacheItems = 'access_token' | 'floor' | 'floors' | 'duration' | 'seats';
export interface CacheService {
  save(key: CacheItems, val: string): Promise<void>;
  get(key: CacheItems): Promise<string | null>;
  remove(key: CacheItems): Promise<void>;
}

class WebCacheService implements CacheService {
  get(key: string): Promise<string | null> {
    return new Promise<string | null>((resolve, _) => {
      const data = window.localStorage.getItem(key);
      if (!data) {
        resolve(null);
        return;
      }

      if (data === 'undefined' || data.trim() === '') {
        resolve(null);
        return;
      }

      resolve(data);
    });
  }

  remove(key: string): Promise<void> {
    return new Promise<void>((resolve, _) => {
      window.localStorage.removeItem(key);
      resolve();
    });
  }

  save(key: string, val: string): Promise<void> {
    return new Promise<void>((resolve, _) => {
      window.localStorage.setItem(key, val);
      resolve();
    });
  }
}

class ChromeCacheService implements CacheService {
  async save(key: string, val: string): Promise<void> {
    await chrome.storage.sync.set({ [key]: val });
  }

  async get(key: CacheItems): Promise<string | null> {
    const item = await chrome.storage.sync.get(key);
    console.log('token from storage api: ', item[key]);
    const data = item[key];

    if (!data) {
      return null;
    }

    if (data === 'undefined' || data.trim() === '') {
      return null;
    }

    return data;
  }

  async remove(key: string): Promise<void> {
    await chrome.storage.sync.remove(key);
  }
}

// service injector
export class CacheServiceFactory {
  static getCacheService(): CacheService {
    const isChrome = secrets.appEnvironment === 'chrome';
    if (isChrome && secrets.nodeEnvironment !== 'development') {
      return new ChromeCacheService();
    } else {
      return new WebCacheService();
    }
  }
}
