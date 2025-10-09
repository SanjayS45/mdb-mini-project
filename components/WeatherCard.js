import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{weather.temp}°F</Text>
      <Text style={styles.description}>{weather.description}</Text>
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Feels Like</Text>
          <Text style={styles.detailValue}>{weather.feelsLike}°F</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>{weather.windSpeed} mph</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>{weather.humidity}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  description: {
    fontSize: 18,
    color: '#64748b',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  details: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 24,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
});