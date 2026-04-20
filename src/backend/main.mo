import Types "types/common";
import ProgramTypes "types/programs";
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
import ProgramsApi "mixins/programs-api";
import Migration "migration";

(with migration = Migration.run)
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
    var secretaryPhotoKey = null;
    var treasurerPhotoKey = null;
    ngoStats = {
      var treesPlanted = "800+";
      var villagesCovered = "6";
      var volunteers = "30+";
      var acresConserved = "40+";
      var farmersTrained = "20+";
      var panchayatsCovered = "8";
      var householdsCovered = "100+";
      var districtsCovered = "6";
    };
  };

  // ── Domain State ───────────────────────────────────────────────────────────

  let galleryImages : List.List<Types.GalleryImage> = List.empty();
  let galleryIdRef : List.List<Nat> = List.singleton(0);

  let blogPosts : List.List<Types.BlogPost> = List.empty();
  let blogIdRef : List.List<Nat> = List.singleton(0);

  let events : List.List<Types.Event> = List.empty();
  let eventIdRef : List.List<Nat> = List.singleton(0);

  let eventRegistrations : List.List<Types.EventRegistration> = List.empty();
  let eventRegIdRef : List.List<Nat> = List.singleton(0);

  let successStories : List.List<Types.SuccessStory> = List.empty();
  let storyIdRef : List.List<Nat> = List.singleton(0);

  let programs : List.List<ProgramTypes.ProgramContent> = List.empty();

  // ── Seed Programs (idempotent) ─────────────────────────────────────────────

  if (programs.size() == 0) {
    programs.add({
      id = "plantation-drives";
      name = "Plantation Drives";
      tagline = "Restoring Bihar's Green Cover";
      description = "Our plantation drives target degraded land, roadsides, schools, and panchayat areas across Patna, Vaishali, Nalanda, Jahanabad, Arwal, and Ara (Bhojpur). With community participation at the core, we plant native species chosen for ecological resilience and local benefit.";
      heroImage = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80";
      stat1Label = "Trees Planted";
      stat1Value = "800+";
      stat2Label = "Districts";
      stat2Value = "6";
      stat3Label = "Volunteers";
      stat3Value = "30+";
      howItWorks = [
        "Identify degraded land and partner with local panchayats",
        "Select native species suited to Bihar's climate and soil",
        "Mobilise community volunteers for plantation days",
        "Provide post-planting care training to local guardians",
        "Monitor and document growth through field visits",
      ];
      updatedAt = 0;
    });
    programs.add({
      id = "soil-erosion-control";
      name = "Soil Erosion Control";
      tagline = "Protecting the Land That Feeds Us";
      description = "Soil erosion threatens Bihar's agricultural heartland. We work with local farmers to deploy contour bunding and afforestation techniques to stabilise eroding soils and restore farm productivity. Our work is in its early phase with 40+ acres brought under conservation.";
      heroImage = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80";
      stat1Label = "Acres Conserved";
      stat1Value = "40+";
      stat2Label = "Farmers Trained";
      stat2Value = "20+";
      stat3Label = "Districts";
      stat3Value = "6";
      howItWorks = [
        "Survey farmland to assess erosion severity and root causes",
        "Design contour bunding layouts with farmers",
        "Plant deep-rooted native trees along field margins",
        "Train farmers in soil conservation best practices",
        "Follow up to measure soil retention improvements",
      ];
      updatedAt = 0;
    });
    programs.add({
      id = "community-development";
      name = "Community Development";
      tagline = "Strong Villages, Stronger Bihar";
      description = "Community development is the backbone of our work. We engage local youth and village leaders through awareness programmes, participatory planning, and capacity building — helping panchayats and households take ownership of their environment and future.";
      heroImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80";
      stat1Label = "Panchayats";
      stat1Value = "8";
      stat2Label = "Households";
      stat2Value = "100+";
      stat3Label = "Community Leaders";
      stat3Value = "30+";
      howItWorks = [
        "Conduct village-level needs assessment and community mapping",
        "Facilitate participatory planning workshops with residents",
        "Train local youth as community eco-leaders",
        "Run awareness programmes on environment and sustainability",
        "Support panchayats with documentation and reporting",
      ];
      updatedAt = 0;
    });
  };

  // ── Seed Data (idempotent via size check) ──────────────────────────────────

  if (blogPosts.size() == 0) {
    blogPosts.add({
      id = 0;
      title = "Plantation Drive Success in Nalanda";
      excerpt = "Our recent plantation drive in Nalanda district was a resounding success, with over 500 trees planted across 3 villages in a single day.";
      content = "Our recent plantation drive in Nalanda district was a resounding success, with over 500 trees planted across 3 villages in a single day. Community members, local youth, and our dedicated volunteers came together to restore green cover in areas affected by deforestation. The drive included native species such as neem, peepal, and mango — chosen for their ecological and livelihood value. This initiative is part of our ongoing mission to plant trees across Bihar.";
      category = "Field Stories";
      date = "2024-11-15";
      imageUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80";
      author = "Dr. Nirmal Kumar Singh";
      published = true;
    });
    blogPosts.add({
      id = 1;
      title = "Volunteer Stories: A Week in the Field";
      excerpt = "Meet our volunteers who spent a transformative week working directly with communities in rural Bihar — planting trees and driving real change.";
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
      excerpt = "A year of milestones: 800+ trees planted, families impacted, and 40+ acres of soil conserved. Here are the highlights from our Annual Impact Report 2023-24.";
      content = "We are proud to share the highlights from our Annual Impact Report 2023-24. This year, MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN reached key milestones: 800+ trees planted across Bihar, 100+ families directly impacted, and 40+ acres of eroding farmland conserved. Our community training program produced local youth leaders who continue to drive environmental awareness in their communities. We remain committed to transparency, sustainability, and community-first development as we look ahead to 2024-25.";
      category = "Impact Reports";
      date = "2024-09-01";
      imageUrl = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80";
      author = "MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN";
      published = true;
    });
    blogIdRef.put(0, 3);
  };

  if (events.size() == 0) {
    events.add({
      id = 0;
      title = "Monsoon Plantation Drive 2025";
      description = "Join us for our largest plantation drive of the year! We will be planting saplings across villages in Patna and Nalanda districts. All volunteers welcome — bring your family and friends for a day of green action.";
      date = "2025-07-15";
      location = "Nalanda, Bihar";
      category = "Plantation";
      imageUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80";
      status = "upcoming";
      registrationsOpen = true;
    });
    events.add({
      id = 1;
      title = "Eco-Champion Training Workshop";
      description = "A 2-day intensive training workshop for youth who want to become certified Eco-Champions. Learn about soil conservation and community mobilization. Certificates provided on completion.";
      date = "2025-06-10";
      location = "Patna, Bihar";
      category = "Training";
      imageUrl = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80";
      status = "upcoming";
      registrationsOpen = true;
    });
    events.add({
      id = 2;
      title = "World Environment Day Community Drive";
      description = "On World Environment Day, MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN organized a community plantation drive across panchayats in Vaishali district. Volunteers came together to plant trees and raise environmental awareness.";
      date = "2024-06-05";
      location = "Vaishali, Bihar";
      category = "Plantation";
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
      program = "soil-erosion-control";
      storyText = "Ramawati Devi's farmland in Nalanda had been losing topsoil to erosion for years. Her yields had dropped by nearly 40% and she feared she would have to abandon the land her family had farmed for generations. When MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's soil conservation team arrived in her village, they implemented contour bunding and planted deep-rooted native trees along the field margins. Within one season, the erosion stopped. 'My land is alive again,' says Ramawati. Today her farm produces enough to feed her family and sell at the local market.";
      imageUrl = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80";
      date = "2024-08-20";
    });
    successStories.add({
      id = 1;
      title = "A Village Comes Together";
      beneficiaryName = "Suresh Kumar";
      location = "Vaishali, Bihar";
      program = "community-development";
      storyText = "Suresh Kumar was one of the first youth in his panchayat to join MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN's community development programme. He learned participatory planning and capacity building techniques. After completing the programme, Suresh organised his own community awareness drive and convinced 50 households to participate. 'People are now proud of their clean and green village,' he says. Suresh now mentors other youth and has become a role model for sustainable living in his community.";
      imageUrl = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80";
      date = "2024-07-10";
    });
    successStories.add({
      id = 2;
      title = "Trees That Became a Forest";
      beneficiaryName = "Mohan Prasad";
      location = "Arwal, Bihar";
      program = "plantation-drives";
      storyText = "The land behind Mohan Prasad's village was barren and prone to flooding during monsoon. MAYA SAMAJIK UTTHAN EVAM PARAMARSH SANSTHAN partnered with the village panchayat to plant 200 trees on this degraded land. Mohan, a retired school teacher, volunteered to oversee the saplings' care. 'I watered them every morning like my own children,' he says. Today those saplings have grown into a young forest that provides shade, reduces flooding, and has become a gathering spot for the community. 'We did not just plant trees — we planted hope,' says Mohan.";
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
  include ProgramsApi(programs);

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
