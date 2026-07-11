import { Helmet } from "react-helmet-async";

const SITE_URL = "https://iyegeresk.web.app";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  "Iyegere Success Karboloo - Full-Stack Engineer in Nigeria building fast, reliable web and mobile products with React, React Native, Next.js and Node.js.";

interface SEOProps {
  /** Page title. Rendered as "<title> | Iyegere Success Karboloo" unless it is the home page. */
  title: string;
  description?: string;
  /** Route path, e.g. "/projects" or "/projects/mystra-app". Used for canonical + og:url. */
  path?: string;
  /** Absolute URL to a preview image. Defaults to the site OG card. */
  image?: string;
  /** Set true on the home page so the title is not suffixed. */
  isHome?: boolean;
  /** Keep the page out of search indexes (e.g. 404). */
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  isHome = false,
  noindex = false,
}) => {
  const url = `${SITE_URL}${path === "/" ? "" : path}` + (path === "/" ? "/" : "");
  const fullTitle = isHome ? title : `${title} | Iyegere Success Karboloo`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Iyegere Success Karboloo" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
