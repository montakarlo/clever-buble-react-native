import { DraxView } from 'react-native-drax';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function DragObject(props) {
  const [currentPosition, setCurrentPosition] = useState({
    x: props.intialLocation.left,
    y: props.intialLocation.top
  });
  const [isMoving, setIsMoving] = useState(false);
  useEffect(() => {
    if (!props.isInDroppedZone) {
      console.log('drop out');
      setCurrentPosition({
        x: props.intialLocation.left,
        y: props.intialLocation.top
      })
    }
  }, [props.isInDroppedZone])
  return (
      //Boilerplate style: Implement your draggable component here!
      <DraxView
        style={{...styles.bubble, 
          top: !props.isInDroppedZone ? currentPosition.y : props.intialLocation.top, 
          left: !props.isInDroppedZone ? currentPosition.x : props.intialLocation.left,
          width: 2*props.objectRadius,
          height: 2*props.objectRadius,
        }}
        onDragStart={() => setIsMoving(true)}
        onDragEnd={() => {
          if (props.isMovedOutOfDroppedZone) {
            props.setIsInDroppedZone(false);
            props.updateDropColor('blue');
          }

          setIsMoving(false);
        }}
        onDrag={(data) => {
          setCurrentPosition({
            x: data.dragAbsolutePosition.x - 30,
            y: data.dragAbsolutePosition.y - 30
          })
        }}
      />
  );
}

const styles = StyleSheet.create({
  bubble:{
    position:"absolute",
    zIndex: 100,
    borderRadius:120,
    backgroundColor:"green",
  }
})
