import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import styles from './styles'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function Favorites() {

    const [favorites, setFavorites] = useState<Array<Teacher>>([])

    useFocusEffect(() => loadFavorites())

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(resp => {
            if (resp) {
                const favoritedTeachers: Array<Teacher> = JSON.parse(resp)
                setFavorites(favoritedTeachers)

            }
        })
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}>

                {favorites.map((t: Teacher) => <TeacherItem key={t.id} teacher={t} favorited={true} />)}
            </ScrollView>
        </View>
    )
}

export default Favorites