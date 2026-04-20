export interface ProgramStat {
  label: string;
  value: string;
  icon: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface Story {
  name: string;
  location: string;
  story: string;
}

export interface GalleryItem {
  url: string;
  caption: string;
}

export interface Program {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  heroImage: string;
  description: string;
  stats: ProgramStat[];
  howItWorks: HowItWorksStep[];
  stories: Story[];
  gallery: GalleryItem[];
}

export const programs: Program[] = [
  {
    id: "plantation-drives",
    name: "Plantation Drives",
    badge: "Core Initiative",
    tagline: "Restoring Bihar's Green Cover",
    heroImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80",
    description:
      "Our plantation drives target degraded land, roadsides, schools, and panchayat areas across Patna, Vaishali, Nalanda, Jahanabad, Arwal, and Ara (Bhojpur). With community participation at the core, we have planted 800+ trees — native species chosen for ecological resilience and local benefit.",
    stats: [
      { label: "Trees Planted", value: "800+", icon: "🌳" },
      { label: "Districts Covered", value: "6", icon: "🏘️" },
      { label: "Volunteers", value: "30+", icon: "🙋" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Site Selection",
        description:
          "We identify degraded land, roadsides, school grounds, and panchayat areas suitable for plantation in each district.",
      },
      {
        step: 2,
        title: "Community Mobilization",
        description:
          "Local volunteers and panchayat leaders are engaged to own and protect each plantation site.",
      },
      {
        step: 3,
        title: "Native Species Planting",
        description:
          "We plant native Bihar tree species — neem, peepal, mahua, arjun — chosen for ecological resilience and local benefit.",
      },
      {
        step: 4,
        title: "Post-Plantation Care",
        description:
          "Volunteers and community members water and protect saplings in the critical first months of growth.",
      },
    ],
    stories: [
      {
        name: "Ramawati Devi",
        location: "Nalanda",
        story:
          "Our school compound had no shade for children. After the plantation drive, 25 trees now line the school boundary — children study under natural shade.",
      },
      {
        name: "Suresh Kumar",
        location: "Vaishali",
        story:
          "We planted 40 neem trees along the main road. Today the entire road has begun to green. Our village is proud of this work.",
      },
      {
        name: "Phulo Devi",
        location: "Arwal",
        story:
          "I joined the plantation drive as a volunteer. In one day we planted 60 trees near the panchayat bhavan. My daughter helped too.",
      },
      {
        name: "Mohan Lal",
        location: "Patna (rural)",
        story:
          "The roadside trees we planted in 2023 are now providing shade to farmers walking to the fields each morning.",
      },
      {
        name: "Birendra Kumar",
        location: "Ara (Bhojpur)",
        story:
          "Tree plantation in our block was long overdue. Anumaya Sansthan organized everything — saplings, volunteers, even post-care guidance.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
        caption: "Community tree plantation in Bihar",
      },
      {
        url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
        caption: "Volunteers planting saplings",
      },
      {
        url: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
        caption: "Green cover restoration",
      },
      {
        url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
        caption: "Rural plantation drive",
      },
      {
        url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
        caption: "Native tree saplings",
      },
      {
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
        caption: "Forest restoration work",
      },
    ],
  },
  {
    id: "soil-erosion-control",
    name: "Soil Erosion Control",
    badge: "Environmental Work",
    tagline: "Protecting the Land That Feeds Us",
    heroImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    description:
      "Soil erosion threatens Bihar's agricultural heartland. We work with local farmers to deploy basic contour bunding and afforestation techniques to stabilize eroding soils and restore farm productivity. Our work is in its early phase with 40+ acres brought under conservation.",
    stats: [
      { label: "Acres Conserved", value: "40+", icon: "🌾" },
      { label: "Farmers Trained", value: "20+", icon: "👨‍🌾" },
      { label: "Districts Covered", value: "6", icon: "🗺️" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Field Assessment",
        description:
          "We assess eroding farmland and identify high-risk areas with farmers and local agricultural workers.",
      },
      {
        step: 2,
        title: "Contour Bunding",
        description:
          "Basic earthen bunds are constructed along field contours to slow water runoff and prevent soil loss.",
      },
      {
        step: 3,
        title: "Farmer Training",
        description:
          "Farmers are trained in soil conservation techniques — crop rotation, cover cropping, and sustainable plowing methods.",
      },
      {
        step: 4,
        title: "Follow-Up Support",
        description:
          "Regular field visits ensure bunds are maintained and farmers continue applying conservation practices.",
      },
    ],
    stories: [
      {
        name: "Dinesh Kumar Yadav",
        location: "Nalanda",
        story:
          "My family's farm was losing topsoil every monsoon. After the contour bunding work, we saved nearly 3 acres from erosion. The wheat yield improved this season.",
      },
      {
        name: "Sita Devi",
        location: "Arwal",
        story:
          "I learned about soil health for the first time. Anumaya trained us on simple techniques to stop our fields from washing away in the rains.",
      },
      {
        name: "Munna Prasad",
        location: "Jahanabad",
        story:
          "The earthen bunds on our 2-acre plot held last monsoon. Not a single inch of soil washed away. I taught my neighbor the same method.",
      },
      {
        name: "Hari Shankar Singh",
        location: "Vaishali",
        story:
          "We thought the land was spoiled. After afforestation work on the bund borders, the soil is recovering. We are hopeful for the coming harvest.",
      },
      {
        name: "Kamla Devi",
        location: "Ara (Bhojpur)",
        story:
          "Soil erosion had cut deep channels in our farm. After a small check dam and bunding, those channels are filling in naturally. Thank you Anumaya.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
        caption: "Bihar agricultural fields",
      },
      {
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
        caption: "Farmland conservation",
      },
      {
        url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
        caption: "Soil erosion control",
      },
      {
        url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
        caption: "Farmer training session",
      },
      {
        url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
        caption: "Contour bunding work",
      },
      {
        url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
        caption: "Rural farm support",
      },
    ],
  },
  {
    id: "community-development",
    name: "Community Development",
    badge: "Social Initiative",
    tagline: "Strong Villages, Stronger Bihar",
    heroImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80",
    description:
      "Community development is the backbone of our work. We engage local youth and village leaders through awareness programs, participatory planning, and capacity building — helping 8 panchayats and 100+ households take ownership of their environment and future.",
    stats: [
      { label: "Panchayats Engaged", value: "8", icon: "🏛️" },
      { label: "Households Covered", value: "100+", icon: "🏠" },
      { label: "Community Leaders", value: "30+", icon: "🤝" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Panchayat Engagement",
        description:
          "We partner with elected panchayat representatives to plan and implement community-led environmental programs.",
      },
      {
        step: 2,
        title: "Youth Mobilization",
        description:
          "Local youth are recruited as eco-champions who lead plantation drives and awareness campaigns in their own villages.",
      },
      {
        step: 3,
        title: "Awareness Programs",
        description:
          "Community meetings on environmental topics — soil health, tree importance, waste-free living — are conducted in village settings.",
      },
      {
        step: 4,
        title: "Capacity Building",
        description:
          "Village leaders are trained in participatory planning so they can independently drive environmental initiatives after our engagement ends.",
      },
    ],
    stories: [
      {
        name: "Anjali Kumari",
        location: "Patna (rural)",
        story:
          "I was a homemaker. Anumaya Sansthan invited me to a village awareness program. Now I lead a group of 10 women who maintain the plantation sites in our ward.",
      },
      {
        name: "Rajesh Kumar Singh",
        location: "Nalanda",
        story:
          "Our panchayat had no environmental plan. After working with Anumaya, we now have a 3-year tree plantation roadmap adopted by the gram sabha.",
      },
      {
        name: "Geeta Devi",
        location: "Vaishali",
        story:
          "The community meeting in our village opened eyes. We had no idea how degraded our local land was. Now 50 households are involved in green activities.",
      },
      {
        name: "Santosh Kumar Yadav",
        location: "Jahanabad",
        story:
          "I am a youth volunteer from Jahanabad. Anumaya trained me to lead tree drives. This year I organized 15 youth to plant 80 trees in my village.",
      },
      {
        name: "Prabha Singh",
        location: "Arwal",
        story:
          "Our village now has an environment committee with 8 members. We track every planted tree and report monthly to the panchayat. Anumaya helped us form this group.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
        caption: "Community gathering in Bihar village",
      },
      {
        url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
        caption: "Village awareness program",
      },
      {
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
        caption: "Youth volunteers meeting",
      },
      {
        url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80",
        caption: "Panchayat engagement session",
      },
      {
        url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80",
        caption: "Rural community meeting",
      },
      {
        url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
        caption: "Community development work",
      },
    ],
  },
];

export function getProgramById(id: string): Program | undefined {
  return programs.find((p) => p.id === id);
}
