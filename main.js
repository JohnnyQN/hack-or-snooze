"use strict";

import { StoryList, $allStoriesList, $storiesLoadingMsg, putStoriesOnPage } from './stories.js';

let storyList;

// Function to start the app
async function start() {
  console.debug("start");
  try {
    $allStoriesList.append($storiesLoadingMsg); 
    storyList = await StoryList.getStories();
    console.log("Fetched stories:", storyList); 

    if (storyList?.stories) {
      putStoriesOnPage(storyList);
    } else {
      console.error('storyList is not properly initialized');
    }
  } catch (error) {
    console.error('Error starting application:', error);
  }
}

// Event listener for DOMContentLoaded to handle initial page load
document.addEventListener("DOMContentLoaded", () => {
  const navLogin = document.getElementById('nav-login');
  const navAll = document.getElementById('nav-all');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const storiesContainer = document.getElementById('stories-container');
  const accountFormsContainer = document.querySelector('.account-forms-container');

  navLogin.addEventListener('click', () => {
    storiesContainer.style.display = 'none';
    accountFormsContainer.style.display = 'block';
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  });

  navAll.addEventListener('click', () => {
    storiesContainer.style.display = 'block';
    accountFormsContainer.style.display = 'none';
  });
});

// Initialize the application once the document is ready
$(document).ready(async function() {
  await start();
  await putStoriesOnPage(await StoryList.getStories());
});
