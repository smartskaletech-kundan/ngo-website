import Types "../types/common";
import List "mo:core/List";

module {
  public func addGalleryImage(
    images : List.List<Types.GalleryImage>,
    nextId : Nat,
    title : Text,
    description : Text,
    category : Text,
    date : Text,
    location : Text,
    imageKey : Text,
    uploadedAt : Int,
  ) : Nat {
    images.add({
      id = nextId;
      title;
      description;
      category;
      date;
      location;
      imageKey;
      uploadedAt;
    });
    nextId;
  };

  public func updateGalleryImage(
    images : List.List<Types.GalleryImage>,
    id : Nat,
    title : Text,
    description : Text,
    category : Text,
    date : Text,
    location : Text,
  ) : Bool {
    var found = false;
    images.mapInPlace(func(img) {
      if (img.id == id) {
        found := true;
        { img with title; description; category; date; location };
      } else {
        img;
      };
    });
    found;
  };

  public func deleteGalleryImage(
    images : List.List<Types.GalleryImage>,
    id : Nat,
  ) : Bool {
    let sizeBefore = images.size();
    let filtered = images.filter(func(img) { img.id != id });
    let sizeAfter = filtered.size();
    images.clear();
    images.append(filtered);
    sizeBefore != sizeAfter;
  };

  public func listGalleryImages(
    images : List.List<Types.GalleryImage>
  ) : [Types.GalleryImage] {
    images.toArray();
  };

  public func getGalleryImagesByCategory(
    images : List.List<Types.GalleryImage>,
    category : Text,
  ) : [Types.GalleryImage] {
    images.filter(func(img) { img.category == category }).toArray();
  };
};
