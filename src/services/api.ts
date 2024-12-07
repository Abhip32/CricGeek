const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const cricketApi = {
  getLiveMatches: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getLive`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch live matches');
    }
  },

  getRecentMatches: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getRecent`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch recent matches');
    }
  },

  getUpcomingMatches: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getUpcoming`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch upcoming matches');
    }
  },


    getTopNews: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getNews`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const news = await response.json();
      return news.slice(0, 4); // Filter top 4 news only
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch news');
    }
  },

  getScoreCard: async (url: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getScoreCard?url=${url}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch scorecard');
    }
  },

  getSquads: async (url: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getSquads?url=${url}`);
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch squad');
    }
  },

  getCommentary: async (url: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getCommentary?url=${url}`);
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch commentary');
    }
  },
  
  getMatchNews: async (url: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getMatchNews?url=${url}`);
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch match news');
    }
  },

  getMiniScoreCard: async (url: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getMiniScoreCard?url=${url}`);
      return await response.json();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch mini scorecard');
    }
  },

  getSchedule: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getSchdule`);
      const data=await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch schedule');
    }
  },
  // Add other API calls here as needed
}; 