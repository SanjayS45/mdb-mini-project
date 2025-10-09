import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { getWeatherData, getWeatherVibe, getActivitiesForVibe } from '../services/weatherService';

export default function CurrentVibeScreen({ navigation }) {
  // 1) WRITE five state variables
  // - weather: stores current weather conditions from API
  // - vibe: stores the mood/vibe calculated from weather data
  // - loading: controls loading spinner visibility
  // - refreshing: controls pull-to-refresh functionality
  // - error: stores any error messages to display to user

  // 2) WRITE main data fetching function that gets weather and then gets the vibe
  // format
  // in the try -->  it should getWeatherData, getVibeData, then change useState variables
  // remember catch/finally 

  
  //  3) CREATE useEffect runs function above runs when component loads 

  // 4) 
  const onRefresh = () => {
    _____________  // useState variable?
    ______________ // call function #2 again 
  };

  // 5) loading screen, so what should be true here?
  if (________) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Checking the vibe...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // LEARNING: Calculate data to display to the user
  // - Gets activities that match the current vibe, limited to top 3
  // - Determines time of day using JavaScript Date object and conditional logic
  // - These calculations happen every time the component re-renders
  const recommendedActivities = getActivitiesForVibe(vibe.vibe, weather).slice(0, 3);
  const timeOfDay = new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening';

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Weather Card */}
      <View style={styles.weatherCard}>
        <Text style={styles.location}>📍 Berkeley, CA</Text>
        <Text style={styles.temp}>{weather.temp}°F</Text>
        <Text style={styles.condition}>{weather.description}</Text>
        <View style={styles.weatherDetails}>
          <Text style={styles.detail}>Feels like {weather.feelsLike}°F</Text>
          <Text style={styles.detail}>💨 {weather.windSpeed} mph</Text>
          <Text style={styles.detail}>💧 {weather.humidity}%</Text>
        </View>
      </View>

      {/* Vibe Card */}
      <View style={[styles.vibeCard, { backgroundColor: vibe.color }]}>
        <Text style={styles.vibeEmoji}>{vibe.emoji}</Text>
        <Text style={styles.vibeTitle}>{vibe.vibe} Vibe</Text>
        <Text style={styles.vibeReason}>{vibe.reason}</Text>
        <Text style={styles.timeOfDay}>{timeOfDay}</Text>
      </View>

      {/* Recommended Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        {recommendedActivities.map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityName}>{activity.name}</Text>
              <Text style={styles.activityType}>
                {activity.indoor ? '🏠 Indoor' : '🌤️ Outdoor'}
              </Text>
            </View>
            <Text style={styles.activityLocation}>📍 {activity.location}</Text>
          </View>
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('BrowseVibes')}
        >
          <Text style={styles.navButtonText}>🎯 Browse All Vibes</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginHorizontal: 32,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#6366f1',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  weatherCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  location: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  temp: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  condition: {
    fontSize: 20,
    color: '#475569',
    textTransform: 'capitalize',
    marginBottom: 16,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  detail: {
    fontSize: 14,
    color: '#64748b',
  },
  vibeCard: {
    margin: 16,
    marginTop: 0,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vibeEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  vibeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  vibeReason: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  timeOfDay: {
    fontSize: 14,
    color: '#fff',
    marginTop: 8,
    opacity: 0.8,
    fontWeight: '600',
  },
  section: {
    margin: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  activityType: {
    fontSize: 12,
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activityLocation: {
    fontSize: 14,
    color: '#64748b',
  },
  navButtons: {
    margin: 16,
    gap: 12,
  },
  navButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  navButtonSecondary: {
    backgroundColor: '#8b5cf6',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});