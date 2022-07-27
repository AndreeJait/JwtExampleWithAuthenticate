import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/**
 *
 * @param {string} password a plant text to convert to hash password
 * @return {Promise<String>} hash password
 */
export const decryptPassword = async (password) => {
  const salt = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUND) || 10
  );
  return salt;
};

/**
 *
 * @param {string} password a plant text
 * @param {string} hashPassword  a hash password
 * @return {Promise<Boolean>} true if password same with hash password
 */
export const comparePassword = async (password, hashPassword) => {
  const compare = await bcrypt.compare(password, hashPassword);
  return compare;
};
/**
 *
 * @param {any} data
 * @param {string} expired example : 1d, 20m
 * @return {string} jwt token
 */
export const createJwtToken = (data, expired) => {
  return jwt.sign({ data: data }, process.env.JWT_SECRET_KEY, {
    expiresIn: expired,
  });
};
