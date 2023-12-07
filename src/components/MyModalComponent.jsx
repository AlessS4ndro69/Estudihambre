// FloatingMessage.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../database/firebase';

const MyModal = ({ message, onClose, idAnswer, MyComponent }) => {


  return (
    <View style={styles.floatingContainer}>
      <View style={styles.floatingContent}>
        <Text>{message}</Text>
        <MyComponent/>
        
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'transparent', // Fondo transparente
    margin: 40,
    
  },
  floatingContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    paddingBottom:40,
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
  },
});

export default MyModal;
