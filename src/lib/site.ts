import type { PersonalProject, TeamProject } from "@/data/projects";

export const SITE_URL = "https://nikhil-eng.vercel.app";
export const SITE_NAME = "Nikhil Patel";
export const SITE_TITLE = "Nikhil Patel | Electrical Engineering Portfolio";
export const SITE_DESCRIPTION =
  "Electrical engineering portfolio featuring rocketry, embedded systems, robotics, and hardware design projects by Nikhil Patel.";
export const SITE_AUTHOR = "Nikhil Patel";
export const SITE_IMAGE = `${SITE_URL}/profile-photo.JPG`;
export const PERSON_ID = `${SITE_URL}#person`;
export const WEBSITE_ID = `${SITE_URL}#website`;

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  image: SITE_IMAGE,
  jobTitle: "Electrical Engineering Student",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Saskatchewan",
  },
  homeLocation: {
    "@type": "Place",
    name: "Saskatoon, SK, Canada",
  },
  sameAs: [
    "https://github.com/nikhil-iso",
    "https://www.linkedin.com/in/nikhil-patel-ba1581281/",
  ],
  knowsAbout: [
    "Electrical engineering",
    "Embedded systems",
    "Rocketry",
    "Robotics",
    "Hardware design",
    "Computer vision",
  ],
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Nikhil Patel Engineering Portfolio",
  description: SITE_DESCRIPTION,
  author: {
    "@id": PERSON_ID,
  },
};

export const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: `${SITE_URL}/`,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": PERSON_ID,
    },
  },
  websiteStructuredData,
  personStructuredData,
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function buildCollectionStructuredData(
  name: string,
  description: string,
  path: string,
  items: Array<{ name: string; path: string }>,
) {
  const pageUrl = absoluteUrl(path);

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name,
      description,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": PERSON_ID,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  ];
}

export function buildBreadcrumbStructuredData(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildProjectStructuredData(
  project: PersonalProject | TeamProject,
  path: string,
  keywords: string[],
) {
  const pageUrl = absoluteUrl(path);
  const images = collectProjectImages(project);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${project.title} | ${SITE_NAME}`,
      description: project.description,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": PERSON_ID,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${pageUrl}#project`,
      url: pageUrl,
      name: project.title,
      description: project.description,
      image: images,
      author: {
        "@id": PERSON_ID,
      },
      keywords: keywords.join(", "),
    },
  ];
}

function collectProjectImages(project: PersonalProject | TeamProject) {
  const imageSet = new Set<string>();

  if (project.cardImage) {
    imageSet.add(absoluteUrl(project.cardImage));
  }

  for (const image of project.images ?? []) {
    imageSet.add(absoluteUrl(image));
  }

  for (const item of project.gallery ?? []) {
    if (item.type === "image") {
      imageSet.add(absoluteUrl(item.src));
    }
  }

  return [...imageSet];
}
