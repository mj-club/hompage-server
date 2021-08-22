"use strict";

// import
const AuthService = require("./auth");
const UserService = require("./user");
const ClubService = require("./club");
const UnionService = require("./union");

const service = {};

// add
service.AuthService = AuthService;
service.UserService = UserService;
service.ClubService = ClubService;
service.UnionService = UnionService;

module.exports = service;
