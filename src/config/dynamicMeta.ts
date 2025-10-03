// src/config/dynamicMeta.ts

import { MetaEntry } from "./metaConfig"

// Example blog metadata (can later come from CMS or Supabase)
export const blogMeta: Record<string, MetaEntry> = {
  "driving-test-tips": {
    title: "10 Tips to Pass Your Driving Test in Nigeria",
    description:
      "Struggling with your driving test? Here are 10 proven tips to boost your chances of passing the first time.",
  },
  "road-safety-guide": {
    title: "Road Safety Guide for Nigerian Drivers",
    description:
      "Stay safe on Nigerian roads with these essential road safety rules and driving best practices.",
  },
}
export const getBlogMeta = (slug: string): MetaEntry | null => {
  return blogMeta[slug] || null
}