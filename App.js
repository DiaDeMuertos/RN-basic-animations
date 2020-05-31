import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  TouchableOpacity,
  ScrollView,
  Easing,
} from 'react-native';

const App = () => {
  const move = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const moveSpring = useRef(new Animated.Value(0)).current;
  const bounce = useRef(new Animated.Value(0)).current;
  const spinLoop = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const moveXY = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinLoop, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(300),
      ]),
    ).start();
  });

  const spinInterpolate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const spinLoopInterpolate = spinLoop.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleResetOnClick = () => {
    Animated.timing(move, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(spin, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.spring(moveSpring, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(bounce, {
      toValue: 0,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();

    Animated.timing(moveXY, {
      toValue: {x: 0, y: 0},
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleMoveOnClick = () => {
    Animated.timing(move, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(spin, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.spring(moveSpring, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(bounce, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();

    Animated.timing(moveXY, {
      toValue: {x: 100, y: 100},
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.centerCol}
        style={styles.allWidth}>
        <View style={styles.header} />
        <Animated.View
          style={[{transform: [{translateX: move, rotate: spinInterpolate}]}]}>
          <View style={styles.square} />
        </Animated.View>
        <Text style={styles.label}>move left while spin </Text>

        <Animated.View style={{transform: [{translateX: moveSpring}]}}>
          <View style={styles.sphere} />
        </Animated.View>
        <Text style={styles.label}>spring to left</Text>

        <Animated.View style={{transform: [{scale: bounce}]}}>
          <View style={styles.sphere} />
        </Animated.View>
        <Text style={styles.label}>Grown and bounce</Text>

        <Animated.View style={{transform: [{rotate: spinLoopInterpolate}]}}>
          <View style={styles.square} />
        </Animated.View>
        <Text style={styles.label}>Spin loop</Text>

        <Animated.View style={{opacity: opacity}}>
          <View style={styles.sphere} />
        </Animated.View>
        <Text style={styles.label}>Fadein/out loop</Text>

        <Animated.View
          style={{transform: [{translateX: moveXY.x, translateY: moveXY.y}]}}>
          <View style={styles.sphere} />
        </Animated.View>
        <Text style={styles.label}>move to left and bottom at same time </Text>
        <View style={styles.footer} />
      </ScrollView>
      <TouchableOpacity
        style={[styles.btn, styles.topLeft]}
        onPress={handleMoveOnClick}>
        <Text>MOVE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.topRight]}
        onPress={handleResetOnClick}>
        <Text>RESET</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sphere: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    backgroundColor: 'red',
    margin: 2,
  },
  square: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    margin: 2,
  },
  btn: {
    backgroundColor: 'gray',
    padding: 2,
    borderRadius: 5,
  },
  topLeft: {
    position: 'absolute',
    top: 4,
    left: 4,
  },
  topRight: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  label: {
    padding: 2,
  },
  footer: {height: 100, width: '100%'},
  header: {height: 20, width: '100%'},
  allWidth: {width: '100%'},
  centerCol: {alignItems: 'center'},
});

export default App;
