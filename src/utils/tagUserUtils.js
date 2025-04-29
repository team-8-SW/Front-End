import axios from "axios";
/**
 * Tag a user in a post or comment.
 * @param {string} token - The user's authentication token.
 * @param {string} userId - The ID of the user to tag.
 * @param {string} postId - The ID of the post (optional).
 * @param {string} commentId - The ID of the comment (optional).
 */
export const tagUser = async (token, userId, postId = null, commentId = null) => {
  try {
    const payload = postId
      ? { post_id: postId, user_id: userId }
      : { comment_id: commentId, user_id: userId };

    await axios.post(`http://localhost:3000/api/posts/me/taguser`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("User tagged successfully");
  } catch (error) {
    console.error("Error tagging user:", error);
  }
};