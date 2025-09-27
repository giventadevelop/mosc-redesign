import React from 'react';

const PublicationsFooter = () => {
  return (
    <footer className="mt-12 pt-8 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="font-body text-sm text-muted-foreground">© 2015 The Malankara Orthodox Church, All Rights Reserved.</div>
        <div className="hidden md:block">
          <ul className="flex items-center space-x-4 font-body text-sm text-foreground">
            <li><a href="https://www.facebook.com/catholicatenews.in">CATHOLICATE NEWS</a></li>
            <li><a href="http://mosc.in/downloads/">DOWNLOADS</a></li>
            <li><a href="http://mosc.in/photo-gallery/">GALLERY</a></li>
            <li><a href="http://mosc.in/contact-info/">CONTACT INFO</a></li>
          </ul>
        </div>
        <div className="font-caption text-xs text-muted-foreground text-right">Created by : Ipsr solutions ltd</div>
      </div>
    </footer>
  );
};

export default PublicationsFooter;
