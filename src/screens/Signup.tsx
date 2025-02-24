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

type SignupScreensProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const Signup = ({navigation}: SignupScreensProps) => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const handleSignUp = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
    ) {
      setError('All fields are required');
    } else if (password !== repeatPassword) {
      setError('Passwords do not match');
    } else {
      const user = {
        email,
        password,
        name,
      };
      appwrite
        .createAccount(user)
        .then((response: any) => {
          if (response) {
            setIsLoggedIn(true);
            Snackbar.show({
              text: 'Signup Success',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        })
        .catch(err => {
          console.log(err);
          setError(err.message);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Appwrite Auth</Text>

        {/* Name */}
        <TextInput
          value={name}
          onChangeText={text => {
            setError('');
            setName(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Name"
          style={styles.input}
        />

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

        {/* Repeat Password */}
        <TextInput
          value={repeatPassword}
          onChangeText={text => {
            setError('');
            setRepeatPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Repear Password"
          secureTextEntry
          style={styles.input}
        />

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {/* SignUp button */}
        <Pressable
          onPress={handleSignUp}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
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

export default Signup;

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
