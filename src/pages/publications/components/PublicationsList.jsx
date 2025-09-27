import React from 'react';

const PublicationsList = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, idx) => (
          <article key={idx} className="bg-card rounded-lg p-4 sacred-shadow">
            {it.img && (
              <div className="mb-4">
                <img src={it.img} alt={it.title} className="w-full h-40 object-cover rounded-md" />
              </div>
            )}
            <h3 className="font-heading text-lg text-foreground mb-2">{it.title}</h3>
            <p className="font-body text-muted-foreground mb-4">{it.excerpt}</p>
            {it.link && (
              <a href={it.link} className="inline-block text-primary hover:underline font-medium" target="_blank" rel="noreferrer">
                Read More
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default PublicationsList;
