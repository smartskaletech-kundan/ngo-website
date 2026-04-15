import Types "types/common";
import AdminSettingsTypes "types/admin-settings";
import List "mo:core/List";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Time "mo:core/Time";
import GalleryApi "mixins/gallery-api";
import BlogApi "mixins/blog-api";
import EventsApi "mixins/events-api";
import StoriesApi "mixins/stories-api";
import AdminApi "mixins/admin-api";
import SettingsApi "mixins/settings-api";

actor {

  // ── Types ──────────────────────────────────────────────────────────────────

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };

  public type NewsletterSignup = {
    id : Nat;
    email : Text;
    timestamp : Int;
  };

  public type VolunteerApplication = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    city : Text;
    skills : Text;
    availability : Text;
    timestamp : Int;
  };

  public type PartnerInquiry = {
    id : Nat;
    organization : Text;
    contactPerson : Text;
    email : Text;
    partnershipNature : Text;
    timestamp : Int;
  };

  public type InternshipApplication = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    city : Text;
    area : Text;
    timestamp : Int;
  };

  // ── State ──────────────────────────────────────────────────────────────────

  let contacts : List.List<ContactSubmission> = List.empty();
  let newsletters : List.List<NewsletterSignup> = List.empty();
  let newsletterEmails : Set.Set<Text> = Set.empty();
  let volunteers : List.List<VolunteerApplication> = List.empty();
  let partners : List.List<PartnerInquiry> = List.empty();
  let internships : List.List<InternshipApplication> = List.empty();

  var nextContactId : Nat = 0;
  var nextNewsletterId : Nat = 0;
  var nextVolunteerId : Nat = 0;
  var nextPartnerId : Nat = 0;
  var nextInternshipId : Nat = 0;

  // ── Admin Settings State ───────────────────────────────────────────────────

  let adminSettings : AdminSettingsTypes.AdminSettings = {
    var razorpayKeyId = null;
    var adminPrincipals = [];
    var chairpersonPhotoKey = null;
    var treasurerPhotoKey = null;
  };

  // ── New Domain State ───────────────────────────────────────────────────────

  let galleryImages : List.List<Types.GalleryImage> = List.empty();
  // Ref cell: single-element list holding the next gallery ID counter
  let galleryIdRef : List.List<Nat> = List.singleton(0);

  let blogPosts : List.List<Types.BlogPost> = List.empty();
  let blogIdRef : List.List<Nat> = List.singleton(0);

  let events : List.List<Types.Event> = List.empty();
  let eventIdRef : List.List<Nat> = List.singleton(0);

  let eventRegistrations : List.List<Types.EventRegistration> = List.empty();
  let eventRegIdRef : List.List<Nat> = List.singleton(0);

  let successStories : List.List<Types.SuccessStory> = List.empty();
  let storyIdRef : List.List<Nat> = List.singleton(0);

  // ── Seed Data (runs once on first deploy, idempotent via size check) ────────

  if (blogPosts.size() == 0) {
    blogPosts.add({
      id = 0;
      title = "Plantation Drive Success in Nalanda";
      excerpt = "Our recent plantation drive in Nalanda district was a resounding success, with over 500 trees planted across 3 villages in a single day.";
      content = "Our recent plantation drive in Nalanda district was a resounding success, with over 500 trees planted across 3 villages in a single day. Community members, local youth, and our dedicated volunteers came together to restore green cover in areas affected by deforestation. The drive included native species such as neem, peepal, and mango — chosen for their ecological and livelihood value. This initiative is part of our ongoing mission to plant 10,000 trees across Bihar by 2025.";
      category = "Field Stories";
      date = "2024-11-15";
      imageUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80";
      author = "Dr. Nirmal Kumar Singh";
      published = true;
    });
    blogPosts.add({
      id = 1;
      title = "Volunteer Stories: A Week in the Field";
      excerpt = "Meet our volunteers who spent a transformative week working directly with communities in rural Bihar — planting trees, educating youth, and driving real change.";
      content = "Meet our volunteers who spent a transformative week working directly with communities in rural Bihar. From early morning plantation drives to evening community workshops, the experience was both humbling and inspiring. Volunteer Priya Sharma from Patna shared: 'This week changed my perspective on what community-driven change really means. Every sapling we planted felt like a promise for the future.' Read their full stories and see how you too can make a difference by joining our next volunteer cohort.";
      category = "Volunteer Experiences";
      date = "2024-10-20";
      imageUrl = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80";
      author = "Anumaya Team";
      published = true;
    });
    blogPosts.add({
      id = 2;
      title = "Annual Impact Report 2023-24 Highlights";
      excerpt = "A year of milestones: 5,686 trees planted, 1,183 families impacted, and 167 acres of soil conserved. Here are the highlights from our Annual Impact Report 2023-24.";
      content = "We are proud to share the highlights from our Annual Impact Report 2023-24. This year, Anumaya Sansthan reached new milestones: 5,686 trees planted across Bihar, 1,875 kg of waste recycled through community programs, 1,183 families directly impacted, and 167 acres of eroding farmland conserved. Our Eco-Champion training program produced 48 trained local youth leaders who continue to drive environmental awareness in their communities. We remain committed to transparency, sustainability, and community-first development as we look ahead to 2024-25.";
      category = "Impact Reports";
      date = "2024-09-01";
      imageUrl = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80";
      author = "Anumaya Sansthan";
      published = true;
    });
    blogIdRef.put(0, 3);
  };

  if (events.size() == 0) {
    events.add({
      id = 0;
      title = "Monsoon Plantation Drive 2025";
      description = "Join us for our largest plantation drive of the year! We will be planting 2,000 saplings across 5 villages in Muzaffarpur district. All volunteers welcome — bring your family and friends for a day of green action.";
      date = "2025-07-15";
      location = "Muzaffarpur, Bihar";
      category = "Plantation";
      imageUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80";
      status = "upcoming";
      registrationsOpen = true;
    });
    events.add({
      id = 1;
      title = "Eco-Champion Training Workshop";
      description = "A 2-day intensive training workshop for youth who want to become certified Eco-Champions. Learn about waste management, soil conservation, and community mobilization. Certificates provided on completion.";
      date = "2025-06-10";
      location = "Patna, Bihar";
      category = "Training";
      imageUrl = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80";
      status = "upcoming";
      registrationsOpen = true;
    });
    events.add({
      id = 2;
      title = "World Environment Day Cleanup Drive";
      description = "On World Environment Day, Anumaya Sansthan organized a massive cleanup drive across 10 panchayats in Vaishali district. Over 300 volunteers participated, collecting and segregating 800 kg of waste.";
      date = "2024-06-05";
      location = "Vaishali, Bihar";
      category = "Waste Management";
      imageUrl = "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80";
      status = "past";
      registrationsOpen = false;
    });
    eventIdRef.put(0, 3);
  };

  if (successStories.size() == 0) {
    successStories.add({
      id = 0;
      title = "From Barren to Bountiful";
      beneficiaryName = "Ramawati Devi";
      location = "Nalanda, Bihar";
      storyText = "Ramawati Devi's farmland in Nalanda had been losing topsoil to erosion for years. Her yields had dropped by nearly 40% and she feared she would have to abandon the land her family had farmed for generations. When Anumaya Sansthan's soil conservation team arrived in her village, they implemented contour bunding and planted deep-rooted native trees along the field margins. Within one season, the erosion stopped. 'My land is alive again,' says Ramawati. 'I never thought I would see so many crops grow here again.' Today her farm produces enough to feed her family and sell at the local market.";
      imageUrl = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80";
      date = "2024-08-20";
    });
    successStories.add({
      id = 1;
      title = "Clean Streets, Proud Community";
      beneficiaryName = "Suresh Kumar";
      location = "Vaishali, Bihar";
      storyText = "Suresh Kumar was one of the first youth in his panchayat to enroll in Anumaya Sansthan's Eco-Champion training. He learned door-to-door waste collection, segregation, and composting techniques. After completing the program, Suresh organized his own cleanup drive and convinced 50 households to participate. 'People used to throw waste everywhere — now they are proud of their clean streets,' he says. Suresh now trains other youth and has become a role model for sustainable living in his community.";
      imageUrl = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80";
      date = "2024-07-10";
    });
    successStories.add({
      id = 2;
      title = "Trees That Became a Forest";
      beneficiaryName = "Mohan Prasad";
      location = "Muzaffarpur, Bihar";
      storyText = "Three years ago, the land behind Mohan Prasad's village was barren, dusty, and prone to flooding during monsoon. Anumaya Sansthan partnered with the village panchayat to plant 800 trees on this degraded land. Mohan, a retired school teacher, volunteered to oversee the saplings' care. 'I watered them every morning like my own children,' he says. Today those saplings have grown into a young forest that provides shade, reduces flooding, and has become a gathering spot for the community. 'We did not just plant trees — we planted hope,' says Mohan.";
      imageUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80";
      date = "2024-09-15";
    });
    storyIdRef.put(0, 3);
  };

  // ── Mixin Includes ─────────────────────────────────────────────────────────

  include GalleryApi(galleryImages, galleryIdRef);
  include BlogApi(blogPosts, blogIdRef);
  include EventsApi(events, eventIdRef, eventRegistrations, eventRegIdRef);
  include StoriesApi(successStories, storyIdRef);
  include AdminApi(galleryImages, blogPosts, events, successStories, volunteers);
  include SettingsApi(adminSettings);

  // ── Public API ─────────────────────────────────────────────────────────────

  public func submitContact(name : Text, email : Text, subject : Text, message : Text) : async Nat {
    let id = nextContactId;
    nextContactId += 1;
    contacts.add({
      id;
      name;
      email;
      subject;
      message;
      timestamp = Time.now();
    });
    id;
  };

  public func subscribeNewsletter(email : Text) : async { #ok : Nat; #err : Text } {
    if (newsletterEmails.contains(email)) {
      return #err("Email already subscribed.");
    };
    let id = nextNewsletterId;
    nextNewsletterId += 1;
    newsletterEmails.add(email);
    newsletters.add({ id; email; timestamp = Time.now() });
    #ok id;
  };

  public func applyVolunteer(
    name : Text,
    email : Text,
    phone : Text,
    city : Text,
    skills : Text,
    availability : Text,
  ) : async Nat {
    let id = nextVolunteerId;
    nextVolunteerId += 1;
    volunteers.add({
      id;
      name;
      email;
      phone;
      city;
      skills;
      availability;
      timestamp = Time.now();
    });
    id;
  };

  public func submitPartnerInquiry(
    organization : Text,
    contactPerson : Text,
    email : Text,
    partnershipNature : Text,
  ) : async Nat {
    let id = nextPartnerId;
    nextPartnerId += 1;
    partners.add({
      id;
      organization;
      contactPerson;
      email;
      partnershipNature;
      timestamp = Time.now();
    });
    id;
  };

  public func applyInternship(
    name : Text,
    email : Text,
    phone : Text,
    city : Text,
    area : Text,
  ) : async Nat {
    let id = nextInternshipId;
    nextInternshipId += 1;
    internships.add({
      id;
      name;
      email;
      phone;
      city;
      area;
      timestamp = Time.now();
    });
    id;
  };

  // ── Admin Queries ──────────────────────────────────────────────────────────

  public query func getContactSubmissions() : async [ContactSubmission] {
    contacts.toArray();
  };

  public query func getNewsletterSignups() : async [NewsletterSignup] {
    newsletters.toArray();
  };

  public query func getVolunteerApplications() : async [VolunteerApplication] {
    volunteers.toArray();
  };

  public query func getPartnerInquiries() : async [PartnerInquiry] {
    partners.toArray();
  };

  public query func getInternshipApplications() : async [InternshipApplication] {
    internships.toArray();
  };
};
