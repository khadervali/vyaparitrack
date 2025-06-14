const cache: Record<string, any> = {};
const cacheTimes: Record<string, number> = {};
const CACHE_TTL = 60000; // 1 minute

export function getCache(key: string) {
  if (cache[key] && Date.now() - cacheTimes[key] < CACHE_TTL) {
    return cache[key];
  }
  return null;
}

export function setCache(key: string, data: any) {
  cache[key] = data;
  cacheTimes[key] = Date.now();
}

export function clearCache(key: string) {
  delete cache[key];
  delete cacheTimes[key];
}