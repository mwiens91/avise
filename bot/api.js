import fetch from "node-fetch";

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

  // Get a user corresponding to a Discord ID. This will throw an error
  // if the request failed.
  getUserFromDiscordId = discordId =>
    fetch(`${this.baseApiUrl}/discord-id-current-user/${discordId}/`).then(
      response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      }
    );

  isUserRegistered = discordId => {
    try {
      this.getUserFromDiscordId(discordId);

      return true;
    } catch (e) {
      return false;
    }
  };

  isUserTrackingAlcohol = discordId =>
    this.getUserFromDiscordId(discordId).then(user => user.track_alcohol);

  isUserTrackingNicotine = discordId =>
    this.getUserFromDiscordId(discordId).then(user => user.track_nicotine);

  // The return type here is either null or has structure like
  //
  // { id: 2, user: 5, volume: 213, strength: 1234 }
  //
  // where volume is in mL and strength is in mg/mL. Ignore the id and
  // user as its basically useless for the bot code.
  getUserVape = discordId =>
    this.getUserFromDiscordId(discordId).then(user => user.vape);

  submitAlcohol = (discordId, category, quantity) =>
    this.getUserFromDiscordId(discordId)
      .then(user =>
        fetch(`${this.baseApiUrl}/data-alcohol/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${this.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: user.id,
            category: category,
            quantity: quantity
          })
        })
      )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      });

  // Both the submitNicotine and submitAlcohol functions will return
  // something like
  //
  // {
  //   id: 3,
  //   datetime: '2020-01-12T13:22:26',
  //   user: 5,
  //   quantity: 1,
  //   category: 'wine'
  // }
  //
  // which probably isn't useful for anything.
  submitNicotine = (discordId, category, quantity) =>
    this.getUserFromDiscordId(discordId)
      .then(user =>
        fetch(`${this.baseApiUrl}/data-nicotine/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${this.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: user.id,
            category: category,
            quantity: quantity
          })
        })
      )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      });
}

export default Api;
