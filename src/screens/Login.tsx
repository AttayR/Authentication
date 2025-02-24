import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
//react native elements
// import {FAB} from '@rneui/themed';
//Snackbar
import Snackbar from 'react-native-snackbar';

//context Api
import {AppwriteContext} from '../appwrite/AppwriteContext';

//Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthStackParamList} from '../routes/AuthStack';

type LoginScreensProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({navigation}: LoginScreensProps) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
      setError('All fields are required');
    } else {
      const user = {
        email,
        password,
      };
      appwrite
        .login(user)
        .then(response => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Login Success',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(err => {
          console.log(err);
          setError('Incorrect email or password');
        });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* Email */}
        <TextInput
          value={email}
          onChangeText={text => {
            setError('');
            setEmail(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={text => {
            setError('');
            setPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        />
        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {/* SignUp button */}
        <Pressable
          onPress={handleLogin}
          style={[styles.btn, {marginTop : error ? 10 : 20}]}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>
        {/* Login Navigation  */}
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.loginContainer}>
          <Text>
            Already have an account?{' '}
            <Text style={styles.loginLabel}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {},
  formContainer: {},
  appName: {},
  input: {},
  errorText: {},
  btn: {},
  btnText: {},
  loginContainer: {},
  loginLabel: {},
});
