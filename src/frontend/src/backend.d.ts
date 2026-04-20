import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    date: string;
    published: boolean;
    author: string;
    imageUrl: string;
    excerpt: string;
    category: string;
}
export interface SuccessStory {
    id: bigint;
    title: string;
    storyText: string;
    beneficiaryName: string;
    date: string;
    imageUrl: string;
    location: string;
    program: string;
}
export interface VolunteerApplication {
    id: bigint;
    city: string;
    name: string;
    email: string;
    availability: string;
    timestamp: bigint;
    phone: string;
    skills: string;
}
export interface AdminStats {
    volunteerCount: bigint;
    storyCount: bigint;
    galleryCount: bigint;
    eventCount: bigint;
    blogCount: bigint;
}
export interface GalleryImage {
    id: bigint;
    title: string;
    date: string;
    description: string;
    imageKey: string;
    category: string;
    location: string;
    uploadedAt: bigint;
}
export interface PartnerInquiry {
    id: bigint;
    contactPerson: string;
    email: string;
    timestamp: bigint;
    partnershipNature: string;
    organization: string;
}
export interface Event {
    id: bigint;
    status: string;
    title: string;
    date: string;
    description: string;
    imageUrl: string;
    registrationsOpen: boolean;
    category: string;
    location: string;
}
export interface ContactSubmission {
    id: bigint;
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface EventRegistration {
    id: bigint;
    eventId: bigint;
    name: string;
    email: string;
    timestamp: bigint;
    phone: string;
}
export interface InternshipApplication {
    id: bigint;
    area: string;
    city: string;
    name: string;
    email: string;
    timestamp: bigint;
    phone: string;
}
export interface ProgramContent {
    id: string;
    stat1Label: string;
    tagline: string;
    stat2Value: string;
    name: string;
    description: string;
    heroImage: string;
    stat2Label: string;
    updatedAt: bigint;
    stat3Value: string;
    howItWorks: Array<string>;
    stat1Value: string;
    stat3Label: string;
}
export interface NewsletterSignup {
    id: bigint;
    email: string;
    timestamp: bigint;
}
export interface backendInterface {
    addBlogPost(title: string, excerpt: string, content: string, category: string, date: string, imageUrl: string, author: string): Promise<bigint>;
    addEvent(title: string, description: string, date: string, location: string, category: string, imageUrl: string, status: string, registrationsOpen: boolean): Promise<bigint>;
    addGalleryImage(title: string, description: string, category: string, date: string, location: string, imageKey: string): Promise<bigint>;
    addSuccessStory(title: string, beneficiaryName: string, location: string, program: string, storyText: string, imageUrl: string, date: string): Promise<bigint>;
    applyInternship(name: string, email: string, phone: string, city: string, area: string): Promise<bigint>;
    applyVolunteer(name: string, email: string, phone: string, city: string, skills: string, availability: string): Promise<bigint>;
    deleteBlogPost(id: bigint): Promise<boolean>;
    deleteEvent(id: bigint): Promise<boolean>;
    deleteGalleryImage(id: bigint): Promise<boolean>;
    deleteSuccessStory(id: bigint): Promise<boolean>;
    getAdminSettings(): Promise<{
        chairpersonPhotoKey?: string;
        adminPrincipals: Array<Principal>;
        razorpayKeyId?: string;
        treasurerPhotoKey?: string;
        secretaryPhotoKey?: string;
        ngoStats: {
            districtsCovered: string;
            villagesCovered: string;
            volunteers: string;
            treesPlanted: string;
            acresConserved: string;
            panchayatsCovered: string;
            householdsCovered: string;
            farmersTrained: string;
        };
    }>;
    getAdminStats(): Promise<AdminStats>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getBlogPostsByCategory(category: string): Promise<Array<BlogPost>>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getEventRegistrations(eventId: bigint): Promise<Array<EventRegistration>>;
    getGalleryImagesByCategory(category: string): Promise<Array<GalleryImage>>;
    getInternshipApplications(): Promise<Array<InternshipApplication>>;
    getNewsletterSignups(): Promise<Array<NewsletterSignup>>;
    getPartnerInquiries(): Promise<Array<PartnerInquiry>>;
    getPastEvents(): Promise<Array<Event>>;
    getProgramContent(id: string): Promise<ProgramContent | null>;
    getUpcomingEvents(): Promise<Array<Event>>;
    getVolunteerApplications(): Promise<Array<VolunteerApplication>>;
    listBlogPosts(): Promise<Array<BlogPost>>;
    listEvents(): Promise<Array<Event>>;
    listGalleryImages(): Promise<Array<GalleryImage>>;
    listPrograms(): Promise<Array<ProgramContent>>;
    listSuccessStories(): Promise<Array<SuccessStory>>;
    listSuccessStoriesByProgram(programId: string): Promise<Array<SuccessStory>>;
    registerForEvent(eventId: bigint, name: string, email: string, phone: string): Promise<bigint>;
    submitContact(name: string, email: string, subject: string, message: string): Promise<bigint>;
    submitPartnerInquiry(organization: string, contactPerson: string, email: string, partnershipNature: string): Promise<bigint>;
    subscribeNewsletter(email: string): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateAdminPrincipals(principals: Array<Principal>): Promise<{
        ok: boolean;
        err?: string;
    }>;
    updateBlogPost(id: bigint, title: string, excerpt: string, content: string, category: string, date: string, imageUrl: string, author: string, published: boolean): Promise<boolean>;
    updateEvent(id: bigint, title: string, description: string, date: string, location: string, category: string, imageUrl: string, status: string, registrationsOpen: boolean): Promise<boolean>;
    updateGalleryImage(id: bigint, title: string, description: string, category: string, date: string, location: string): Promise<boolean>;
    updateNgoStats(treesPlanted: string, villagesCovered: string, volunteers: string, acresConserved: string, farmersTrained: string, panchayatsCovered: string, householdsCovered: string): Promise<{
        ok: boolean;
        err?: string;
    }>;
    updateRazorpayKeyId(keyId: string): Promise<{
        ok: boolean;
        err?: string;
    }>;
    updateSuccessStory(id: bigint, title: string, beneficiaryName: string, location: string, program: string, storyText: string, imageUrl: string, date: string): Promise<boolean>;
    updateTeamPhotos(secretaryKey: string | null, chairpersonKey: string | null, treasurerKey: string | null): Promise<{
        ok: boolean;
        err?: string;
    }>;
    upsertProgramContent(content: ProgramContent): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
