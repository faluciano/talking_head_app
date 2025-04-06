import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

interface SpeakInputProps {
  onSpeak: (text: string) => void;
}

const DEFAULT_TEXTS = [
  "Hello there!",
  "Boo!",
  "How are you today?",
  "Nice to meet you!"
];

export default function SpeakInput({ onSpeak }: SpeakInputProps) {
  const [text, setText] = useState('');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');
  const isDark = backgroundColor === Colors.dark.background;

  const handleSpeak = () => {
    if (text.trim()) {
      onSpeak(text);
      setText('');
    }
  };

  const handleDefaultText = (defaultText: string) => {
    onSpeak(defaultText);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.defaultTextContainer}>
        {DEFAULT_TEXTS.map((defaultText, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.defaultTextButton, { backgroundColor: iconColor + '20' }]}
            onPress={() => handleDefaultText(defaultText)}
          >
            <Text style={[styles.defaultTextButtonText, { color: textColor }]}>{defaultText}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TextInput
        style={[styles.input, { 
          backgroundColor: backgroundColor,
          borderColor: iconColor,
          color: textColor,
        }]}
        value={text}
        onChangeText={setText}
        placeholder="Or enter your own text to speak..."
        placeholderTextColor={iconColor}
        multiline
      />
      <TouchableOpacity 
        style={[
          styles.button, 
          !text.trim() && styles.buttonDisabled, 
          { backgroundColor: isDark ? '#0A84FF' : tintColor }
        ]}
        onPress={handleSpeak}
        disabled={!text.trim()}
      >
        <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Speak</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  defaultTextContainer: {
    marginBottom: 12,
  },
  defaultTextButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  defaultTextButtonText: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 