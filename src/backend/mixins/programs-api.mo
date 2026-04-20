import ProgramTypes "../types/programs";
import ProgramsLib "../lib/programs";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  programs : List.List<ProgramTypes.ProgramContent>,
) {

  // ── Public queries ────────────────────────────────────────────────────────

  public query func listPrograms() : async [ProgramTypes.ProgramContent] {
    ProgramsLib.listPrograms(programs);
  };

  public query func getProgramContent(id : Text) : async ?ProgramTypes.ProgramContent {
    ProgramsLib.getProgramContent(programs, id);
  };

  // ── Admin mutations ───────────────────────────────────────────────────────

  public shared ({ caller }) func upsertProgramContent(
    content : ProgramTypes.ProgramContent
  ) : async { #ok; #err : Text } {
    if (not caller.isController()) {
      return #err("Unauthorized: admin only");
    };
    ProgramsLib.upsertProgramContent(programs, content);
    #ok;
  };
};
