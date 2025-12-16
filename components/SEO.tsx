import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'MMR Burwan | Muslim Marriage Registration | Nikah Registration Murshidabad',
  description = 'Official Muslim marriage registration & nikah registration online for West Bengal, Murshidabad. Government approved qazi service. Apply nikah certificate online, download marriage certificate. Authorized registrar for Burwan, Berhampore, Farakka & 21 blocks.',
  keywords = 'MMR registration, Muslim marriage registration, nikah registration, Muslim marriage certificate, nikah certificate, qazi registration, MMR Burwan, nikah registration West Bengal, Muslim marriage registration Murshidabad, online nikah registration, digital marriage certificate, government qazi, Islamic marriage registration, nikah nama, marriage registration near me, MMR Berhampore, MMR Farakka, Muslim marriage registration online',
  image = 'https://mmrburwan.com/og-image.jpg',
  url = 'https://mmrburwan.com',
  type = 'website',
  noindex = false,
}) => {
  const fullTitle = title.includes('MMR Burwan') ? title : `${title} | MMR Burwan`;
  const fullUrl = url.startsWith('http') ? url : `https://mmrburwan.com${url}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        } else if (selector.startsWith('meta[property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Update or create meta tags
    updateMetaTag('meta[name="title"]', 'content', fullTitle);
    updateMetaTag('meta[name="description"]', 'content', description);
    updateMetaTag('meta[name="keywords"]', 'content', keywords);

    if (noindex) {
      updateMetaTag('meta[name="robots"]', 'content', 'noindex, nofollow');
    }

    // Open Graph tags
    updateMetaTag('meta[property="og:type"]', 'content', type);
    updateMetaTag('meta[property="og:url"]', 'content', fullUrl);
    updateMetaTag('meta[property="og:title"]', 'content', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:image"]', 'content', image);
    updateMetaTag('meta[property="og:site_name"]', 'content', 'MMR Burwan');

    // Twitter tags
    updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMetaTag('meta[name="twitter:url"]', 'content', fullUrl);
    updateMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    updateMetaTag('meta[name="twitter:image"]', 'content', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
  }, [fullTitle, description, keywords, image, fullUrl, type, noindex]);

  return null;
};

export default SEO;

