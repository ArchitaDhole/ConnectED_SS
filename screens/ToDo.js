import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';

const ToDo = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Math Assignment', description: 'Complete exercises 1-10' },
    { id: 2, title: 'History Essay', description: 'Write a 500-word essay on World War II' },
    { id: 3, title: 'Science Project', description: 'Build a model volcano' },
  ]);
  const [note, setNote] = useState([]);
  const [dataa, setDataa] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const noteRef = ref(db, 'ToDo/');
    onValue(noteRef, (snapshot) => {
      setNote(snapshot.val());
    })

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    for (var i = 1; i < note.length; i++) {
      dataa.push(note[i])
    }
  }, [note]);

  useEffect(() => {
    console.log(dataa);
  }, [dataa]);

  const renderItem = ({ item }) => (
    <View style={styles.todoItem} key={item.id}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataa}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginTop: '20px'
  },
  todoItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default ToDo;
