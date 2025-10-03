export type MetaEntry = {
  title: string
  description: string
}

export type MetaConfig = Record<string, MetaEntry>

const metaConfig = {
  "/": {
    title: "LocalDrive - Your Journey to Confident Driving Starts Here | Connect with Certified Driving Instructors in Nigeria",
    description:
      "LocalDrive connects you with certified driving instructors in Nigeria. Book lessons, learn to drive confidently, and get on the road faster with our modern learning platform.",
  },
  "/about": {
    title: "About LocalDrive – Driving Made Simple",
    description:
      "LocalDrive connects learners with trusted instructors. Learn about our mission to make driving education safer and smarter in Nigeria.",
  },
  "/contact": {
    title: "Contact LocalDrive – Get in Touch",
    description:
      "Need help or have questions? Contact LocalDrive for support on booking driving lessons, becoming an instructor, or partnership opportunities.",
  },
  "/terms-of-service": {
    title: "Terms of Service – LocalDrive Nigeria",
    description:
      "Read LocalDrive's Terms of Service to understand the rules and guidelines for using our driving lessons platform.",
  },
  "/privacy-policy": {
    title: "Privacy Policy – Driving Tips & Road Safety in Nigeria",
    description:
      "Read LocalDrive's Privacy Policy to understand how we protect your personal information on our driving lessons platform.",
  },
  "/cookies-policy": {
    title: "Cookies Policy – LocalDrive Nigeria",
    description:
      "Read LocalDrive's Cookies Policy to understand how we use cookies to enhance your experience on our driving lessons platform.",
  },
}

export default metaConfig
