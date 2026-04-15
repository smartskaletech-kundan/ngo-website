import AdminSettingsTypes "../types/admin-settings";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

mixin (settings : AdminSettingsTypes.AdminSettings) {

  // ── Public query — frontend needs Razorpay key and photo keys without auth ──

  public query func getAdminSettings() : async {
    razorpayKeyId : ?Text;
    adminPrincipals : [Principal];
    chairpersonPhotoKey : ?Text;
    treasurerPhotoKey : ?Text;
  } {
    Runtime.trap("not implemented");
  };

  // ── Admin-only updates ───────────────────────────────────────────────────────

  public shared ({ caller }) func updateRazorpayKeyId(keyId : Text) : async { ok : Bool; err : ?Text } {
    Runtime.trap("not implemented");
  };

  public shared ({ caller }) func updateAdminPrincipals(principals : [Principal]) : async { ok : Bool; err : ?Text } {
    Runtime.trap("not implemented");
  };

  public shared ({ caller }) func updateTeamPhotos(chairpersonKey : ?Text, treasurerKey : ?Text) : async { ok : Bool; err : ?Text } {
    Runtime.trap("not implemented");
  };
};
