"use strict";

import { Story } from './models.js';

const BASE_URL = 'https://hack-or-snooze-v3.herokuapp.com'; // Add your base URL here

const $allStoriesList = $("#all-stories-list");
const $myStories = $("#my-stories");
const $favoritedStories = $("#favorited-stories");
const $storiesLoadingMsg = $("#stories-loading-msg");

function generateStoryMarkup(story) {
  return `
    <li id="${story.storyId}">
      <a href="${story.url}" target="_blank">${story.title}</a>
      <small>(${story.getHostName()})</small>
      <small>by ${story.author}</small>
      <small>posted by ${story.username}</small>
    </li>
  `;
}

function putStoriesOnPage(storyList) {
  $storiesLoadingMsg.hide();
  $allStoriesList.empty();

  if (storyList.stories.length === 0) {
    $allStoriesList.append("<h5>No stories available!</h5>");
  } else {
    for (let story of storyList.stories) {
      const storyMarkup = generateStoryMarkup(story);
      $allStoriesList.append(storyMarkup);
    }
  }
}

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  static async getStories() {
    try {
      const response = await axios({
        url: `${BASE_URL}/stories`,
        method: "GET"
      });

      const stories = response.data.stories.map(story => new Story(story));
      return new StoryList(stories);
    } catch (error) {
      console.error("Error getting stories:", error);
      throw error; // Ensure errors are propagated
    }
  }

  async addStory(user, newStory) {
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "POST",
      data: { token: user.loginToken, story: newStory }
    });

    const story = new Story(response.data.story);
    this.stories.unshift(story);
    user.ownStories.unshift(story);

    return story;
  }
}

export { StoryList, $allStoriesList, $storiesLoadingMsg, putStoriesOnPage };
