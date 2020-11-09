import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

/**
 * Elementos não possuem valor semântico (significado), exemplo: h1, h2, div, footer, header, section
 * Não possuem estilização própria
 * Todos componentes possuem por padrão "display: flex"
 */
export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        }).catch(error => {
            console.log(error)
        });
    }, [])

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Diego Fernandes'
        });

        const project = response.data;

        setProjects([...projects, project])
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>

            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project}>{ project.title }</Text>
                    )}
                />
                <TouchableOpacity 
                    activeOpacity={0.6} 
                    style={styles.button} 
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
            {/* <View style={styles.container}> 
                {projects.map(project => <Text style={styles.project} key={project.id}>{project.title}</Text>)}
            </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    project: {
        color: '#fff',
        fontSize: 20
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
})