import React, { useState, useRef, useEffect, useContext } from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Vibration, StyleSheet, Text, View, TouchableHighlight, Dimensions, TouchableOpacity } from 'react-native';
import MyContext from '../context/main';
import CountContext from '../context/Count';
import SaveContext from '../context/Save';
import { INDEX_HORIZONTAL } from '../enum/Swiper';

const STEP_TIME = 100;
const CIRCLE_WIDTH = {
  BOOK: 30,
  PAGE: 15,
}
const INTERVAL = 30;
const outerCircleSize = Dimensions.get('window').width * 0.8;

export default function Count({ pageRange, time }) {
  const pageNum = pageRange.to - pageRange.from + 1;
  const incr = time * 60 / pageNum; // time is in minutes
  
  const [currentPage, setPage] = useState(1);
  const props = {
    pageRange: useRef(pageRange),
    time: useRef(time)
  }
  const isRunning = useRef(false);
  const timerID = useRef(undefined);
  const progress = {
    book: useRef(pageNum),
    page: useRef(incr * 1000 / INTERVAL)
  };
  const refCircle = {
    book: useRef(null),
    page: useRef(null)
  }
  
  const onTapBackground = () => {
    if (!isRunning.current) {
      timerID.current = setInterval(elapsePage, INTERVAL)
    } else {
      clearInterval(timerID.current);
    }
    isRunning.current = !isRunning.current;
  }
  const elapsePage = () => {
    if (progress.page.current - 1 > 0) {
      const nextProgress = progress.page.current - 1;
      refCircle.page.current.animate(nextProgress / (incr * 1000 / INTERVAL) * 100, 1);
      progress.page.current = nextProgress;
    } else {
      const nextProgress = incr * 1000 / INTERVAL;
      refCircle.page.current.animate(100, 1);
      progress.page.current = nextProgress;
      elapseBook();
      Vibration.vibrate(0);
    }
  }
  const elapseBook = () => {
    if (progress.book.current - 1 > 0) {
      const nextProgress = progress.book.current - 1;
      refCircle.book.current.animate(nextProgress / pageNum * 100, 30);
      progress.book.current = nextProgress;
      setPage(p => p + 1);
    } else {
      onBookRead();
    }
  }
  const onBookRead = () => {
    const pageRange = props.pageRange.current;
    // Page
    setPage(pageRange.from);
    // refCircle.page.current.animate(100, 30);
    progress.page.current = STEP_TIME;
    // Book
    refCircle.book.current.animate(100, 30);
    progress.book.current = pageRange.to - pageRange.from + 1;
    // Teardown
    clearInterval(timerID.current);
    isRunning.current = false;
  }
  const onSkip = () => {
    Vibration.vibrate(0);
    progress.page.current = incr * 1000 / INTERVAL;
    refCircle.page.current.animate(100, 30);
    elapseBook();
    if (isRunning.current) {
      clearInterval(timerID.current);
      timerID.current = setInterval(elapsePage, INTERVAL)
    }
  }
  const reset = () => {
    // firstPage.current++;
    // console.log(firstPage.current);
    setPage(props.pageRange.current.from);
    progress.book.current = props.pageRange.current.to - props.pageRange.current.from + 1;
    progress.page.current = incr * 1000 / INTERVAL;
    refCircle.book.current.animate(100, 30);
    refCircle.page.current.animate(100, 30);
    clearInterval(timerID.current);
    isRunning.current = false;
  }
  const addIndexChangedFunc = useContext(MyContext);
  const confChanged = useContext(CountContext);
  const save = useContext(SaveContext);

  const onSave = () => {
    save(currentPage);
  }

  useEffect(() => {
    addIndexChangedFunc(reset, (index) => {
      return index !== INDEX_HORIZONTAL.COUNT
    });
    confChanged((newPageRange, newTime) => {
      const pageNum = newPageRange.to - newPageRange.from + 1;
      const incr = newTime * 60 / pageNum; // time is in minutes
      props.pageRange.current = newPageRange;
      props.time.current = newTime;
      progress.book.current = newPageRange.to - newPageRange.from + 1;
      progress.page.current = incr * 1000 / INTERVAL;
      setPage(newPageRange.from);
    });
  }, []);



  return (
    <View style={styles.wrapper}>
      <TouchableHighlight style={styles.skipButton} onPress={onSkip} underlayColor={"#00e0ff"}>
        <Text style={styles.textStyle}>Skip</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.saveButton} onPress={onSave}>
        <Text style={styles.textStyle}>Save</Text>
      </TouchableHighlight>
      <View style={styles.counter}>
        <Text style={styles.message}>You are reading</Text>
        <Text style={styles.pageNum}>P. {currentPage}</Text>
        <AnimatedCircularProgress
          ref={refCircle.page}
          size={outerCircleSize - CIRCLE_WIDTH.BOOK * 2}
          width={CIRCLE_WIDTH.PAGE}
          fill={100}
          prefill={100}
          style={styles.circlePage}
          tintColor="#00ffe0"
          backgroundColor="#3d5875" />
        <AnimatedCircularProgress
          ref={refCircle.book}
          size={outerCircleSize}
          width={CIRCLE_WIDTH.BOOK}
          fill={100}
          prefill={100}
          style={styles.circleBook}
          tintColor="#00e0ff"
          backgroundColor="#3d5875" />
      </View>
      <TouchableOpacity
        style={styles.tapArea} 
        onPress={onTapBackground} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    zIndex: 1,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#152d44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 23,
    fontWeight: '200',
  },
  pageNum: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 50,
    fontWeight: '100',
  },
  circlePage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: - (outerCircleSize - CIRCLE_WIDTH.BOOK * 2) / 2,
    marginLeft: - (outerCircleSize - CIRCLE_WIDTH.BOOK * 2) / 2,
  },
  circleBook: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -outerCircleSize / 2,
    marginLeft: -outerCircleSize / 2,
  },
  tapArea: {
    zIndex: 30,
    backgroundColor: 'white',
    opacity: 0,
    width: outerCircleSize,
    height: outerCircleSize,
    borderRadius: outerCircleSize / 2
  },
  skipButton: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: '50%',
    width: 200,
    height: 100,
    marginTop: 50,
    marginLeft: -100,
    backgroundColor: '#3d5875',
    borderColor: '#00e0ff',
    borderWidth: 1,
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveButton: {
    zIndex: 100,
    position: 'absolute',
    top: '100%',
    left: '50%',
    width: 200,
    height: 100,
    marginTop: -100 - 50,
    marginLeft: -100,
    backgroundColor: '#3d5875',
    borderColor: '#00e0ff',
    borderWidth: 1,
    borderRadius: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 50,
  }
});
