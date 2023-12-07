import React from "react";
import { Text, View, SafeAreaView, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import tw from 'twrnc';
import { data } from "../../AreaList.json";


const NUMBERQUESTIONS = 10;

const AreaList = () => {
  const navigation = useNavigation();

  const CourseButton = ({ iconImage, courseName, courseCode }) => (
    <Pressable
      style={styles.buttonContainer}
      onPress={() => {
        navigation.navigate('QuestionScreen', {
          courseCode: courseCode,
          numberQuestions: NUMBERQUESTIONS,
        });
      }}
    >
      <View style={styles.innerContainer}>
        <IconButton
          icon={() => <Image style={{ width: 80, height: 80, resizeMode: "contain" }} source={{ uri: iconImage }} />}
          size={80}
          color="#FDF5E6"
        />
        <Text style={tw`text-black text-center text-xs text-opacity-50`}>{courseName}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={tw`bg-white`}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map((item, index) => {
          if (item.enabled) {
            return (
              <CourseButton key={index} iconImage={item.image} courseName={item.title} courseCode={item.courseCode} />
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AreaList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 130, // Ajusta la altura según sea necesario
    margin: 3,
    backgroundColor: '#FDF5E6',
    borderRadius: 10,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  // Otros estilos...
});
