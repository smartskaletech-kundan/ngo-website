import Types "../types/common";
import List "mo:core/List";

module {
  public func addSuccessStory(
    stories : List.List<Types.SuccessStory>,
    nextId : Nat,
    title : Text,
    beneficiaryName : Text,
    location : Text,
    storyText : Text,
    imageUrl : Text,
    date : Text,
  ) : Nat {
    stories.add({
      id = nextId;
      title;
      beneficiaryName;
      location;
      storyText;
      imageUrl;
      date;
    });
    nextId;
  };

  public func updateSuccessStory(
    stories : List.List<Types.SuccessStory>,
    id : Nat,
    title : Text,
    beneficiaryName : Text,
    location : Text,
    storyText : Text,
    imageUrl : Text,
    date : Text,
  ) : Bool {
    var found = false;
    stories.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        { s with title; beneficiaryName; location; storyText; imageUrl; date };
      } else {
        s;
      };
    });
    found;
  };

  public func deleteSuccessStory(
    stories : List.List<Types.SuccessStory>,
    id : Nat,
  ) : Bool {
    let sizeBefore = stories.size();
    let filtered = stories.filter(func(s) { s.id != id });
    let sizeAfter = filtered.size();
    stories.clear();
    stories.append(filtered);
    sizeBefore != sizeAfter;
  };

  public func listSuccessStories(
    stories : List.List<Types.SuccessStory>
  ) : [Types.SuccessStory] {
    stories.toArray();
  };
};
