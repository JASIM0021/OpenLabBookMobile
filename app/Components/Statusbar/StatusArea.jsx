import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const StatusArea = () => {
  const theme = useTheme();
  return <StatusBar />;
};

export default StatusArea;

const styles = StyleSheet.create({});
