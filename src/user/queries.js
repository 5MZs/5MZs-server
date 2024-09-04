const getUsers = "SELECT * FROM users";
const getUsersUserId = "SELECT user_id FROM public.users";
const insertQuery = 'INSERT INTO users (user_id, password, phone_number, nick_name, card_no) VALUES ($1, $2, $3, $4, $5)';
const checkQuery = 'SELECT * FROM users WHERE user_id = $1';

module.exports = {
  getUsers,
  getUsersUserId,
  insertQuery,
  checkQuery,
}