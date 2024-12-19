import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { getCartItems, removeFromCart } from '/home/vus/react-native-homework-3/lab-sqlite/db/database.js';
import CartItem from '/home/vus/react-native-homework-3/lab-sqlite/components/Cartitem.js';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        setRefreshing(true);
        try {
            const cartItemsFromDB = await getCartItems(); 
            setCartItems(cartItemsFromDB); 
        } catch (error) {
            console.error('Ошибка при получении товаров из корзины:', error);
        } finally {
            setRefreshing(false); 
        }
    };

    const handleRemoveFromCart = async (item) => {
        await removeFromCart(item.id); 
        fetchCartItems(); 
    };

    const renderItem = ({ item }) => {
        return (
            <CartItem item={item} onRemove={handleRemoveFromCart}/>
        );
    };

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Корзина пуста.</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                refreshing={refreshing}
                onRefresh={fetchCartItems}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={cartItems.length === 0 ? styles.emptyList : null}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffaf9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        
    },
    emptyText: {
        fontSize: 25,
        color: '#999',
    },
    emptyList: {
        flexGrow: 1, 
        justifyContent: 'center',
        textAlign: 'center', 
    },
});