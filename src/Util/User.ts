import axios from "axios";

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
