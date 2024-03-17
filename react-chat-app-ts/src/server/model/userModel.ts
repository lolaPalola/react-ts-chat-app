import { Pool } from 'pg';

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgress',
  host: 'localhost',
  database: 'chat-app',
  password: 'lola1234',
  port: 5432, // Default PostgreSQL port
});

// UserModel definition
export class UserModel {
  id: number;
  username: string;
  email: string;
  password: string;

  constructor(id: number, username: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

// CRUD operations for UserModel
export const UserModelService = {
  async createUser(username: string, email: string, password: string): Promise<UserModel | null> {
    try {
      const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
      const result = await pool.query(query, [username, email, password]);
      const newUser = result.rows[0];
      return new UserModel(newUser.id, newUser.username, newUser.email, newUser.password);
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  },

  async getUserById(id: number): Promise<UserModel | null> {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      const user = result.rows[0];
      if (user) {
        return new UserModel(user.id, user.username, user.email, user.password);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user by id:', error);
      return null;
    }
  },

  async updateUser(id: number, username: string, email: string, password: string): Promise<boolean> {
    try {
      const query = 'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4';
      await pool.query(query, [username, email, password, id]);
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  },

  async deleteUser(id: number): Promise<boolean> {
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      await pool.query(query, [id]);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  },
};
