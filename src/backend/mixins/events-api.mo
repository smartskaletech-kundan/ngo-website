import Types "../types/common";
import EventsLib "../lib/events";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

mixin (
  events : List.List<Types.Event>,
  eventIdRef : List.List<Nat>,
  eventRegistrations : List.List<Types.EventRegistration>,
  eventRegIdRef : List.List<Nat>,
) {

  // Admin only
  public shared ({ caller }) func addEvent(
    title : Text,
    description : Text,
    date : Text,
    location : Text,
    category : Text,
    imageUrl : Text,
    status : Text,
    registrationsOpen : Bool,
  ) : async Nat {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    let id = eventIdRef.at(0);
    eventIdRef.put(0, id + 1);
    EventsLib.addEvent(events, id, title, description, date, location, category, imageUrl, status, registrationsOpen);
  };

  // Admin only
  public shared ({ caller }) func updateEvent(
    id : Nat,
    title : Text,
    description : Text,
    date : Text,
    location : Text,
    category : Text,
    imageUrl : Text,
    status : Text,
    registrationsOpen : Bool,
  ) : async Bool {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    EventsLib.updateEvent(events, id, title, description, date, location, category, imageUrl, status, registrationsOpen);
  };

  // Admin only
  public shared ({ caller }) func deleteEvent(id : Nat) : async Bool {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    EventsLib.deleteEvent(events, id);
  };

  // Public
  public query func listEvents() : async [Types.Event] {
    EventsLib.listEvents(events);
  };

  // Public
  public query func getUpcomingEvents() : async [Types.Event] {
    EventsLib.getUpcomingEvents(events);
  };

  // Public
  public query func getPastEvents() : async [Types.Event] {
    EventsLib.getPastEvents(events);
  };

  // Public
  public shared func registerForEvent(
    eventId : Nat,
    name : Text,
    email : Text,
    phone : Text,
  ) : async Nat {
    let id = eventRegIdRef.at(0);
    eventRegIdRef.put(0, id + 1);
    EventsLib.registerForEvent(eventRegistrations, id, eventId, name, email, phone, Time.now());
  };

  // Admin only
  public shared query ({ caller }) func getEventRegistrations(eventId : Nat) : async [Types.EventRegistration] {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    EventsLib.getEventRegistrations(eventRegistrations, eventId);
  };
};
