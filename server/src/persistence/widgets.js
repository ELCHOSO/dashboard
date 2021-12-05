const sql = require('sql-template-strings');
const db = require('./db');

module.exports = {
  async create(userID, name) {
    try {
      const { rows } = await db.query(sql`
      INSERT INTO widgets (name)
        VALUES (${name})
        RETURNING id, name;
      `);
      await db.query(sql`
      INSERT INTO savedwidgets (userid, widgetid)
        VALUES (${userID}, ${rows[0].id});
      `);
      const [widget] = rows;
      return widget;
    } catch (error) {
      throw error;
    }
  },
  async findAllWidgets(userID) {
    try {
      const { rows } = await db.query(sql`
      SELECT widgets.id, widgets.name
      FROM widgets
      INNER JOIN savedwidgets
      ON widgets.id = savedwidgets.widgetid
      WHERE userid=${userID};
      `)
      return rows
    } catch (error) {
      throw error;
    }
  },
  async findOneWidget(ID) {
    try {
      const { rows } = await db.query(sql`
      SELECT * FROM widgets WHERE id=${ID} LIMIT 1;
      `)
      return rows;
    } catch (error) {
      throw error;
    }
  },
  async deleteWidget(ID) {
    try {
      const { rows } = await db.query(sql`
      DELETE from widgets where id=${ID}
      RETURNING id, name;
      `)
      await db.query(sql`
      DELETE from savedwidgets where widgetid=${ID};
      `)
    } catch (error) {
      throw error;
    }
  },
  async updateConfig(ID, value) {
    try {
      const { rows } = await db.query(sql`
      UPDATE widgets
      SET config = ${value}
      WHERE id = ${ID};
      `)
    } catch (e) {
      throw e;
    }
  }
};
