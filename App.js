import { DraxProvider, DraxView } from 'react-native-drax';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import DragObject from "./DragObject"

var windowHeight = Dimensions.get('window').height
var windowWidth = Dimensions.get('window').width;
const topPosition = .7;
const areaRadius = 60;
const objectRadius = 30;
const initialLocation = { top: 100, left: 100 }

export default function App() {
  //This state variable keeps track of the current color, which should change on magnetize!
  const [dropColor, updateDropColor] = useState("blue");
  const [isInDroppedZone, setIsInDroppedZone] = useState(false);
  const [isMovedOutOfDroppedZone, setIsMovedOutOfDroppedZone] = useState(false);
  const areaCenterX = windowWidth / 2 - objectRadius;
  const areaCenterY = windowHeight * topPosition + areaRadius - 5;

  return (
    <DraxProvider>
      <View style={styles.container}>
        <DragObject
          intialLocation={{
            top: isInDroppedZone ? areaCenterY : initialLocation.top,
            left: isInDroppedZone ? areaCenterX : initialLocation.left
          }}
          objectRadius={objectRadius}
          isMovedOutOfDroppedZone={isMovedOutOfDroppedZone}
          isInDroppedZone={isInDroppedZone}
          setIsInDroppedZone={setIsInDroppedZone}
          updateDropColor={updateDropColor}
          windowHeight={windowHeight}
          windowWidth={windowWidth}
        />
        <View style={styles.lockContainer}>
          <Text>Drag Here To Magnetize!</Text>
          <DraxView
            style={[styles.lockDrop,{borderColor:dropColor}]}
            onReceiveDragEnter={() => {
              setIsMovedOutOfDroppedZone(false);
            }}
            onReceiveDragExit={() => {
              setIsMovedOutOfDroppedZone(true);
            }}
            onReceiveDragDrop={() => {
              setIsInDroppedZone(true);
              updateDropColor('green');
            }}
          />
        </View>
      </View>
    </DraxProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:"center"
  },
  lockContainer: {
    position: "absolute",
    top: windowHeight * topPosition,
  },
  lockDrop: {
    height: areaRadius*2,
    width: areaRadius*2,
    borderRadius: 60,
    alignSelf: "center",
    borderWidth: 1,
    margin: 5,
  }
});
