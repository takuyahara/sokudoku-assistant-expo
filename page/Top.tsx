import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const PAGE_FROM = 1;
const PAGE_TO = 300;
const TIME = 30;

export default function Top({ onConfigChange }) {
  const [pageFrom, setPageFrom] = useState(String(PAGE_FROM));
  const [pageTo, setPageTo] = useState(String(PAGE_TO));
  const [time, setTime] = useState(String(TIME));
  const [timePerPage, setTimePerPage] = useState(300);
  const onChangeText = (setter) => {
    return (text) => {
      if (text.length >= 1 && !text.match(/^[0-9]*$/)) {
        return;
      }
      setter(text);
    }
  }
  const onBlur = (setter, defaultValue) => {
    return (e) => {
      const text = e.nativeEvent.text;
      const newText = text.replace(/^(?:0+)([1-9]*)$/, "$1");
      if (newText.length === 0) {
        setter(String(defaultValue));
      } else {
        setter(newText);
      }
    }
  }
  const changeTimePerPage = () => {
    const pageRange = {
      from: parseInt(pageFrom),
      to: parseInt(pageTo)
    }
    const pageNum = pageRange.to - pageRange.from + 1;
    const timeInSecond = parseInt(time) * 60;
    const isAllValueNonNull = [pageFrom, pageTo, time].every(val => val !== "" && !val.match(/^0+$/))
    if (isAllValueNonNull) {
      setTimePerPage(timeInSecond / pageNum);
    }
    onConfigChange(pageRange, time);
  }
  useEffect(() => {
    changeTimePerPage();
  }, [pageFrom, pageTo, time])
  return (
    <View style={styles.container}>
      <Text style={styles.time}>I want to read a book</Text>
      <View style={styles.inputRow}>
        <Text style={styles.time}>from page {" "}</Text>
        <TextInput 
          keyboardType='phone-pad'
          style={styles.textInput}
          value={pageFrom.toString()}
          onChangeText={onChangeText(setPageFrom)}
          onBlur={onBlur(setPageFrom, PAGE_FROM)}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.time}>to page {" "}</Text>
        <TextInput 
          keyboardType='phone-pad'
          style={styles.textInput}
          value={pageTo.toString()}
          onChangeText={onChangeText(setPageTo)}
          onBlur={onBlur(setPageTo, PAGE_TO)}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.time}>in {" "}</Text>
        <TextInput 
          keyboardType='phone-pad'
          style={styles.textInput}
          value={time.toString()}
          onChangeText={onChangeText(setTime)}
          onBlur={onBlur(setTime, TIME)}
        />
        <Text style={styles.time}>{" "} minutes</Text>
      </View>
      <Text style={styles.time}>
        so that {" "}
        <Text style={styles.state}>{Math.round(timePerPage * 10) / 10}</Text>
        {" "} seconds per pages.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152d44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 28,
    fontWeight: '100',
  },
  inputRow: {
    flexDirection: 'row',
  },
  textInput: {
    height: 40, 
    width: 70, 
    borderColor: 'gray', 
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 28,
    fontWeight: '200',
    textAlign: 'center'
  },
  state: {
    color: 'white',
    fontSize: 28,
    fontWeight: '200',
  }
});
