import React from 'react';
import { SafeAreaView } from 'react-native';
import AttendanceTrackerScreen from './AttendanceTrackerScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AttendanceTrackerScreen />
    </SafeAreaView>
  );
}
