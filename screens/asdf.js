import React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Text } from 'react-native';
import RNSpeedometer from 'react-native-speedometer';

const RealTimeMonitoring = () => {
  const data = [
    {
      title: 'Temperature',
      value: 36, //temp value
      min: 0,
      max: 100,
      labels: [
        {
          name: 'Low',
          labelColor: '#2986CC',
          activeBarColor: '#2986CC',
          position: 'left',
        },
        {
          name: 'Normal',
          labelColor: '#56EB04',
          activeBarColor: '#56EB04',
          position: 'center',
        },
        {
          name: 'High',
          labelColor: '#FE2D2D',
          activeBarColor: '#FE2D2D',
          position: 'right',
        },
      ],
    },
    {
      title: 'pH',
      value: 6.5, //pH value
      min: 0,
      max: 14,
      labels: [
        {
          name: 'Low',
          labelColor: '#2986CC',
          activeBarColor: '#2986CC',
          position: 'left',
        },
        {
          name: 'Normal',
          labelColor: '#56EB04',
          activeBarColor: '#56EB04',
          position: 'center',
        },
        {
          name: 'High',
          labelColor: '#FE2D2D',
          activeBarColor: '#FE2D2D',
          position: 'right',
        },
      ],
    },
    {
      title: 'Dissolved Oxygen',
      value: 5,
      min: 0,
      max: 100,
      labels: [
        {
          name: 'Low',
          labelColor: '#FE2D2D',
          activeBarColor: '#FE2D2D',
          position: 'left',
        },
        {
          name: 'Normal',
          labelColor: '#56EB04',
          activeBarColor: '#56EB04',
          position: 'right',
        },

      ],
    },
    {
      title: 'Turbidity',
      value: 10,
      min: 0,
      max: 14,
      labels: [
        {
          name: 'Good',
          labelColor: '#2986CC',
          activeBarColor: '#2986CC',
          position: 'left',
        },
        {
          name: 'Normal',
          labelColor: '#56EB04',
          activeBarColor: '#56EB04',
          position: 'center',
        },
        {
          name: 'Bad',
          labelColor: '#FE2D2D',
          activeBarColor: '#FE2D2D',
          position: 'right',
        },
      ],
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.speedometerContainer}>
          {data.map((item, index) => (
            <View style={styles.speedometer} key={index}>
              <Text style={styles.title}>{item.title}</Text>
              <RNSpeedometer
                value={item.value}
                size={200}
                minValue={item.min}
                maxValue={item.max}
                allowedDecimals={0}
                labels={item.labels}
              />
              {/* Displaying measurement units below the values */}
              <Text style={styles.valueText}>{` ${getMeasurementUnit(item.title)}`}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

// Function to get the measurement unit based on the parameter title
const getMeasurementUnit = (title) => {
  switch (title) {
    case 'Temperature':
      return '°C';
    case 'pH':
      return 'pH';
    case 'Dissolved Oxygen':
      return 'mg/L';
    case 'Turbidity':
      return 'NTU';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
  },
  speedometerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedometer: {
    height: 210,
    width: 300,
    borderWidth: 2,
    borderColor: '#7BAA13',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E96A9',
  },
  valueText: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
    marginLeft:80,
  },
});

export default RealTimeMonitoring;