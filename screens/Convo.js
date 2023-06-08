import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Convo = ({ route }) => {
    const { studentId, password } = route.params;

    const navigation = useNavigation();
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const teachers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Mark Johnson' },
        { id: 4, name: 'Sarah Williams' },
    ];

    const handleTeacherPress = (teacherId) => {
        const selectedTeacher = teachers.find((teacher) => teacher.id === teacherId);
        console.log(selectedTeacher.name)
        navigation.navigate('Conversation', {
            studentId: studentId,
            password: password,
            teacherName: selectedTeacher.name
        })
    };

    return (
        <View style={styles.messagesContainer}>
            {teachers.map((teacher) => (
                <View key={teacher.id} style={styles.message}>
                    <View style={styles.avatar}></View>
                    <TouchableOpacity onPress={() => handleTeacherPress(teacher.id)}>
                        <View style={styles.messageContent}>
                            <Text style={styles.messageName}>{teacher.name}</Text>
                            <Text style={styles.messageText}>Hi, I'm your teacher!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    messagesContainer: {
        alignSelf: 'stretch',
        maxHeight: 400,
        marginBottom: 20,
    },
    message: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    messageContent: {
        flex: 1,
        margin: '10px',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    messageName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageText: {
        color: '#555',
    },
});

export default Convo;
