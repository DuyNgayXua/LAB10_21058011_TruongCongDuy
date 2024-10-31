// Screen02.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet , Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Nếu bạn sử dụng icons (tùy chọn)
import { CheckBox } from 'react-native-elements'; 

const Screen02 = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  //Ẩn hiện mật khẩu
  const [agree, setAgree] = useState(false); // State cho checkbox
  // useState: Đây là một hook trong React, được sử dụng để quản lý trạng thái (state) trong functional components. Ở đây, nó giúp theo dõi các giá trị như tên người dùng, email, mật khẩu, hiển thị mật khẩu, và checkbox đồng ý điều khoản.
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const handleContinue = async () => {
    if (!agree) {
      alert('Error', 'Bạn cần đồng ý với điều khoản & điều kiện.');
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch('http://192.168.110.47:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Đăng kí thành công', data.message);
        navigation.navigate('Screen02', { user: userData });
      } else {
        alert('Trùng Username', data.message);
      }
    } catch (error) {
      alert('Error', 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };
  

  return (
    <View style={styles.container}>
         {/* Nút quay lại ở góc trái, quay lại màn hình 01 */}
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Screen01')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
     <Image
        source={require('../DATA/Image 19.png')}
        style={styles.image} />
      <Text style={styles.title}>Nice to see you!</Text>
      <Text style={styles.subtitle}>Create your account</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person" size={24} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Enter your user name"
          style={styles.input}
          onChangeText={setUsername}
          //Đây là một event handler. Khi người dùng nhập liệu vào ô này, hàm setUsername sẽ được gọi, cập nhật giá trị username (state) với nội dung mà người dùng nhập.
          value={username}
          placeholderTextColor="#000"
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={24} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Enter your email address"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholderTextColor="#000"
        />
      </View>

      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          secureTextEntry={!isPasswordVisible} // Ẩn hoặc hiện mật khẩu
          onChangeText={setPassword}
          value={password}
          placeholderTextColor="#000"
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
      <View style={styles.checkboxContainer} >
        <CheckBox
          checked={agree}
          onPress={() => setAgree(!agree)}
          containerStyle={styles.checkbox}
        />
        <Text style={styles.subtitle2}>I agree with Term & Conditions</Text>
      </View>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: agree ? '#3498db' : '#d3d3d3' } ]}
        onPress={handleContinue}
        disabled={!agree} // Vô hiệu hóa nếu chưa chọn
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
   fontWeight: 600,
    marginBottom: 10,
    marginLeft: 60,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    marginLeft: 100,
  },
  input: {
    // borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  
    width: 400,
   
  },
  image: {
    // position: 'absolute',
    // top: 60, // Khoảng cách từ cạnh trên cùng màn hình
    // left: 20, // Khoảng cách từ cạnh trái màn hình
    width: 80,
    height: 80,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 140,

  },
  backButton: {
    position: 'absolute', // Định vị nút quay lại ở vị trí tuyệt đối
    top: 40, // Khoảng cách từ cạnh trên cùng màn hình
    left: 20, // Khoảng cách từ cạnh trái màn hình
    zIndex: 1, // Đảm bảo rằng nút luôn ở trên cùng các phần tử khác
  },
  buttonText: {
    
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: -15,

  },
  checkbox: {
   
  },
  subtitle2: {
    fontSize: 16,
    color: 'gray',
   justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Screen02;