const axios = require("axios");

exports.getHatchwayPosts = (queryParams) => {
  let links = [];
  let { tags, sortBy, direction } = queryParams;

  // If optional direction is not given set to default asc
  if (!direction) direction = "asc";

  // Validation for missing tags query param
  if (!tags) {
    throw new Error("Tags parameter is required");
  }
  tags = tags.split(",");

  // Validation for incorrect sortBy query param
  // if option sortBy is not given set to default id
  if (!sortBy) sortBy = "id";
  // Checks to see if any fields below are equal to sortBy query param
  if (!["id", "reads", "likes", "popularity"].includes(sortBy)) {
    throw new Error("sortBy parameter is invalid");
  }

  // Populate links array for each tag
  tags.forEach((tag) => {
    let url = `https://api.hatchways.io/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`;
    links.push(url);
  });

  return axios.all(links.map((link) => axios.get(link))).then((result) => {
    let posts = [];

    // Loop over array and destructure posts into new array
    result.forEach((res) => {
      posts = [...posts, ...res.data.posts];
    });

    // Filter duplicate posts
    posts = removeDuplicates(posts);

    // Sort the posts based on selected sortBy query
    direction === "asc" ? posts.sort((a, b) => a[sortBy] - b[sortBy]) : posts.sort((a, b) => b[sortBy] - a[sortBy]);

    return posts;
  });
};

// utilize hash map making it O(N); Hash lookup being O(1);
const removeDuplicates = (array) => {
  const hash = new Map();

  return array.filter((post) => {
    if (!hash.has(post.id)) {
      hash.set(post.id, true);
      return true;
    }

    return false;
  });
};
