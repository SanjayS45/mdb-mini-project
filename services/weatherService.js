// START: ADD YOUR API KEY HERE!
const API_KEY = '';
const BERKELEY_LAT = 37.8715;
const BERKELEY_LON = -122.2730;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// function that will call WeatherAPI to get data
export const getWeatherData = async (city = 'Berkeley') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city},US&appid=${API_KEY}&units=imperial`
    );
    const data = await response.json();
    
    if (data.cod !== 200) {
      throw new Error(data.message);
    }
    
    // this returns a bunch of data about the weather, you can access it easily when making components 
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

// function that determines the "vibe" based on time and weather 
export const getWeatherVibe = (weather) => {
  const { temp, condition, windSpeed } = weather;
  const hour = new Date().getHours();
  
  // Determine time of day
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  
  // Determine vibe based on weather conditions
  if (condition === 'Rain' || condition === 'Drizzle') {
    return {
      vibe: 'Cozy',
      emoji: '☕',
      color: '#94a3b8',
      reason: `It's raining - maybe let's stay indoors!`,
    };
  }
  
  if (condition === 'Thunderstorm') {
    return {
      vibe: 'Chill',
      emoji: '🎮',
      color: '#64748b',
      reason: `Stormy weather - we should stay in!`,
    };
  }
  
  if (temp < 50) {
    return {
      vibe: 'Cozy',
      emoji: '🔥',
      color: '#f97316',
      reason: `Chilly ${timeOfDay} - time to bundle up`,
    };
  }
  
  if (temp > 80 && timeOfDay !== 'evening') {
    return {
      vibe: 'Chill',
      emoji: '🌊',
      color: '#06b6d4',
      reason: `Hot ${timeOfDay} - take it easy`,
    };
  }
  
  if (temp >= 65 && temp <= 80 && condition === 'Clear') {
    return {
      vibe: 'Adventurous',
      emoji: '🏔️',
      color: '#10b981',
      reason: `Perfect ${timeOfDay} weather for adventure`,
    };
  }
  
  if (temp >= 60 && temp <= 75) {
    return {
      vibe: 'Active',
      emoji: '⚽',
      color: '#8b5cf6',
      reason: `Great ${timeOfDay} for activities`,
    };
  }
  
  if (timeOfDay === 'evening' && temp > 60) {
    return {
      vibe: 'Social',
      emoji: '🎉',
      color: '#ec4899',
      reason: `Beautiful evening for gathering`,
    };
  }
  
  return {
    vibe: 'Chill',
    emoji: '😌',
    color: '#6366f1',
    reason: `Nice ${timeOfDay} to relax`,
  };
};


// function that matches activities to the "vibe"
export const getActivitiesForVibe = (vibe, weather) => {
  const activities = {
    Cozy: [
      { name: 'Cards & Cookies', location: "Riana's House", indoor: true },
      { name: 'Movies', location: 'Elmwood', indoor: true },
      { name: 'Winter Hot Chocolate', location: 'Somewhere cozy', indoor: true },
    ],
    Chill: [
      { name: 'Study Sesh', location: 'Binge Coffee', indoor: true },
      { name: 'Bowling', location: 'Lucky Strike', indoor: true },
    ],
    Adventurous: [
      { name: 'Hiking Trip', location: 'Yosemite', outdoor: true },
      { name: 'Beach Day', location: 'Marin County', outdoor: true },
      { name: 'Sunset Hike', location: 'Big C', outdoor: true },
    ],
    Active: [
      { name: 'MDBMarathon', location: 'Golden Gate Bridge', outdoor: true },
      { name: 'IM Soccer', location: 'Witter Field', outdoor: true },
    ],
    Social: [
      { name: 'Potluck', location: 'Apartment', outdoor: true },
      { name: 'Painting & Picnic', location: 'The Glade', outdoor: true },
      { name: 'Wine & Cheese', location: 'TBD', outdoor: true },
    ],
  };
  
  let vibeActivities = activities[vibe] || [];
  
  // Filter based on weather if needed
  if (weather.condition === 'Rain' || weather.condition === 'Thunderstorm') {
    vibeActivities = vibeActivities.filter(a => a.indoor);
  }
  
  return vibeActivities;
};