import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, Text } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {

    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')
    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(resp => {
            if (resp) {
                const favoritedTeachers: Array<Teacher> = JSON.parse(resp)
                const favoritedTeachersIds = favoritedTeachers.map(t => t.id)
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    async function handleFiltersSubmit() {
        loadFavorites()

        const resp = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(resp.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF"></Feather>
                    </BorderlessButton>
                )}>

                {isFiltersVisible && (
                    <>
                        <View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <TextInput
                                placeholderTextColor="#c1bccc"
                                style={styles.input}
                                value={subject}
                                onChangeText={text => setSubject(text)}
                                placeholder="Qual a matéria?" />
                        </View>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    placeholderTextColor="#c1bccc"
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Qual o dia?" />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    placeholderTextColor="#c1bccc"
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual horário?" />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </>

                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}>
                {teachers.map((t: Teacher) => <TeacherItem key={t.id} teacher={t} favorited={favorites.includes(t.id)} />)}
            </ScrollView>
        </View>
    )
}

export default TeacherList