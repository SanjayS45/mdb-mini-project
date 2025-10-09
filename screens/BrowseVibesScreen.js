import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getWeatherData, getActivitiesForVibe } from '../services/weatherService';

const VIBES = [
  { name: 'Adventurous', emoji: '🏔️', color: '#10b981' },
  { name: 'Active', emoji: '⚽', color: '#8b5cf6' },
  { name: 'Social', emoji: '🎉', color: '#ec4899' },
  { name: 'Cozy', emoji: '☕', color: '#94a3b8' },
  { name: 'Chill', emoji: '😌', color: '#6366f1' },
];

export default function BrowseVibesScreen() {
  //   1) CREATE three useState to create state variables
  // - selectedVibe: tracks which mood/vibe the user has chosen
  // - weather: stores weather data from the API
  // - loading: shows/hides loading spinner while fetching data


  //  2) CREATE useEffect runs code when component loads 
  // - Empty dependency array [] means this only runs once
  // - Automatically fetches weather data when screen loads

  // 3) WRITE a function that fetches weather data from an API
  // should be try, catch, finally 


  // 4) loading screen, so what should be true here?
  if (_______) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const activities = getActivitiesForVibe(selectedVibe, weather);
  const selectedVibeData = VIBES.find(v => v.name === selectedVibe);

  // this function analyzes how well an activity matches current weather
  // - takes an activity object as input and returns compatibility info
  // - returns an object with text, color, and star rating
  const getWeatherCompatibility = (activity) => {
    if (activity.outdoor) {
      if (weather.condition === 'Rain' || weather.condition === 'Thunderstorm') {
        return { text: 'Rainy!', color: '#ef4444', stars: '⭐' };
      }
      if (weather.temp < 50) {
        return { text: 'Chilly!', color: '#f59e0b', stars: '⭐⭐⭐' };
      }
      if (weather.temp > 85) {
        return { text: 'Hot!', color: '#f59e0b', stars: '⭐⭐⭐' };
      }
      return { text: 'Perfect weather!', color: '#10b981', stars: '⭐⭐⭐⭐⭐' };
    }
    return { text: 'Indoor!', color: '#6366f1', stars: '⭐⭐⭐⭐' };
  };

  return (
    <View style={styles.container}>
      {/* Weather Summary */}
      <View style={styles.weatherBanner}>
        <Text style={styles.weatherBannerText}>
          {weather.temp}°F • {weather.description}
        </Text>
      </View>

      {/* Vibe Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vibeSelector}>
        {VIBES.map((vibe) => (
          <TouchableOpacity
            key={vibe.name}
            style={[
              styles.vibeTab,
              selectedVibe === vibe.name && { backgroundColor: vibe.color },
            ]}
            // 5) What function should go here? What useState variable should change?
            onPress={() => ____________}
          >
            <Text style={styles.vibeEmoji}>{vibe.emoji}</Text>
            <Text
              style={[
                styles.vibeTabText,
                selectedVibe === vibe.name && styles.vibeTabTextActive,
              ]}
            >
              {vibe.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Activities List */}
      <ScrollView style={styles.activitiesList}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{selectedVibeData.emoji} {selectedVibe} Activities</Text>
          <Text style={styles.headerSubtitle}>{activities.length} options available</Text>
        </View>

        {activities.map((activity, index) => {
          const compatibility = getWeatherCompatibility(activity);
          return (
            <View key={index} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityName}>{activity.name}</Text>
                <Text style={styles.activityType}>
                  {activity.indoor ? '🏠' : '🌤️'}
                </Text>
              </View>
              <Text style={styles.activityLocation}>📍 {activity.location}</Text>
              
              <View style={styles.compatibilityBadge}>
                <Text style={styles.stars}>{compatibility.stars}</Text>
                <Text style={[styles.compatibilityText, { color: compatibility.color }]}>
                  {compatibility.text}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
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
  },
  weatherBanner: {
    backgroundColor: '#6366f1',
    padding: 12,
    alignItems: 'center',
  },
  weatherBannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  vibeSelector: {
    maxHeight: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  vibeTab: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    minWidth: 100,
  },
  vibeEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  vibeTabText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  vibeTabTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  activitiesList: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
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
    flex: 1,
  },
  activityType: {
    fontSize: 20,
  },
  activityLocation: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  compatibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  stars: {
    fontSize: 12,
    marginRight: 8,
  },
  compatibilityText: {
    fontSize: 13,
    fontWeight: '600',
  },
});