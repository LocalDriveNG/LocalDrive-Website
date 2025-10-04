// src/components/SEO.tsx

import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"
import metaConfig, { MetaConfig } from "@/config/metaConfig"

const SEO: React.FC = () => {
  const { pathname } = useLocation()

  // Don't render SEO for blog posts (they handle their own metadata)
  if (pathname.startsWith("/blog/")) {
    return null
  }

  // pick meta safely with fallback to "/"
  const meta =
    (metaConfig as MetaConfig)[pathname] || metaConfig["/"]

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}

export default SEO
