const db = require('./db')
const sql = require('sql-template-strings')

module.exports = {
  initAll() {
    db.query(sql`CREATE TABLE IF NOT EXISTS users (
      id SERIAL NOT NULL,
      email text,
      password text );`)
    db.query(sql`CREATE TABLE IF NOT EXISTS widgets (
      id SERIAL NOT NULL,
      name text NOT NULL,
      config text);`)
    db.query(sql`CREATE TABLE IF NOT EXISTS savedWidgets (
      id SERIAL NOT NULL,
      userID integer NOT NULL,
      widgetID integer NOT NULL);`)
  }
}