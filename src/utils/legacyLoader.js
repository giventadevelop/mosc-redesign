// Utility to dynamically load legacy scripts and styles
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    try {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve(src));
        existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)));
        // if already loaded, resolve
        if (existing.readyState === 'complete' || existing.dataset.loaded === 'true') return resolve(src);
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = () => {
        s.dataset.loaded = 'true';
        resolve(src);
      };
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(s);
    } catch (e) {
      reject(e);
    }
  });
}

export function loadScriptsSequential(urls) {
  // Load scripts in order (some plugins expect jQuery first)
  return urls.reduce((p, url) => p.then(() => loadScript(url)), Promise.resolve());
}

export function resolveUrl(basePublicPath, src) {
  if (!src) return null;
  // if absolute URL, return as-is
  if (/^https?:\/\//i.test(src)) return src;
  // if starts with '/', treat as site-root relative
  if (src.startsWith('/')) return src;
  // otherwise, resolve relative to the public publications folder
  // ensure basePublicPath ends with '/'
  const base = basePublicPath.endsWith('/') ? basePublicPath : basePublicPath + '/';
  return base + src.replace(/^\.\//, '');
}
