import Types "../types/common";
import List "mo:core/List";

module {
  public func addBlogPost(
    posts : List.List<Types.BlogPost>,
    nextId : Nat,
    title : Text,
    excerpt : Text,
    content : Text,
    category : Text,
    date : Text,
    imageUrl : Text,
    author : Text,
  ) : Nat {
    posts.add({
      id = nextId;
      title;
      excerpt;
      content;
      category;
      date;
      imageUrl;
      author;
      published = false;
    });
    nextId;
  };

  public func updateBlogPost(
    posts : List.List<Types.BlogPost>,
    id : Nat,
    title : Text,
    excerpt : Text,
    content : Text,
    category : Text,
    date : Text,
    imageUrl : Text,
    author : Text,
    published : Bool,
  ) : Bool {
    var found = false;
    posts.mapInPlace(func(post) {
      if (post.id == id) {
        found := true;
        { post with title; excerpt; content; category; date; imageUrl; author; published };
      } else {
        post;
      };
    });
    found;
  };

  public func deleteBlogPost(
    posts : List.List<Types.BlogPost>,
    id : Nat,
  ) : Bool {
    let sizeBefore = posts.size();
    let filtered = posts.filter(func(post) { post.id != id });
    let sizeAfter = filtered.size();
    posts.clear();
    posts.append(filtered);
    sizeBefore != sizeAfter;
  };

  public func listBlogPosts(
    posts : List.List<Types.BlogPost>
  ) : [Types.BlogPost] {
    posts.filter(func(post) { post.published }).toArray();
  };

  public func getAllBlogPosts(
    posts : List.List<Types.BlogPost>
  ) : [Types.BlogPost] {
    posts.toArray();
  };

  public func getBlogPostsByCategory(
    posts : List.List<Types.BlogPost>,
    category : Text,
  ) : [Types.BlogPost] {
    posts.filter(func(post) { post.published and post.category == category }).toArray();
  };
};
