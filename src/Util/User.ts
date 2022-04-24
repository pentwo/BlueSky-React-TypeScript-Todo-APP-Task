import axios from "axios";

/**
 * Get all users from the database
 * @returns user[]
 */
export async function getUsers() {
  try {
    const { users } = await axios
      .get("api/users")
      .then((response) => response.data);

    return users;
  } catch (error) {
    console.error(error);
  }
}
