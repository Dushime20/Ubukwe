interface ServiceSchemaProps {
  service: {
    id: string | number;
    title: string;
    provider: string;
    description: string;
    price: string;
    rating: number;
    reviews: number;
    location: string;
    category?: string;
    image?: string;
  };
}

export function ServiceSchema({ service }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: service.provider,
      address: {
        "@type": "PostalAddress",
        addressLocality: service.location,
      },
    },
    description: service.description,
    offers: {
      "@type": "Offer",
      price: service.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "RWF",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: service.rating.toString(),
      reviewCount: service.reviews.toString(),
    },
    image: service.image || undefined,
    serviceType: service.category || "Wedding Service",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

