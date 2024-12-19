import React from 'react';
import { Text, StatusBar } from 'react-native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
  <>
    <StatusBar barStyle="dark-content" backgroundColor="#25292e" />
    <Tabs screenOptions={{
        tabBarActiveTintColor: '#fffaf9',
        tabBarInactiveTintColor: '#4d4745',
        headerStyle: {
          backgroundColor: '#0AA5FF',
        },
        headerShadowVisible: false,
        headerTintColor: '#fffaf9',
        tabBarStyle: {
        backgroundColor: '#0AA5FF',
        },
       }}>
      <Tabs.Screen name="index" options={{ 
        headerShown: true,
        title: 'Список товаров',
        tabBarIcon: () => (
            <Text style={{ fontSize: 25 }}>🛒</Text> 
        ), 
        }} />
      <Tabs.Screen name="cart" options={{
         title: 'Корзина',
         tabBarIcon: () => (
            <Text style={{ fontSize: 25 }}>🗑️</Text>
         )  
         }} />
    </Tabs>
 </>
  );
}