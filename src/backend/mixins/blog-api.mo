import Types "../types/common";
import BlogLib "../lib/blog";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

mixin (
  blogPosts : List.List<Types.BlogPost>,
  blogIdRef : List.List<Nat>,
) {

  // Admin only
  public shared ({ caller }) func addBlogPost(
    title : Text,
    excerpt : Text,
    content : Text,
    category : Text,
    date : Text,
    imageUrl : Text,
    author : Text,
  ) : async Nat {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    let id = blogIdRef.at(0);
    blogIdRef.put(0, id + 1);
    BlogLib.addBlogPost(blogPosts, id, title, excerpt, content, category, date, imageUrl, author);
  };

  // Admin only
  public shared ({ caller }) func updateBlogPost(
    id : Nat,
    title : Text,
    excerpt : Text,
    content : Text,
    category : Text,
    date : Text,
    imageUrl : Text,
    author : Text,
    published : Bool,
  ) : async Bool {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    BlogLib.updateBlogPost(blogPosts, id, title, excerpt, content, category, date, imageUrl, author, published);
  };

  // Admin only
  public shared ({ caller }) func deleteBlogPost(id : Nat) : async Bool {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    BlogLib.deleteBlogPost(blogPosts, id);
  };

  // Public — only published posts
  public query func listBlogPosts() : async [Types.BlogPost] {
    BlogLib.listBlogPosts(blogPosts);
  };

  // Admin only — all including unpublished
  public shared query ({ caller }) func getAllBlogPosts() : async [Types.BlogPost] {
    if (not caller.isController()) {
      Runtime.trap("Unauthorized: admin only");
    };
    BlogLib.getAllBlogPosts(blogPosts);
  };

  // Public
  public query func getBlogPostsByCategory(category : Text) : async [Types.BlogPost] {
    BlogLib.getBlogPostsByCategory(blogPosts, category);
  };
};
