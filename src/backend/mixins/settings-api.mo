import AdminSettingsTypes "../types/admin-settings";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

mixin (settings : AdminSettingsTypes.AdminSettings) {

  // ── Public query — frontend needs settings without auth ──────────────────────

  public query func getAdminSettings() : async {
    razorpayKeyId : ?Text;
    adminPrincipals : [Principal];
    chairpersonPhotoKey : ?Text;
    secretaryPhotoKey : ?Text;
    treasurerPhotoKey : ?Text;
    ngoStats : {
      treesPlanted : Text;
      villagesCovered : Text;
      volunteers : Text;
      acresConserved : Text;
      farmersTrained : Text;
      panchayatsCovered : Text;
      householdsCovered : Text;
      districtsCovered : Text;
    };
  } {
    {
      razorpayKeyId = settings.razorpayKeyId;
      adminPrincipals = settings.adminPrincipals;
      chairpersonPhotoKey = settings.chairpersonPhotoKey;
      secretaryPhotoKey = settings.secretaryPhotoKey;
      treasurerPhotoKey = settings.treasurerPhotoKey;
      ngoStats = {
        treesPlanted = settings.ngoStats.treesPlanted;
        villagesCovered = settings.ngoStats.villagesCovered;
        volunteers = settings.ngoStats.volunteers;
        acresConserved = settings.ngoStats.acresConserved;
        farmersTrained = settings.ngoStats.farmersTrained;
        panchayatsCovered = settings.ngoStats.panchayatsCovered;
        householdsCovered = settings.ngoStats.householdsCovered;
        districtsCovered = settings.ngoStats.districtsCovered;
      };
    };
  };

  // ── Admin-only updates ───────────────────────────────────────────────────────

  public shared ({ caller }) func updateRazorpayKeyId(keyId : Text) : async { ok : Bool; err : ?Text } {
    if (not caller.isController()) {
      return { ok = false; err = ?"Unauthorized: admin only" };
    };
    settings.razorpayKeyId := ?(keyId);
    { ok = true; err = null };
  };

  public shared ({ caller }) func updateAdminPrincipals(principals : [Principal]) : async { ok : Bool; err : ?Text } {
    if (not caller.isController()) {
      return { ok = false; err = ?"Unauthorized: admin only" };
    };
    settings.adminPrincipals := principals;
    { ok = true; err = null };
  };

  public shared ({ caller }) func updateTeamPhotos(secretaryKey : ?Text, chairpersonKey : ?Text, treasurerKey : ?Text) : async { ok : Bool; err : ?Text } {
    if (not caller.isController()) {
      return { ok = false; err = ?"Unauthorized: admin only" };
    };
    switch (secretaryKey) {
      case (?k) { settings.secretaryPhotoKey := ?k };
      case null {};
    };
    switch (chairpersonKey) {
      case (?k) { settings.chairpersonPhotoKey := ?k };
      case null {};
    };
    switch (treasurerKey) {
      case (?k) { settings.treasurerPhotoKey := ?k };
      case null {};
    };
    { ok = true; err = null };
  };

  public shared ({ caller }) func updateNgoStats(
    treesPlanted : Text,
    villagesCovered : Text,
    volunteers : Text,
    acresConserved : Text,
    farmersTrained : Text,
    panchayatsCovered : Text,
    householdsCovered : Text,
  ) : async { ok : Bool; err : ?Text } {
    if (not caller.isController()) {
      return { ok = false; err = ?"Unauthorized: admin only" };
    };
    settings.ngoStats.treesPlanted := treesPlanted;
    settings.ngoStats.villagesCovered := villagesCovered;
    settings.ngoStats.volunteers := volunteers;
    settings.ngoStats.acresConserved := acresConserved;
    settings.ngoStats.farmersTrained := farmersTrained;
    settings.ngoStats.panchayatsCovered := panchayatsCovered;
    settings.ngoStats.householdsCovered := householdsCovered;
    { ok = true; err = null };
  };
};
