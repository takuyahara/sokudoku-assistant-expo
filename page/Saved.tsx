import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Saved({ addSavePage }) {
  const [saved, setSaved] = useState([]);
  const save = (page) => {
    saved.push(page);
    setSaved(saved);
  }
  addSavePage(save);
  return (
    <View style={styles.container}>
      <Text style={styles.time}>I want to read a book from page</Text>
      <Text style={styles.time}>{saved.join("\n")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 30,
    fontWeight: '100',
  }
});
