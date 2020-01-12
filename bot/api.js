class Api {
  constructor(baseApiUrl, token) {
    this.baseApiUrl = baseApiUrl;
    this.token = token;

    this.isUserRegistered = this.isUserRegistered.bind(this);
    this.isUserTrackingAlcohol = this.isUserTrackingAlcohol.bind(this);
    this.isUserTrackingNicotine = this.isUserTrackingNicotine.bind(this);
    this.getUserVape = this.getUserVape.bind(this);
    this.submitAlcohol = this.submitAlcohol.bind(this);
    this.submitNicotine = this.submitNicotine.bind(this);
  }

  isUserRegistered = discordId => true;

  isUserTrackingAlcohol = discordId => true;

  isUserTrackingNicotine = discordId => true;

  getUserVape = discordId => ({ volume: 5, strength: 12 });

  submitAlcohol = (discordId, category, quantity) => {};

  submitNicotine = (discordId, category, quantity) => {};
}

export default Api;
