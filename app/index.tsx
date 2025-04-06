import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import SpeakInput from '../components/SpeakInput';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import Constants from 'expo-constants';

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleSpeak = async (text: string) => {
    try {
      const encodedText = encodeURIComponent(text);
      const apiUrl = Constants.expoConfig?.extra?.apiUrl;
      if (!apiUrl) {
        throw new Error('API URL is not configured');
      }
      const response = await fetch(`${apiUrl}/speak?text=${encodedText}`);
      
      if (!response.ok) {
        throw new Error('Failed to send text to talking head');
      }
      
      Alert.alert('Success', 'Text sent successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send text to talking head. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor, borderBottomColor: Colors.light.border }]}>
        <Text style={[styles.title, { color: textColor }]}>Talking Head App</Text>
      </View>
      <View style={styles.content}>
        <SpeakInput onSpeak={handleSpeak} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
}); 