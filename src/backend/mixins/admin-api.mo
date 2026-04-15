import Types "../types/common";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

mixin (
  galleryImages : List.List<Types.GalleryImage>,
  blogPosts : List.List<Types.BlogPost>,
  events : List.List<Types.Event>,
  successStories : List.List<Types.SuccessStory>,
  volunteers : List.List<{ id : Nat; name : Text; email : Text; phone : Text; city : Text; skills : Text; availability : Text; timestamp : Int }>,
) {

  // Admin only
  public shared query ({ caller }) func getAdminStats() : async Types.AdminStats {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    {
      galleryCount = galleryImages.size();
      blogCount = blogPosts.size();
      eventCount = events.size();
      storyCount = successStories.size();
      volunteerCount = volunteers.size();
    };
  };
};
