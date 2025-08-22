// Express Server Entry Point
const express = require('express');
const { loadTasks, loadUsers, saveTasks } = require('./bouns');

const tasks = require('./data/tasks.json')
const users = require('./data/users.json')

const app = express();
const PORT = 6060;

// Local Database
// const tasks = [];
// const users = [];

// loadTasks(tasks, "data/tasks.json");
// loadUsers(users, "data/users.json");

// Middleware
app.use(express.json());

// Routes
app.get('/api/tasks', (req, res) => {
    // should get all tasks from tasks array
    // console.log(tasks);
    return res.json(tasks)
});

app.get('/api/tasks/search', (req, res) => {
    // query string should contain keyword and we should search in tasks array using this keyword
    // If the keyword exists on title or description we should respond with this task
    let keyword = req.query.q;
    if (!keyword) {
        return res.status(404).send("should enter a key word")
    }
    const results = tasks.filter(task =>
        task.title.toLowerCase().includes(keyword.toLowerCase())
        || task.description.toLowerCase().includes(keyword.toLowerCase())
    )
    if (!results) return res.status(404).send("not found !!")
    return res.json(results)
});

app.post('/api/tasks', (req, res) => {
    // body should contain these info title, description, priority(high, low, medium)
    const { title, description, priority } = req.body
    if (!title || !description || !priority) {
        return res.status(400).send("there is something not found")
    }
    // KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
    saveTasks(tasks, "data/tasks.json");
});

app.get("/profile", (req, res) => {
    // we get query string from req and search user in users array
    let username = req.query.username
    if (!username) {
        return res.status(404).send("the user not found")
    }
    const results = users.filter(user => user.username === username)
    return res.send(results)
});

app.post("/register", (req, res) => {
    // body should contain these info username, email, password
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ error: "bad request" })
    }
    if (!email.includes('@')) {
        return res.status(400).json({ error: "invailed email" })
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "password must be more than 8 letters" })
    }
    if(users.username===username)
    {
        return res.status(400).send("the user is already exit")
    }
    users.push({username,email,password})
    return res.send("register successfully")
    // KEEP THIS CODE AFTER ADDING USER TO USERS ARRAY
    // saveTasks(users, "data/users.json");
});

app.post("/login", (req, res) => {
    // body should contain these info username or email, password
    let {username,email,password}=req.body
    if((!username && !email) || !password)
    {
        return res.status(400).send("You must provide username or email and a password")
    }
    const user = users.find(
    u => (username && u.username === username) || (email && u.email === email)
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Invalid password" });
  }
   return res.json({
    message: "Login successful",
    user: {
      username: user.username,
      email: user.email
      
    }
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
