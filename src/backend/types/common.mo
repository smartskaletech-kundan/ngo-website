module {
  public type GalleryImage = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    date : Text;
    location : Text;
    imageKey : Text;
    uploadedAt : Int;
  };

  public type BlogPost = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    date : Text;
    imageUrl : Text;
    author : Text;
    published : Bool;
  };

  public type Event = {
    id : Nat;
    title : Text;
    description : Text;
    date : Text;
    location : Text;
    category : Text;
    imageUrl : Text;
    status : Text;
    registrationsOpen : Bool;
  };

  public type EventRegistration = {
    id : Nat;
    eventId : Nat;
    name : Text;
    email : Text;
    phone : Text;
    timestamp : Int;
  };

  public type SuccessStory = {
    id : Nat;
    title : Text;
    beneficiaryName : Text;
    location : Text;
    storyText : Text;
    imageUrl : Text;
    date : Text;
  };

  public type AdminStats = {
    galleryCount : Nat;
    blogCount : Nat;
    eventCount : Nat;
    storyCount : Nat;
    volunteerCount : Nat;
  };
};
