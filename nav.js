"use strict";

import { StoryList, putStoriesOnPage } from './stories.js';

function hidePageComponents() {
  console.debug("Hiding components");
  $("#all-stories-list").hide();
  $("#submit-form").hide();
  $("#login-form").hide();
  $("#signup-form").hide();
  $("#user-profile").hide();
  $("#favorited-stories").hide();
  $("#my-stories").hide();
}

// Handle "Hack or Snooze" click
$("#nav-all").on("click", async function () {
  console.debug("Hack or Snooze clicked");
  hidePageComponents();
  try {
    const storyList = await StoryList.getStories();
    putStoriesOnPage(storyList);
    $("#all-stories-list").show();
  } catch (error) {
    console.error("Error loading stories:", error);
  }
});

// Handle "submit" click
$("#nav-submit-story").on("click", function () {
  console.debug("Submit Story clicked");
  hidePageComponents();
  $("#submit-form").show();
});

// Handle "favorites" click
$("#nav-favorites").on("click", async function () {
  console.debug("Favorites clicked");
  hidePageComponents();
  // Logic to show favorited stories
  $("#favorited-stories").show();
});

// Handle "my stories" click
$("#nav-my-stories").on("click", async function () {
  console.debug("My Stories clicked");
  hidePageComponents();
  // Logic to show user's stories
  $("#my-stories").show();
});

// Handle "login/signup" click
$("#nav-login").on("click", function () {
  console.debug("Login/Signup clicked");
  hidePageComponents();
  console.debug("Toggling login form visibility");
  $("#login-form").toggle();
  $("#signup-form").toggle();
});

// Handle "logout" click
$("#nav-logout").on("click", function () {
  console.debug("Logout clicked");
  localStorage.removeItem('token');
  $("#nav-login").show();
  $("#nav-logout").hide();
  $("#all-stories-list").hide();
});


