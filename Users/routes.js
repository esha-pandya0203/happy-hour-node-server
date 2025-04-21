import * as dao from "./dao.js";

export default function UserRoutes(app) {
  app.get("/api/users", async (req, res) => {
    const users = await dao.findAllUsers();
    res.send(users);
  });

  app.post("/api/users", async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  });

  app.get("/api/users/:userId", async (req, res) => {
    const user = await dao.findUserById(req.params.uderId);
    res.json(user);
  });

  app.put("/api/users/:userId", async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];

    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
    }

    res.json(currentUser);
  });

  app.delete("/api/users/:userId", async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  });

  app.post("/api/users/signup", async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in user" });
      return;
    }

    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  });

  app.post("/api/users/signin", async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);

    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  });

  app.post("/api/users/signout", async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  });

  app.post("/api/users/profile", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  });
}
