import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CartItem = ({ item, onRemove }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <Text style={styles.quantity}>Количество: {item.quantity}</Text>
            <TouchableOpacity style={styles.button} onPress={() => onRemove(item)}>
                <Text style={styles.buttonText}>Удалить</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EDE8D4',
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,
        flexDirection: 'column',
    },
    image: {
        width: 101,
        height: 101,
        borderRadius: 12,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0AA5FF',
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#0AA5FF',
        borderRadius: 8,
        paddingVertical: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CartItem;