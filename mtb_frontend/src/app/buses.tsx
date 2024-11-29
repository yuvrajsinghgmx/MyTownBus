import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { fetchBuses } from '../api/api';

interface Bus {
    id: number;
    name: string;
    registration_number: string;
    bus_type: string;
    total_seats: number;
    features: Record<string, any>;
}

export default function Buses() {
    const [buses, setBuses] = useState<Bus[]>([]); 

    useEffect(() => {
        fetchBuses()
            .then((data: Bus[]) => setBuses(data)) 
            .catch((error: any) => console.error("Error fetching buses:", error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Buses</Text>
            <FlatList
                data={buses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.busItem}>
                        <Text style={styles.busName}>{item.name}</Text>
                        <Text>Registration: {item.registration_number}</Text>
                        <Text>Type: {item.bus_type}</Text>
                        <Text>Seats: {item.total_seats}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    busItem: {
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    busName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
