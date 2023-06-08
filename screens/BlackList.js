import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';

const BlackList = () => {
  const [black, setBlack] = useState([]);
  const [dataa, setDataa] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const listRef = ref(db, 'blacklist/');
    onValue(listRef, (snapshot) => {
      setBlack(snapshot.val());
    })

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    for (var i = 1; i < black.length; i++) {
      dataa.push(black[i])
    }
  }, [black]);

  return (
    <View style={styles.container}>
      {black.length > 0 ? (
        <View style={styles.listContainer}>
          {black.map((name, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.name}>{name}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.listContainer}>
          <View style={styles.listItem}>
            <Text style={styles.noName}>'No students in blacklist'</Text>
          </View>
        </View>
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noName: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default BlackList;
