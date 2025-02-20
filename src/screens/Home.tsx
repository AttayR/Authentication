import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//react native elements
import {FAB} from '@rneui/themed';
//Snackbar
import Snackbar from 'react-native-snackbar';

//context Api
import {AppwriteContext} from '../appwrite/AppwriteContext';
import {Image} from '@rneui/base';

type UserObj = {
  name: String;
  email: String;
};

const Home = () => {
  const [userData, setUserData] = useState<UserObj>();
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
  const handleLogout = () => {
    appwrite.logout().then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logout Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };
  useEffect(() => {
    appwrite.getCurrentUser().then(response => {
      if (response) {
        const user: UserObj = {
          name: response.name,
          email: response.email,
        };
        setUserData(user);
      }
    });
  }, [appwrite]);

  return (
    <SafeAreaView>
      <View>
        <Image
          source={{
            uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
            width: 400,
            height: 300,
            cache: 'default',
          }}
          resizeMode="contain"
        />
        <Text>Build Fast. Scale Big. All in one Place.</Text>
        {userData && (
          <View><Text>Name:{userData.name}</Text></View>
        )}
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{name: 'logout', color: '#FFFFFF'}}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
