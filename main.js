"use strict";

import { StoryList, $allStoriesList, $storiesLoadingMsg, putStoriesOnPage } from './stories.js';

let storyList;

async function start() {
  console.debug("start");
  try {
    $allStoriesList.append($storiesLoadingMsg); 
    storyList = await StoryList.getStories();
    console.log("Fetched stories:", storyList); 

    if (storyList && storyList.stories) {
      putStoriesOnPage(storyList);
    } else {
      console.error('storyList is not properly initialized');
    }
  } catch (error) {
    console.error('Error starting application:', error);
  }
}

$(document).ready(async function() {
    start();
    await putStoriesOnPage(await StoryList.getStories());
  });

async function checkForRememberedUser() {
  // Implementation for checking remembered user
}

function updateUIOnUserLogin() {
  // Implementation for updating UI on user login
}
