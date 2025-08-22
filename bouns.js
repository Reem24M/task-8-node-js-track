const fs = require("fs");
const path = require("path");

/**
 * Load users from JSON file
 *
 * @param {Array} users - reference to users array
 * @param {string} dbFile - path to JSON file
 */
function loadUsers(users, dbFile) {
  const fullPath = path.join(__dirname, dbFile);
  if (fs.existsSync(fullPath)) {
    const data = fs.readFileSync(fullPath, "utf8");
    users.push(...JSON.parse(data));
  }
}

/**
 * Load tasks from JSON file
 *
 * @param {Array} tasks - reference to tasks array
 * @param {string} dbFile - path to JSON file
 */
function loadTasks(tasks, dbFile) {
  const fullPath = path.join(__dirname, dbFile);
  if (fs.existsSync(fullPath)) {
    const data = fs.readFileSync(fullPath, "utf8");
    tasks.push(...JSON.parse(data));
  }
}

/**
 * Save tasks to JSON file
 *
 * @param {Array} tasks - tasks array
 * @param {string} dbFile - path to JSON file
 */
function saveTasks(tasks, dbFile) {
  const fullPath = path.join(__dirname, dbFile);
  fs.writeFileSync(fullPath, JSON.stringify(tasks, null, 2), "utf8");
}

/**
 * Save users to JSON file
 *
 * @param {Array} users - users array
 * @param {string} dbFile - path to JSON file
 */
function saveUsers(users, dbFile) {
  const fullPath = path.join(__dirname, dbFile);
  fs.writeFileSync(fullPath, JSON.stringify(users, null, 2), "utf8");
}

module.exports = {
  loadUsers,
  loadTasks,
  saveTasks,
  saveUsers
};
