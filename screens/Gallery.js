import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Modal, TouchableWithoutFeedback, Text } from 'react-native';
import Swiper from 'react-native-swiper/src';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [img, setImg] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const iRef = ref(db, 'images/');
    onValue(iRef, (snapshot) => {
      data.push(snapshot.val());
      data[0].shift();
      for (var i = 0; i < data[0].length; i++) {
        img.push(data[0][i]);
        console.log(img);
      }
    })

    onValue(ref(db), () => {
      onValue(ref(db), () => {
        setImages();
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => setSelectedImage(item.image)}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 100, height: 100, margin: 5 }}
      />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={img}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
      />
      <Modal visible={!!selectedImage} animationType="slide">
        <Text style={styles.goback} onPress={() => setSelectedImage(null)}>
          ← Go back
        </Text>
        <Swiper style={styles.wrapper} showsButtons={true}>
          {img.map((item) => (
            <View key={item.id} style={styles.slide}>
              <TouchableWithoutFeedback>
                <Image source={{ uri: item.image }} style={styles.image} />
              </TouchableWithoutFeedback>
            </View>
          ))}
        </Swiper>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  goback: {
    fontSize: 30,
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Gallery;
