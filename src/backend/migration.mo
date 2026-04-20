import List "mo:core/List";
import AdminSettingsTypes "types/admin-settings";
import CommonTypes "types/common";

module {

  // ── Old types (copied from .old/src/backend/types/) ───────────────────────

  type OldAdminSettings = {
    var razorpayKeyId : ?Text;
    var adminPrincipals : [Principal];
    var chairpersonPhotoKey : ?Text;
    var treasurerPhotoKey : ?Text;
  };

  type OldSuccessStory = {
    id : Nat;
    title : Text;
    beneficiaryName : Text;
    location : Text;
    storyText : Text;
    imageUrl : Text;
    date : Text;
  };

  // ── Migration domain / codomain ───────────────────────────────────────────

  type OldActor = {
    adminSettings : OldAdminSettings;
    successStories : List.List<OldSuccessStory>;
  };

  type NewActor = {
    adminSettings : AdminSettingsTypes.AdminSettings;
    successStories : List.List<CommonTypes.SuccessStory>;
  };

  // ── Migration function ────────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {

    // Migrate adminSettings: add secretaryPhotoKey and ngoStats
    let newAdminSettings : AdminSettingsTypes.AdminSettings = {
      var razorpayKeyId = old.adminSettings.razorpayKeyId;
      var adminPrincipals = old.adminSettings.adminPrincipals;
      var chairpersonPhotoKey = old.adminSettings.chairpersonPhotoKey;
      var secretaryPhotoKey = null;
      var treasurerPhotoKey = old.adminSettings.treasurerPhotoKey;
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

    // Migrate successStories: add program field with empty default
    let newSuccessStories = old.successStories.map<OldSuccessStory, CommonTypes.SuccessStory>(
      func(s) {
        { s with program = "" };
      }
    );

    {
      adminSettings = newAdminSettings;
      successStories = newSuccessStories;
    };
  };
};
