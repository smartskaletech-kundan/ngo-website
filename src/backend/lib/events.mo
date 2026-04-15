import Types "../types/common";
import List "mo:core/List";

module {
  public func addEvent(
    events : List.List<Types.Event>,
    nextId : Nat,
    title : Text,
    description : Text,
    date : Text,
    location : Text,
    category : Text,
    imageUrl : Text,
    status : Text,
    registrationsOpen : Bool,
  ) : Nat {
    events.add({
      id = nextId;
      title;
      description;
      date;
      location;
      category;
      imageUrl;
      status;
      registrationsOpen;
    });
    nextId;
  };

  public func updateEvent(
    events : List.List<Types.Event>,
    id : Nat,
    title : Text,
    description : Text,
    date : Text,
    location : Text,
    category : Text,
    imageUrl : Text,
    status : Text,
    registrationsOpen : Bool,
  ) : Bool {
    var found = false;
    events.mapInPlace(func(ev) {
      if (ev.id == id) {
        found := true;
        { ev with title; description; date; location; category; imageUrl; status; registrationsOpen };
      } else {
        ev;
      };
    });
    found;
  };

  public func deleteEvent(
    events : List.List<Types.Event>,
    id : Nat,
  ) : Bool {
    let sizeBefore = events.size();
    let filtered = events.filter(func(ev) { ev.id != id });
    let sizeAfter = filtered.size();
    events.clear();
    events.append(filtered);
    sizeBefore != sizeAfter;
  };

  public func listEvents(
    events : List.List<Types.Event>
  ) : [Types.Event] {
    events.toArray();
  };

  public func getUpcomingEvents(
    events : List.List<Types.Event>
  ) : [Types.Event] {
    events.filter(func(ev) { ev.status == "upcoming" }).toArray();
  };

  public func getPastEvents(
    events : List.List<Types.Event>
  ) : [Types.Event] {
    events.filter(func(ev) { ev.status == "past" }).toArray();
  };

  public func registerForEvent(
    registrations : List.List<Types.EventRegistration>,
    nextId : Nat,
    eventId : Nat,
    name : Text,
    email : Text,
    phone : Text,
    timestamp : Int,
  ) : Nat {
    registrations.add({
      id = nextId;
      eventId;
      name;
      email;
      phone;
      timestamp;
    });
    nextId;
  };

  public func getEventRegistrations(
    registrations : List.List<Types.EventRegistration>,
    eventId : Nat,
  ) : [Types.EventRegistration] {
    registrations.filter(func(reg) { reg.eventId == eventId }).toArray();
  };
};
