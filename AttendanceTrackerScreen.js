import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

const formatDate = (date) => {
  return date.toDateString();
};

const AttendanceTrackerScreen = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [lastPunchType, setLastPunchType] = useState(null); // 'Punch In' or 'Punch Out'

  const onPressPunch = () => {
    const newPunchType = isPunchedIn ? 'Punch Out' : 'Punch In';
    setIsPunchedIn(!isPunchedIn);
    setLastPunchType(newPunchType);
  };

  useEffect(() => {
    if (!lastPunchType) return;

    const now = new Date();
    const log = {
      date: formatDate(now),
      time: formatTime(now),
      type: lastPunchType,
    };

    setAttendanceLogs((prev) => [log, ...prev]);
    Alert.alert('Success', `Successfully ${lastPunchType}`);
  }, [lastPunchType]);

  const getCurrentWeekLogs = () => {
    const now = new Date();
    const currentWeekDay = now.getDay(); // Sunday = 0
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - currentWeekDay);

    return attendanceLogs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= startOfWeek && logDate <= now;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ATK - Attendance Tracker</Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isPunchedIn ? '#FF4C4C' : '#4CAF50' },
        ]}
        onPress={onPressPunch}
      >
        <Text style={styles.buttonText}>
          {isPunchedIn ? 'Punch Out' : 'Punch In'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Weekly Attendance Records</Text>
      <FlatList
        data={getCurrentWeekLogs()}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={styles.recordText}>{item.date}</Text>
            <Text style={styles.recordText}>{item.time}</Text>
            <Text
              style={[
                styles.recordText,
                { color: item.type === 'Punch In' ? '#4CAF50' : '#FF4C4C' },
              ]}
            >
              {item.type}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No records this week.</Text>
        }
      />
    </View>
  );
};

export default AttendanceTrackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F2F2',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 12,
    fontWeight: '600',
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  recordItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  recordText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    color: '#888',
  },
});
