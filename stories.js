"use strict";

import { Story } from './models.js';

const BASE_URL = 'https://hack-or-snooze-v3.herokuapp.com';

const $allStoriesList = $("#all-stories-list");
const $myStories = $("#my-stories");
const $favoritedStories = $("#favorited-stories");
const $storiesLoadingMsg = $("#stories-loading-msg");

// Function to generate HTML for a single story
function generateStoryMarkup(story) {
  return `
    <li id="${story.storyId}">
      <a href="${story.url}" target="_blank" class="story-link">${story.title}</a>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `;
}

// Function to get and render stories on page
async function putStoriesOnPage(storyList) {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();
  storyList.stories.forEach(story => {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  });
  $allStoriesList.show();
}

// Class to handle story-related API calls and data
class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  // Static method to get all stories
  static async getStories() {
    const response = await axios.get(`${BASE_URL}/stories`);
    const stories = response.data.stories.map(story => new Story(story));
    return new StoryList(stories);
  }
}

// Event listener for story submission
$("#submit-form").on("submit", async function (event) {
  event.preventDefault();

  const title = $("#create-title").val();
  const author = $("#create-author").val();
  const url = $("#create-url").val();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const storyData = {
    token,
    story: { author, title, url, username }
  };

  try {
    const response = await axios.post(`${BASE_URL}/stories`, storyData);
    const newStory = new Story(response.data.story);
    const storyMarkup = generateStoryMarkup(newStory);

    $allStoriesList.prepend(storyMarkup);
    $("#submit-form").trigger("reset");
  } catch (error) {
    console.error("Error submitting story:", error);
  }
});

export { StoryList, $allStoriesList, $myStories, $favoritedStories, $storiesLoadingMsg, putStoriesOnPage };
