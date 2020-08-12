import './styles.css'

import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'

export default () => {
    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

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
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Educação física', label: 'Educação física' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Sociologia', label: 'Sociologia' },
                            { value: 'Filosofia', label: 'Filosofia' }
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => setWeekDay(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' }
                        ]}
                    />
                    <Input
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        type="time"
                        label="Hora"
                    />

                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((t: Teacher) => <TeacherItem key={t.id} teacher={t} />)}
            </main>
        </div>
    )
}
