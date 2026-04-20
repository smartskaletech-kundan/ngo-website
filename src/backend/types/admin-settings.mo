module {
  public type NgoStats = {
    var treesPlanted : Text;
    var villagesCovered : Text;
    var volunteers : Text;
    var acresConserved : Text;
    var farmersTrained : Text;
    var panchayatsCovered : Text;
    var householdsCovered : Text;
    var districtsCovered : Text;
  };

  public type AdminSettings = {
    var razorpayKeyId : ?Text;
    var adminPrincipals : [Principal];
    var chairpersonPhotoKey : ?Text;
    var secretaryPhotoKey : ?Text;
    var treasurerPhotoKey : ?Text;
    ngoStats : NgoStats;
  };
};
