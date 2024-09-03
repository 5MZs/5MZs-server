const getUsers = "SELECT * FROM users";
const getUsersUserId = "SELECT user_id FROM public.users";
const postUsers = "INSERT INTO users (user_id, password, phone_number, nick_name, card_no) VALUES ($1, $2, $3, $4, $5)";

module.exports = {
  getUsers,
  postUsers,
  getUsersUserId,
}