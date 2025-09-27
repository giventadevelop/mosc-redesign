import React, { useEffect, useState } from 'react';
import PublicationsSidebar from './components/PublicationsSidebar';
import PublicationsHeader from './components/PublicationsHeader';
import PublicationsFooter from './components/PublicationsFooter';
import PublicationsList from './components/PublicationsList';
import { loadScriptsSequential, resolveUrl } from '../../utils/legacyLoader';

const Publications = () => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    let mounted = true;

    const candidates = ['/publications/index.html', '/publications/publications/index.html'];

    const tryFetch = async () => {
      let res = null;
      let text = null;
      for (const path of candidates) {
        try {
          res = await fetch(path);
          if (res.ok) {
            text = await res.text();
            break;
          }
        } catch (e) {
          // ignore and try next
        }
      }
      if (!text) throw new Error('Legacy index.html not found in /publications');
      return text;
    };

    tryFetch()
      .then((text) => {
        if (!mounted) return;
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');

          // Inject styles from legacy head
          const headLinks = Array.from(doc.head.querySelectorAll('link[rel="stylesheet"]'));
          headLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (!href) return;
            if (!document.head.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
              const newLink = document.createElement('link');
              newLink.rel = 'stylesheet';
              newLink.href = href;
              document.head.appendChild(newLink);
            }
          });

          const headStyles = Array.from(doc.head.querySelectorAll('style'));
          headStyles.forEach((style) => {
            const txt = style.textContent || '';
            const exists = Array.from(document.head.querySelectorAll('style')).some((s) => s.textContent === txt);
            if (!exists) {
              const newStyle = document.createElement('style');
              newStyle.textContent = txt;
              document.head.appendChild(newStyle);
            }
          });

          // Collect scripts
          const scriptEls = Array.from(doc.querySelectorAll('script'));
          const scriptSrcs = scriptEls.map((s) => s.getAttribute('src')).filter(Boolean);
          const inlineScripts = scriptEls.filter((s) => !s.getAttribute('src')).map((s) => s.textContent || '');
          // remove scripts from parsed doc
          Array.from(doc.querySelectorAll('script')).forEach((s) => s.remove());

          // Extract publication entries
          const entries = [];
          const boxes = Array.from(doc.querySelectorAll('.cnt-box'));
          boxes.forEach((box) => {
            const img = box.querySelector('img') ? box.querySelector('img').getAttribute('src') : null;
            const titleEl = box.querySelector('h2');
            const title = titleEl ? titleEl.textContent.trim() : '';
            const excerptEl = box.querySelector('p');
            const excerpt = excerptEl ? excerptEl.textContent.trim() : '';
            const linkEl = box.querySelector('a.more');
            const link = linkEl ? linkEl.getAttribute('href') : null;
            entries.push({ img, title, excerpt, link });
            box.remove();
          });

          // Strip legacy header/footer to let React header/footer take over
          try {
            Array.from(doc.querySelectorAll('header, footer')).forEach((el) => el.remove());
            const innerWrappers = doc.querySelectorAll('.inner-wrapper, #wrapper');
            Array.from(innerWrappers).forEach((el) => {
              const h = el.querySelectorAll('header, footer');
              Array.from(h).forEach((x) => x.remove());
            });
          } catch (e) {}

          const bodyHtml = doc.body ? doc.body.innerHTML : text;
          setContent(bodyHtml);
          setPublications(entries);

          // load scripts sequentially from public folder or absolute URLs
          setTimeout(() => {
            const basePublic = '/public/publications';
            const resolved = scriptSrcs.map((src) => resolveUrl(basePublic, src)).filter(Boolean);
            if (resolved.length > 0) {
              loadScriptsSequential(resolved)
                .then(() => {
                  inlineScripts.forEach((code) => {
                    try {
                      // eslint-disable-next-line no-new-func
                      const fn = new Function(code);
                      fn();
                    } catch (e) {
                      console.warn('Error executing inline legacy script', e);
                    }
                  });

                  if (window.jQuery) {
                    try {
                      window.jQuery(document).ready(() => {
                        window.dispatchEvent(new Event('legacy-scripts-loaded'));
                      });
                    } catch (e) {
                      window.dispatchEvent(new Event('legacy-scripts-loaded'));
                    }
                  } else {
                    window.dispatchEvent(new Event('legacy-scripts-loaded'));
                  }
                })
                .catch((e) => console.warn('Failed to load legacy scripts', e));
            } else {
              inlineScripts.forEach((code) => {
                try {
                  const fn = new Function(code);
                  fn();
                } catch (e) {
                  console.warn('Error executing inline legacy script', e);
                }
              });
            }
          }, 50);
        } catch (e) {
          setError(e.message || 'Failed to parse legacy HTML');
        }
      })
      .catch((e) => {
        setError(e.message || 'Failed to fetch legacy page');
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    function initLegacyPlugins() {
      try {
        if (window.jQuery) {
          const $ = window.jQuery;

          // easyResponsiveTabs
          if ($.fn && $.fn.easyResponsiveTabs) {
            try { $('#parentHorizontalTab').easyResponsiveTabs({ type: 'default', width: 'auto', fit: true, tabidentify: 'hor_1' }); } catch (e) {}
          }

          // zebra tooltips
          try { if (typeof window.zebra_tooltips === 'function') window.zebra_tooltips(); } catch (e) {}

          // magnificPopup / lightbox
          try {
            if ($.fn && $.fn.magnificPopup) {
              $('.gallery a, a.lightbox, a[data-lightbox]').magnificPopup({ type: 'image', gallery: { enabled: true } });
            }
            if ($.fn && $.fn.lightbox) {
              try { $('.gallery a').lightbox(); } catch (e) {}
            }
          } catch (e) {}

          // prettify, toolbar, bootstrap tooltips and other initializers
          try { if (window.prettyPrint) window.prettyPrint(); } catch (e) {}
          try { if ($.fn && $.fn.toolbar) { $('.toolbar').toolbar(); } } catch (e) {}
          try { if ($.fn && $.fn.tooltip) { $('[data-toggle="tooltip"]').tooltip(); } } catch (e) {}

          // menu collapse
          try {
            $('[data-toggle=collapse-side]').off('click').on('click', function() {
              var $sideslider = $(this);
              var sel = $sideslider.attr('data-target');
              var sel2 = $sideslider.attr('data-target-2');
              $(sel).toggleClass('in');
              $(sel2).toggleClass('out');
            });
          } catch (e) {}

        }
      } catch (e) {
        console.warn('Legacy plugin init failed', e);
      }
    }

    if (window.jQuery) initLegacyPlugins();
    else window.addEventListener('legacy-scripts-loaded', initLegacyPlugins);

    return () => window.removeEventListener('legacy-scripts-loaded', initLegacyPlugins);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-gradient-to-br from-background to-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center sacred-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v6h6v-6c0-1.657-1.343-3-3-3zM12 2a4 4 0 110 8 4 4 0 010-8z" />
                </svg>
              </div>
              <h1 className="font-heading font-semibold text-3xl lg:text-4xl text-foreground">Publications</h1>
            </div>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Browse publications and archival materials from the Malankara Orthodox Syrian Church. The legacy content is
              rendered below; original assets are served from <code>/public/publications/</code>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PublicationsHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {error ? (
                <div className="bg-destructive/5 border border-border rounded-lg p-6">
                  <p className="font-body text-destructive-foreground">Error loading legacy content: {error}</p>
                </div>
              ) : content === null ? (
                <div className="bg-card rounded-lg p-6 sacred-shadow">
                  <p className="font-body text-muted-foreground">Loading legacy publications...</p>
                </div>
              ) : (
                <div className="bg-card rounded-lg p-6 sacred-shadow space-y-6">
                  {publications && publications.length > 0 && (
                    <PublicationsList items={publications} />
                  )}

                  <div className="legacy-html" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <PublicationsSidebar />
            </div>
          </div>
          <PublicationsFooter />
        </div>
      </section>
    </div>
  );
};

export default Publications;
