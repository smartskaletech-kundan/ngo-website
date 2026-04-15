import Types "../types/common";
import GalleryLib "../lib/gallery";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

mixin (
  galleryImages : List.List<Types.GalleryImage>,
  galleryIdRef : List.List<Nat>,
) {

  // Admin only
  public shared ({ caller }) func addGalleryImage(
    title : Text,
    description : Text,
    category : Text,
    date : Text,
    location : Text,
    imageKey : Text,
  ) : async Nat {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    let id = galleryIdRef.at(0);
    galleryIdRef.put(0, id + 1);
    GalleryLib.addGalleryImage(galleryImages, id, title, description, category, date, location, imageKey, Time.now());
  };

  // Admin only
  public shared ({ caller }) func updateGalleryImage(
    id : Nat,
    title : Text,
    description : Text,
    category : Text,
    date : Text,
    location : Text,
  ) : async Bool {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    GalleryLib.updateGalleryImage(galleryImages, id, title, description, category, date, location);
  };

  // Admin only
  public shared ({ caller }) func deleteGalleryImage(id : Nat) : async Bool {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    GalleryLib.deleteGalleryImage(galleryImages, id);
  };

  // Public
  public query func listGalleryImages() : async [Types.GalleryImage] {
    GalleryLib.listGalleryImages(galleryImages);
  };

  // Public
  public query func getGalleryImagesByCategory(category : Text) : async [Types.GalleryImage] {
    GalleryLib.getGalleryImagesByCategory(galleryImages, category);
  };
};
