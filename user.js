"use strict";

import { StoryList } from './models.js';
import { putStoriesOnPage } from './stories.js';

const BASE_URL = 'https://hack-or-snooze-v3.herokuapp.com';

// Handle login form submission
$("#login-form").on("submit", async function (event) {
  event.preventDefault();
  console.debug("Login form submitted");

  $("#all-stories-list").show();
  
  const username = $("#login-username").val();
  const password = $("#login-password").val();
  
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    const user = response.data;
    localStorage.setItem('token', user.token); // Save token
    $("#nav-login").hide();
    $("#nav-logout").show();
    updateUIOnUserLogin(user);
    $("#all-stories-list").show();
    putStoriesOnPage(await StoryList.getStories());
  } catch (error) {
    console.error("Error logging in:", error);
  }
});

// Handle signup form submission
$("#signup-form").on("submit", async function (event) {
  event.preventDefault();
  
  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();
  
  try {
    await axios.post(`${BASE_URL}/signup`, { name, username, password });
    alert("Account created! You can now log in.");
  } catch (error) {
    console.error("Error signing up:", error);
  }
});

// Handle logout
$("#nav-logout").on("click", function () {
  localStorage.removeItem('token');
  $("#nav-login").show();
  $("#nav-logout").hide();
  $("#all-stories-list").hide();
});

// Update UI on user login
function updateUIOnUserLogin(user) {
  $("#nav-user-profile").text(user.username).show();
}

// Check for remembered user
async function checkForRememberedUser() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.get(`${BASE_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } });
      const user = response.data;
      $("#nav-login").hide();
      $("#nav-logout").show();
      updateUIOnUserLogin(user);
      const storyList = await StoryList.getStories();
      putStoriesOnPage(storyList);
      $("#all-stories-list").show();
    } catch (error) {
      console.error("Error checking remembered user:", error);
    }
  }
}

// Initialize user state on page load
$(document).ready(function() {
  checkForRememberedUser();
});
