import React from 'react';

const navLinks = [
  { label: 'Home', href: 'https://mosc.in/' },
  { label: 'The Catholicate', href: 'http://mosc.in/catholicate' },
  { label: 'Administration', href: 'http://mosc.in/administration' },
  { label: 'The Church', href: 'http://mosc.in/the_church' },
  { label: 'Holy Synod', href: 'http://mosc.in/holysynod/' },
  { label: 'Dioceses', href: 'http://mosc.in/dioceses' },
  { label: 'Spiritual Organisations', href: 'http://mosc.in/spiritual/' },
  { label: 'Saints', href: 'http://mosc.in/saints/' }
];

const PublicationsHeader = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src="/public/publications/app/images/logo_inner.png" alt="MOSC" className="w-36 h-auto" />
          <div>
            <h1 className="font-heading text-2xl text-foreground">Malankara Orthodox Syrian Church</h1>
            <p className="font-body text-sm text-muted-foreground">Publications</p>
          </div>
        </div>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-body text-sm text-foreground hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile search and social */}
      <div className="mt-4 flex items-center justify-between">
        <form id="searchbox" className="searchbox w-full md:w-1/2" action="https://mosc.in/" method="get">
          <label htmlFor="sid" className="sr-only">Search</label>
          <div className="relative">
            <input id="sid" type="search" name="s" placeholder="Search..." className="searchbox-input w-full rounded-md border border-border px-3 py-2" />
            <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded">Go</button>
          </div>
        </form>

        <div className="hidden md:flex items-center space-x-3">
          <img src="/public/publications/app/images/ficon.jpg" alt="facebook" className="w-6 h-6" />
          <img src="/public/publications/app/images/twittericon.jpg" alt="twitter" className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};

export default PublicationsHeader;
