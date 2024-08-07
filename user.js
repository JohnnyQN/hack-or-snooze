"use strict";

// Handle user-related functionalities

class User {
  constructor(username, name, createdAt, favorites = [], ownStories = []) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;
    this.favorites = favorites;
    this.ownStories = ownStories;
  }

  // Method to add a story to user's favorites
  addFavorite(storyId) {
    this.favorites.push(storyId);
  }

  // Method to remove a story from user's favorites
  removeFavorite(storyId) {
    this.favorites = this.favorites.filter(id => id !== storyId);
  }

  // Method to add a story to user's own stories
  addStory(story) {
    this.ownStories.push(story);
  }
}

export { User };
