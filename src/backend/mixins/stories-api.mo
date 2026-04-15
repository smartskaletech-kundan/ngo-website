import Types "../types/common";
import StoriesLib "../lib/stories";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

mixin (
  successStories : List.List<Types.SuccessStory>,
  storyIdRef : List.List<Nat>,
) {

  // Admin only
  public shared ({ caller }) func addSuccessStory(
    title : Text,
    beneficiaryName : Text,
    location : Text,
    storyText : Text,
    imageUrl : Text,
    date : Text,
  ) : async Nat {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    let id = storyIdRef.at(0);
    storyIdRef.put(0, id + 1);
    StoriesLib.addSuccessStory(successStories, id, title, beneficiaryName, location, storyText, imageUrl, date);
  };

  // Admin only
  public shared ({ caller }) func updateSuccessStory(
    id : Nat,
    title : Text,
    beneficiaryName : Text,
    location : Text,
    storyText : Text,
    imageUrl : Text,
    date : Text,
  ) : async Bool {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    StoriesLib.updateSuccessStory(successStories, id, title, beneficiaryName, location, storyText, imageUrl, date);
  };

  // Admin only
  public shared ({ caller }) func deleteSuccessStory(id : Nat) : async Bool {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    StoriesLib.deleteSuccessStory(successStories, id);
  };

  // Public
  public query func listSuccessStories() : async [Types.SuccessStory] {
    StoriesLib.listSuccessStories(successStories);
  };
};
