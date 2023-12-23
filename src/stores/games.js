import { defineStore } from "pinia";

const TENNIS_API_URL = "https://api.api-tennis.com/tennis/";
const API_KEY =
  "180fc8f42877e51e2ab6e22a8e65be1aa951f5ee63b012a132edcc8c6f290d7b";

export const useGameStore = defineStore("game", {
  state: () => ({
    tournaments: [],
    players: [],
    standings: [],
    liveGames: [],
    myGames: [],
  }),
  getters: {
    getAustralianOpen: (state) => {
      return state.tournaments.filter(
        (tournament) =>
          tournament.tournament_name == "Australian Open" &&
          tournament.event_type_type == "Atp Singles"
      );
    },

    getPlayers: (state) => {
      return state.players;
    },

    getStandings: (state) => {
      return state.standings;
    },
  },
  actions: {
    async fetchTournaments() {
      try {
        const response = await fetch(
          `${TENNIS_API_URL}?method=get_tournaments&APIkey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.tournaments = data.result; // Assuming the response is an array of tournaments
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    },

    async fetchPlayers() {
      try {
        const response = await fetch(
          `${TENNIS_API_URL}?method=get_players&tournament_key=1236&APIkey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.players = data.result;
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    },

    async fetchLiveScores() {
      try {
        const response = await fetch(
          `${TENNIS_API_URL}?method=get_livescore&event_type=ATP&APIkey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.standings = data.result;
      } catch (error) {
        console.error("Error fetching Standings:", error);
      }
    },
  },
  persist: true,
});

//ID AUSTRALIAN OPEN BOYS SINGLES:329