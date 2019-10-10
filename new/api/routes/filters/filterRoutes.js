const express = require("express");
const router = express.Router();
const userServices = require("../users/userServices");
const tokenService = require("../../utils/tokenService");
const filterServices = require("./filterServices");

router.route("/new").post(async (req, res) => {
  // Grab the token, user id, and game from frontend.
  const { token, user: id, filter } = req.body;
  try {
    // Check if the login is valid
    const loggedIn = await tokenService.verifyToken(token);
    if (!loggedIn) {
      res.status(503).statusMessage("You are not logged in.");
    }
    // Query the user and check for admin privileges.
    const user = await userServices.getUserById(id);
    if (user.role !== "Admin") {
      res.status(503).statusMessage("Only admins can create games.");
    }
    // Create new filter.
    const newFilter = await filterServices.createGame(filter);
    res.status(201).json({
      data: newFilter
    });
  } catch (e) {
    res.status(401).statusMessage(e);
  }
});

router.route("/").get(async (_, res) => {
  try {
    const filters = await filterServices.getAllFilters();
    if (filters) {
      res.status(200).json({
        data: filters
      });
    }
  } catch (e) {
    res.status(201).statusMessage(e);
  }
});

exports.router = router;