export interface GalleryImage {
  id: bigint;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  imageKey: string;
  uploadedAt: bigint;
}

export interface BlogPost {
  id: bigint;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
  published: boolean;
}

export interface Event {
  id: bigint;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  imageUrl: string;
  status: string;
  registrationsOpen: boolean;
}

export interface EventRegistration {
  id: bigint;
  eventId: bigint;
  name: string;
  email: string;
  phone: string;
  timestamp: bigint;
}

export interface SuccessStory {
  id: bigint;
  title: string;
  beneficiaryName: string;
  location: string;
  storyText: string;
  imageUrl: string;
  date: string;
}

export interface AdminStats {
  galleryCount: bigint;
  blogCount: bigint;
  eventCount: bigint;
  storyCount: bigint;
  volunteerCount: bigint;
}
