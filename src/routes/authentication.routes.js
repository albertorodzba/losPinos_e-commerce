const { Router } = require("express");
const express = require("express");
const {request} = require('express');
const router = Router();
const { signIn,logout,signInView,signUpView, signUp } = require("../controllers");

// router.get("/register", authentication.signUp);
router.get("/signin", signInView);
router.get("/signup", signUpView)
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/logout", logout);

module.exports = router;
