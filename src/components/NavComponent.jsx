import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#3498db', paddingVertical: 10 }}>
      <IconButton
        icon="home"
        color="#fff"
        size={30}
        onPress={() => {
          console.log('Pressed Home');
          navigation.navigate("EvaluatorScreen");
        }}
      />
      <IconButton
        icon="account"
        color="#fff"
        size={30}
        onPress={() => console.log('Pressed Perfil')}
      />
      <IconButton
        icon="account-group"
        color="#fff"
        size={30}
        onPress={() => console.log('Pressed Grupos')}
      />
    </View>
  );
}

export default BottomBar;
