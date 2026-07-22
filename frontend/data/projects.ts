export interface Project {
  id: number
  title: string
  category: string
  status: "Ongoing" | "Completed"
  location: string
  description: string
  image: string
  href: string
}

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Sustainable Fisheries Development Programme",
    category: "Fisheries Development",
    status: "Ongoing",
    location: "Islandwide",
    description:
      "Supporting sustainable fisheries practices through modern infrastructure, community engagement and resource management.",
    image: "/images/projects/project-1.jpg",
    href: "/projects/sustainable-fisheries-development",
  },
  {
    id: 2,
    title: "Harbour Infrastructure Improvement Project",
    category: "Infrastructure",
    status: "Ongoing",
    location: "Selected Fishery Harbours",
    description:
      "Upgrading fisheries harbours to improve safety, operational efficiency and services for fishing communities.",
    image: "/images/projects/project-2.jpg",
    href: "/projects/harbour-infrastructure-improvement",
  },
  {
    id: 3,
    title: "Marine Resource Conservation Initiative",
    category: "Marine Conservation",
    status: "Completed",
    location: "Coastal Areas",
    description:
      "Implemented conservation activities to protect marine biodiversity and promote responsible resource utilization.",
    image: "/images/projects/project-3.jpg",
    href: "/projects/marine-resource-conservation",
  },
]

export const projects: Project[] = [
  {
    id: 4,
    title: "Fisher Community Capacity Building Programme",
    category: "Community Development",
    status: "Ongoing",
    location: "Islandwide",
    description:
      "Training and awareness programmes for fisheries communities.",
    image: "/images/projects/project-4.jpg",
    href: "/projects/community-capacity-building",
  },
  {
    id: 5,
    title: "Digital Fisheries Information System",
    category: "Digital Transformation",
    status: "Ongoing",
    location: "National",
    description:
      "Developing digital services to improve fisheries information management.",
    image: "/images/projects/project-5.jpg",
    href: "/projects/digital-fisheries-information-system",
  },
  {
    id: 6,
    title: "Aquaculture Development Programme",
    category: "Aquaculture",
    status: "Completed",
    location: "Selected Districts",
    description:
      "Supporting aquaculture development and improving production capacity.",
    image: "/images/projects/project-6.jpg",
    href: "/projects/aquaculture-development",
  },
]