import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';

const Notice = () => {
  const [note, setNote] = useState([]);
  const [dataa, setDataa] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const noteRef = ref(db, 'notice/');
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
  })

  const renderNoticeItem = ({ item }) => (
    <View style={styles.noticeContainer} key={item.id}>
      <Text style={styles.noticeTitle}>{item.title}</Text>
      <Text style={styles.noticeContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataa}
        renderItem={renderNoticeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.noticeList}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  noticeList: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginTop: '20px'
  },
  noticeContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    maxWidth: '80%',
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noticeContent: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
});

export default Notice;
