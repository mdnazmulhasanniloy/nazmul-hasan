export type Project = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  longDescription: string;
  image?: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  links: { label: string; href: string; kind: "web" | "android" | "ios" | "github" }[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "prime-pilates",
    index: "01",
    title: "Prime Pilates",
    kicker: "Fitness booking ecosystem",
    description: "A cross-platform Pilates experience for discovering schedules, booking group or private sessions, and managing reservations.",
    longDescription: "Prime Pilates brings the studio experience into one coordinated digital product across web, Android, and iOS. Members can browse schedules, reserve preferred class times, manage bookings, and stay informed about studio news and promotions.",
    stack: ["Web Platform", "Android", "iOS", "Booking System"],
    metrics: [{ value: "5K+", label: "Android downloads" }, { value: "3", label: "live platforms" }, { value: "1", label: "booking experience" }],
    links: [
      { label: "Live website", href: "https://primepilates.qa/", kind: "web" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.prime.pilates.app&hl=en", kind: "android" },
      { label: "App Store", href: "https://apps.apple.com/us/app/prime-pilates/id6741531586", kind: "ios" },
    ],
    highlights: ["Group and private class booking", "Schedule and reservation management", "Studio news and promotions", "Cross-platform member experience"],
  },
  {
    slug: "friendzy-club",
    index: "02",
    title: "Friendzy.club",
    kicker: "Cross-platform social product",
    description: "A mobile-first community product supported by a dedicated backend and distributed through both major app stores.",
    longDescription: "Friendzy.club connects a cross-platform mobile experience to a purpose-built backend service. The work focuses on reliable application workflows, maintainable API boundaries, and consistent behavior across Android and iOS clients.",
    stack: ["Backend API", "Android", "iOS", "Mobile Platform"],
    metrics: [{ value: "2", label: "mobile platforms" }, { value: "1", label: "dedicated backend" }, { value: "24/7", label: "product access" }],
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.prashanthja.friendzyclub&hl=en", kind: "android" },
      { label: "App Store", href: "https://apps.apple.com/us/app/friendzy-club/id6762437271", kind: "ios" },
      { label: "Backend repository", href: "https://github.com/mdnazmulhasanniloy/prashanthja_backend", kind: "github" },
    ],
    highlights: ["Dedicated backend service", "Android and iOS distribution", "Cross-platform application workflows", "Maintainable API foundation"],
  },
  {
    slug: "before-after-story",
    index: "03",
    title: "Before After Story",
    kicker: "Verified transformation platform",
    description: "A marketplace connecting customers with trusted businesses through authentic before-and-after stories and verified results.",
    longDescription: "Before After Story helps customers discover genuine transformations across industries, engage with trusted professionals, and make informed decisions. Businesses can demonstrate results through verified customer stories and build trust with prospective clients.",
    stack: ["Web Platform", "Marketplace", "Business Profiles", "Customer Stories"],
    metrics: [{ value: "2", label: "user audiences" }, { value: "1", label: "trust platform" }, { value: "Web", label: "live product" }],
    links: [{ label: "Live website", href: "https://beforeafterstory.com/", kind: "web" }],
    highlights: ["Verified before-and-after stories", "Customer and business journeys", "Service discovery", "Trust-led marketplace experience"],
  },
  {
    slug: "ss-design-gallery",
    index: "04",
    title: "SS Design Gallery",
    kicker: "Design discovery application",
    description: "A searchable collection of stainless-steel gates, grills, railings, furniture, pricing information, and saved design ideas.",
    longDescription: "SS Design Gallery helps homeowners, fabricators, and contractors explore a large, organized collection of modern stainless-steel designs. Users can search categories, save favorites, create custom folders, check price information, and download design references.",
    stack: ["Web Platform", "Android", "Search", "Wishlist"],
    metrics: [{ value: "1K+", label: "Android downloads" }, { value: "2", label: "live platforms" }, { value: "6+", label: "design categories" }],
    links: [
      { label: "Live website", href: "https://ssdesigngallery.com/", kind: "web" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.ssdesigngallery.app&hl=en", kind: "android" },
    ],
    highlights: ["Categorized design gallery", "Search, wishlist, and custom folders", "Stainless-steel price list", "High-quality design downloads"],
  },
  {
    slug: "yoke",
    index: "05",
    title: "Yoke",
    kicker: "Event transportation & logistics",
    description: "A digital platform for a national event transportation and logistics company serving complex production movements.",
    longDescription: "Yoke presents logistics services for event and production teams that need dependable transportation at national scale. The platform communicates capabilities, projects, customer relationships, carrier information, and quote workflows.",
    stack: ["Web Platform", "Backend", "Logistics", "Lead Workflow"],
    metrics: [{ value: "US", label: "national coverage" }, { value: "B2B", label: "service model" }, { value: "24/7", label: "logistics mindset" }],
    links: [
      { label: "Live website", href: "https://www.yoke.co/", kind: "web" },
      { label: "Repository", href: "https://github.com/mdnazmulhasanniloy/yekeo.co", kind: "github" },
    ],
    highlights: ["Event transportation positioning", "Customer and carrier journeys", "Project showcase", "Quote and lead-generation workflow"],
  },
  {
    slug: "flavora-food",
    index: "06",
    title: "Flavora Food",
    kicker: "Halal food platform",
    description: "A web-based food product supported by a dedicated backend repository and production-facing service.",
    longDescription: "Flavora Food pairs a customer-facing web experience with a dedicated halal-food backend. The project demonstrates a separated service architecture designed to support food-related product data and application workflows.",
    stack: ["Web Platform", "Backend API", "Food Tech", "Production Service"],
    metrics: [{ value: "2", label: "application layers" }, { value: "1", label: "backend service" }, { value: "Web", label: "live channel" }],
    links: [
      { label: "Live website", href: "http://flavorafood.com/", kind: "web" },
      { label: "Backend repository", href: "https://github.com/mdnazmulhasanniloy/halal_food_backend", kind: "github" },
    ],
    highlights: ["Dedicated backend repository", "Separated web and service layers", "Production-facing website", "Food platform foundation"],
  },
];

export const posts = [
  { slug: "idempotency-at-scale", date: "12 JUN 2025", read: "8 MIN", category: "SYSTEM DESIGN", title: "Idempotency is not a boolean", excerpt: "A practical field guide to retries, deduplication windows, and the edge cases that make distributed writes difficult." },
  { slug: "boring-databases", date: "28 MAY 2025", read: "6 MIN", category: "DATABASES", title: "The quiet advantage of boring databases", excerpt: "Why predictable relational systems still win—and how to recognize when they genuinely do not." },
  { slug: "queues-lie", date: "04 APR 2025", read: "10 MIN", category: "ARCHITECTURE", title: "Your queue is telling you a useful lie", excerpt: "Understanding delivery semantics, backpressure, and the operational reality behind message-driven systems." },
];

export const experience = [
  {
    period: "Jun 2025 — Present",
    role: "Senior Backend Developer",
    company: "Spark Tech Agency",
    mode: "On-site",
    location: "Mohakhali, Dhaka",
    text: "Leading backend architecture for multiple client projects and maintaining production APIs serving more than 10,000 users.",
    tags: ["TypeScript", "PostgreSQL", "Prisma", "Nginx"],
    highlights: [
      "Leading backend architecture for multiple client projects",
      "Designing and maintaining RESTful APIs serving 10k+ users",
      "Optimizing Nginx reverse proxy and server configuration",
      "Mentoring junior developers and conducting code reviews",
    ],
  },
  {
    period: "Jun 2024 — May 2025",
    role: "Backend Developer",
    company: "Spark Tech Agency",
    mode: "On-site",
    location: "Dhaka, Bangladesh",
    text: "Built scalable backend services for e-commerce and booking platforms while improving database performance and access control.",
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    highlights: [
      "Built scalable REST APIs for e-commerce and booking platforms",
      "Implemented JWT authentication and role-based access control",
      "Improved database query performance by 40% through indexing",
      "Collaborated with the front-end team on full-stack MERN projects",
    ],
  },
  {
    period: "May 2023 — Aug 2023",
    role: "Full-Stack Developer Intern",
    company: "Geeks of Gurukul",
    mode: "Remote",
    location: "Bengaluru, Karnataka, India",
    text: "Developed product features for an internal learning platform, with a focus on server rendering, integrations, and delivery within an agile team.",
    tags: ["React", "Node.js", "MongoDB", "Server-Side Rendering"],
    highlights: [
      "Developed full-stack features for the internal learning platform",
      "Built server-rendered pages that improved SEO and load performance",
      "Integrated third-party APIs and payment gateways",
      "Participated in agile sprints and daily stand-ups",
    ],
  },
];

export type SkillCategory = "Front-End" | "Back-End" | "Database" | "DevOps";

export type TechnicalSkill = {
  name: string;
  level: "Expert" | "Advanced" | "Proficient" | "Intermediate" | "Beginner";
  description: string;
  percentage: number;
  category: SkillCategory;
};

export const technicalSkills: TechnicalSkill[] = [
  { name: "React.js", level: "Expert", description: "Component-driven UIs", percentage: 90, category: "Front-End" },
  { name: "TypeScript", level: "Advanced", description: "Type-safe JavaScript", percentage: 82, category: "Front-End" },
  { name: "Tailwind CSS", level: "Expert", description: "Utility-first CSS", percentage: 90, category: "Front-End" },
  { name: "Redux", level: "Proficient", description: "State management", percentage: 78, category: "Front-End" },
  { name: "Shadcn/UI", level: "Advanced", description: "Component library", percentage: 80, category: "Front-End" },
  { name: "HTML5", level: "Expert", description: "Semantic markup", percentage: 96, category: "Front-End" },
  { name: "CSS3", level: "Expert", description: "Styling and animations", percentage: 92, category: "Front-End" },
  { name: "Next.js", level: "Proficient", description: "Full-stack React", percentage: 72, category: "Front-End" },
  { name: "Node.js", level: "Advanced", description: "Server-side JavaScript", percentage: 85, category: "Back-End" },
  { name: "Express.js", level: "Advanced", description: "Web framework", percentage: 86, category: "Back-End" },
  { name: "REST API", level: "Advanced", description: "API design", percentage: 88, category: "Back-End" },
  { name: "GraphQL", level: "Intermediate", description: "Query language", percentage: 60, category: "Back-End" },
  { name: "Prisma", level: "Proficient", description: "Type-safe ORM", percentage: 75, category: "Back-End" },
  { name: "MongoDB", level: "Advanced", description: "NoSQL database", percentage: 80, category: "Database" },
  { name: "PostgreSQL", level: "Proficient", description: "Relational database", percentage: 70, category: "Database" },
  { name: "MySQL", level: "Beginner", description: "SQL database", percentage: 55, category: "Database" },
  { name: "Redis", level: "Beginner", description: "In-memory caching", percentage: 58, category: "Database" },
  { name: "Docker", level: "Proficient", description: "Containerization", percentage: 72, category: "DevOps" },
  { name: "Nginx", level: "Proficient", description: "Web server and proxy", percentage: 74, category: "DevOps" },
  { name: "Git", level: "Advanced", description: "Version control", percentage: 88, category: "DevOps" },
  { name: "Linux", level: "Proficient", description: "Server management", percentage: 70, category: "DevOps" },
  { name: "AWS", level: "Beginner", description: "Cloud services", percentage: 50, category: "DevOps" },
];

export const testimonials = [
  { quote: "Nazmul has the rare ability to make a complex system understandable. He gave us an architecture we could grow into without slowing the team down.", name: "Arif Rahman", role: "Product Director", company: "Northstar Labs" },
  { quote: "He thinks beyond the happy path. Our release confidence and visibility changed completely after he rebuilt the service foundation.", name: "Sarah Ahmed", role: "Engineering Lead", company: "Product Studio" },
  { quote: "A sharp engineer and an excellent collaborator. Nazmul turned vague requirements into a backend that was simple to operate and ready to scale.", name: "Imran Chowdhury", role: "Founder", company: "Launchcraft" },
  { quote: "The performance gains were impressive, but the real value was clarity. Our team finally understood where the system was strong and where it could fail.", name: "Nadia Karim", role: "Head of Product", company: "Orbit Commerce" },
  { quote: "Nazmul combines deep technical judgment with pragmatic delivery. He consistently found the simplest reliable solution and communicated every tradeoff.", name: "Fahim Anwar", role: "CTO", company: "Scalegrid" },
];

export const education = [
  {
    index: "01",
    period: "2024 — Present",
    degree: "BSc in Computer Science and Engineering",
    institution: "Canadian University of Bangladesh",
    description: "Currently pursuing a Bachelor of Science in Computer Science and Engineering.",
    current: true,
  },
  {
    index: "02",
    period: "2019 — 2023",
    degree: "Diploma in Computer Science and Engineering",
    institution: "Comilla Private Polytechnic Institute",
    description: "Completed a four-year Diploma under the Bangladesh Technical Education Board.",
    current: false,
  },
];

export const courses = [
  {
    period: "Jul 2022 — Dec 2022",
    title: "Complete Web Development",
    provider: "Programming Hero",
    description: "Completed the Complete Web Development course from Programming Hero.",
    certificate: "https://drive.google.com/file/d/1X2ENFhi3qgo-C5TIJosejNojpSSNnIID/view?usp=drivesdk",
  },
  {
    period: "Jan 2020 — Jun 2022",
    title: "Web Design",
    provider: "Bdtask Ltd & TEXxIT BD",
    description: "Completed a 216-hour course under the Incubation Center Project of the Bangladesh Hi-Tech Park Authority.",
    certificate: "https://drive.google.com/file/d/1AeFS3T8P0OC_ltSvSZ3EWT_nukb_2yhC/view?usp=drivesdk",
  },
  {
    period: "Aug 2021 — Dec 2021",
    title: "Mobile Application Project",
    provider: "Bangladesh ICT Division",
    description: "Successfully completed 200 hours of training in mobile application development.",
    certificate: "https://drive.google.com/file/d/1AbPXvi0Kw-SOcAGGfy9nHee7_88A-YAn/view?usp=drivesdk",
  },
];
