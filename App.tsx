import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { useKeepAwake } from 'expo-keep-awake';

import Top from './page/Top';
import Count from './page/Count';
import Saved from './page/Saved';
import MyContext from './context/main';
import CountContext from './context/Count';
import SaveContext from './context/Save';
import { CRITERIA } from './enum/Swiper';

export default function App() {
  const [pageRange, setPageRange] = useState({
    from: 1, to: 300
  });
  const [time, setTime] = useState(30);



  const countConfigChanged = useRef((newConf, newTime) => {});
  const onConfigChanged = (func) => {
    countConfigChanged.current = func; // (num) => {}
  }

  const onConfigChange = (newPageRange, newTime) => {
    setPageRange(newPageRange);
    setTime(newTime);
    resetSaved();
    countConfigChanged.current(newPageRange, newTime);
  }

  const [funcIndexChanged, setFuncIndexChanged] = useState([]);
  const addIndexChangedFunc = (func: () => void, criteria: CRITERIA) => {
    setFuncIndexChanged(funcIndexChanged.concat([
      {
        'run': func,
        'criteria': criteria
      }
    ]));
  }
  const onIndexChanged = (index) => {
    funcIndexChanged
      .filter(func => func.criteria(index))
      .forEach(func => {
        func.run();
      });
  }

  const [savedPages, addPage] = useState(new Set());
  const onSaved = (page) => {
    addPage(new Set(savedPages).add(page));
  }
  const resetSaved = () => {
    addPage(new Set());
  }

  useKeepAwake();
  return (
    <MyContext.Provider value={addIndexChangedFunc}>
      <Swiper loop={false} showsPagination={false} onIndexChanged={onIndexChanged}>
        <Top onConfigChange={onConfigChange} />
        <Swiper loop={false} showsPagination={false} horizontal={false}>
          <CountContext.Provider value={onConfigChanged}>
            <SaveContext.Provider value={onSaved}>
              <Count pageRange={pageRange} time={time} />
            </SaveContext.Provider>
          </CountContext.Provider>
            <Saved savedPages={savedPages} />
        </Swiper>
      </Swiper>
    </MyContext.Provider>
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
    fontSize: 50,
    fontWeight: '100',
  },
  centerize: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-25%',
    marginLeft: '-25%'
  }
});
