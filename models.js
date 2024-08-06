"use strict";

export class Story {
  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  getHostName() {
    let hostName;
    try {
      hostName = new URL(this.url).hostname;
    } catch (err) {
      hostName = "invalid URL";
    }
    return hostName;
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
      console.log('Fetched stories:', stories); 
      return new StoryList(stories);
    } catch (error) {
      console.error("Error getting stories:", error);
      throw error; 
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

export { StoryList };
