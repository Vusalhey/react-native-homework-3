import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import ProductCard from '/home/vus/react-native-homework-3/lab-sqlite/components/ProductCard.js';
import { initDB, addToCart, dropDB } from '/home/vus/react-native-homework-3/lab-sqlite/db/database.js';

export default function Index() {
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initDB();
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setRefreshing(true);
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };

    const handleAddToCart = async (product) => {
        await addToCart(product);
        fetchProducts();
    };

    const renderItem = ({ item }) => (
        <ProductCard product={item} addToCart={handleAddToCart} />
    );

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#6200ea" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Магазин</Text>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshing={refreshing}
                onRefresh={fetchProducts}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#444',
        textAlign: 'center',
        marginVertical: 16,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});
