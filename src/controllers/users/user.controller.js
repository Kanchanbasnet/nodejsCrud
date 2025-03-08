const pool = require("../../config/postgres.connection");
const { CustomError } = require("../../middlewares/errorhandler");
const { status } = require("http-status");

const createUser = async (req, res, next) => {
  try {
    const { name, email, age, address } = req.body;
    if (!name || !email) {
      throw new CustomError(
        "Name and email must be provided",
        status.BAD_REQUEST
      );
    }
    const checkEmailExists = `SELECT * FROM "users" WHERE email=$1`;
    const checkEmail = await pool.query(checkEmailExists, [email]);
    if (checkEmail.rows.length > 0) {
      throw new CustomError("Email already exists", status.CONFLICT);
    }
    const createQuery = `INSERT INTO users (name, email, age, address) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await pool.query(createQuery, [name, email, age, address]);
    res
      .status(status.CREATED)
      .json({ message: "User created Successfully", data: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const getQuery = `SELECT * FROM users`;
    const result = await pool.query(getQuery);
    if (result.rows.length === 0) {
      throw new CustomError("No users found", status.NOT_FOUND);
    }
    res
      .status(status.OK)
      .json({ message: "Users fetched Successfully", data: result.rows });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getQuery = `SELECT * FROM users WHERE id=$1`;
    const result = await pool.query(getQuery, [id]);
    if (result.rows.length === 0) {
      console.log("No users");
      throw new CustomError("User not found", status.NOT_FOUND);
    }
    res
      .status(status.OK)
      .json({ message: "User fetched Successfully.", data: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, address, age } = req.body;
    const getQuery = `SELECT * FROM users WHERE id=$1`;
    const result = await pool.query(getQuery, [id]);
    if (result.rows.length === 0) {
      throw new CustomError("User not found", status.NOT_FOUND);
    }
    const updateQuery = `UPDATE users SET name=$1, email=$2, address=$3, age=$4 RETURNING *`;
    const updatedResult = await pool.query(updateQuery, [
      name,
      email,
      address,
      age,
    ]);
    res
      .status(status.OK)
      .json({
        message: "User updated successfully",
        data: updatedResult.rows[0],
      });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getQuery = `SELECT * FROM users WHERE id=$1`;
    const result = await pool.query(getQuery, [id]);
    if (result.rows.length === 0) {
      throw new CustomError("User not found", status.NOT_FOUND);
    }
    const deleteQuery = `DELETE FROM users WHERE id= $1`;
    await pool.query(deleteQuery, [id]);
    res.status(status.OK).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
