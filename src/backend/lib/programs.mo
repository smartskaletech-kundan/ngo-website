import ProgramTypes "../types/programs";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public func defaultPrograms() : [ProgramTypes.ProgramContent] {
    [
      {
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
      },
      {
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
      },
      {
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
      },
    ];
  };

  public func listPrograms(
    programs : List.List<ProgramTypes.ProgramContent>
  ) : [ProgramTypes.ProgramContent] {
    programs.toArray();
  };

  public func getProgramContent(
    programs : List.List<ProgramTypes.ProgramContent>,
    id : Text,
  ) : ?ProgramTypes.ProgramContent {
    programs.find(func(p) { p.id == id });
  };

  public func upsertProgramContent(
    programs : List.List<ProgramTypes.ProgramContent>,
    content : ProgramTypes.ProgramContent,
  ) {
    let updated = { content with updatedAt = Time.now() };
    var found = false;
    programs.mapInPlace(func(p) {
      if (p.id == content.id) {
        found := true;
        updated;
      } else {
        p;
      };
    });
    if (not found) {
      programs.add(updated);
    };
  };
};
