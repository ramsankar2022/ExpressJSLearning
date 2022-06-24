import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getAllUsers() {
  const [rows] = await db.query("SELECT * FROM TbUserCollection");
  return rows;
}

export async function getUserById(id) {
  const [rows] = await db.query(
    `
  SELECT * 
  FROM TbUserCollection
  WHERE UserId = ?
  `,
    [id]
  );
  return rows[0];
}

export async function createUser(userName, userAddress) {
  const [result] = await db.query(
    `
  INSERT INTO TbUserCollection (UserName, UserAddress)
  VALUES (?, ?)
  `,
    [userName, userAddress]
  );
  const id = result.insertId;
  return getUserById(id);
}
