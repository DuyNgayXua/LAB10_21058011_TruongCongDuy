import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'; // Thêm axios vào

const Screen03 = ({ navigation, route }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const users = route.params?.user || {};
    const [password, setPassword] = useState(users.password || '');
    const [username, setUsername] = useState(users.username || '');

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Hàm xử lý đăng nhập, gửi yêu cầu đến API
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.110.47:3001/login', {  // Thay `localhost` bằng IP của máy chủ
                username: username,
                password: password,
            });

            // Kiểm tra phản hồi từ API
            if (response.data) {
                alert('Đăng nhập thành công');
                navigation.navigate('Screen04');
            }
        } catch (error) {
            alert('Đăng nhập thất bại', 'Username hoặc mật khẩu không đúng.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../DATA/Image 20.png')} style={styles.image} />
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.email}>Email</Text>
            <View style={styles.inputContainer}>
                <Ionicons name="mail" size={24} color="gray" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Username"
                    onChangeText={setUsername}
                    value={username}
                />
            </View>
            <Text style={styles.password}>Mật khẩu</Text>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={24} color="gray" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons
                        name={isPasswordVisible ? 'eye-off' : 'eye'}
                        size={24}
                        color="gray"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        paddingHorizontal: 20,
        opacity: 0.8,
        width: '100%',
    },
    image: {
        position: 'absolute',
        top: 0,
        width: 500,
        marginLeft: -20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: 150,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 60,
    },
    email: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.7,
        marginBottom: 10,
    },
    password: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.7,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 10,
        padding: 0.5,
        height: 40,
    },
    icon: {
        marginHorizontal: 10,
    },
    button: {
        width: 350,
        height: 60,
        backgroundColor: '#00eeff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Screen03;
