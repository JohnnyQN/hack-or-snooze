"use strict";

const BASE_URL = 'https://hack-or-snooze-v3.herokuapp.com';

// Story class to represent individual stories
class Story {
  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }
}

// User class to handle user-related functionalities
class User {
  constructor({ username, name, createdAt, favorites = [], ownStories = [] }, token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));
    this.loginToken = token;
  }

  // Method to get a user token
  static async login(username, password) {
    const response = await axios.post(`${BASE_URL}/login`, { user: { username, password } });
    let { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  // Method to sign up a user
  static async signup(username, password, name) {
    const response = await axios.post(`${BASE_URL}/signup`, { user: { username, password, name } });
    let { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  // Method to add a story to user's favorites
  async addFavorite(storyId) {
    this.favorites.push(storyId);
    await axios.post(`${BASE_URL}/users/${this.username}/favorites/${storyId}`, {
      token: this.loginToken
    });
  }

  // Method to remove a story from user's favorites
  async removeFavorite(storyId) {
    this.favorites = this.favorites.filter(id => id !== storyId);
    await axios.delete(`${BASE_URL}/users/${this.username}/favorites/${storyId}`, {
      data: { token: this.loginToken }
    });
  }
}

export { Story, User };
