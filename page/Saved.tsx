import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function Saved({ savedPages }) {
  const arrSavedPages = [];
  for (const savedPage of savedPages[Symbol.iterator]()) {
    arrSavedPages.push(savedPage)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>I saved page</Text>
      <View style={styles.pageContainer}>
        {arrSavedPages.map(savedPage => (
          <Text style={styles.time} key={savedPage}>{savedPage}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152d44',
    alignItems: 'center',
  },
  headline: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 30,
    fontWeight: '100',
    marginTop: 40,
    marginBottom: 20
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: Math.floor(Dimensions.get('window').width / 75) * 75,
    overflow: 'hidden'
  },
  time: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 30,
    fontWeight: '100',
    width: 55,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  }
});
