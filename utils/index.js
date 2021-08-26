"use strict";

// import
const File = require("./file");
const HandleError = require("./handleError");
const Permission = require("./permission");

const utils = {};

// add
utils.File = File;
utils.HandleError = HandleError;
utils.Permission = Permission;

module.exports = utils;
