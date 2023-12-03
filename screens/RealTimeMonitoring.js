import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import RNSpeedometer from 'react-native-speedometer';
import axios from 'axios';

const RealTimeMonitoring = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/Arduino/joyparam');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getSpeedometerData = () => {
    return [
      {
        title: 'Temperature',
        value: parseFloat(firstEntry?.temp) || 0,
        min: 0,
        max: 100,
        labels: getLabels(),
      },
      {
        title: 'pH',
        value: parseFloat(firstEntry?.ph) || 0,
        min: 0,
        max: 14,
        labels: getLabels(),
      },
      {
        title: 'Dissolved Oxygen',
        value: parseFloat(firstEntry?.do) || 0,
        min: 0,
        max: 10,
        labels: getLabels(),
      },
      {
        title: 'Turbidity',
        value: parseFloat(firstEntry?.turbidity) || 0,
        min: 0,
        max: 100,
        labels: getLabels(),
      },
    ];
  };

  const getLabels = (title) => {
    if (title === 'Dissolved Oxygen') {
      return [
        {
          name: 'Low',
          labelColor: '#2986CC',
          activeBarColor: '#FE2D2D',
          position: 'left',
        },
        {
          name: 'Normal',
          labelColor: '#56EB04',
          activeBarColor: '#56EB04',
          position: 'right',
        },
        {
          name: 'Good',
          labelColor: '#26631a',
          activeBarColor: '#26631a',
          position: 'right',
        },
      ];
    } 
    if (title === 'pH') {
      return [
        {
          name: 'Acidic',
          labelColor: '#2986CC',
          activeBarColor: '#FE2D2D',
          position: 'left',
        },
        {
          name: 'Normal',
          labelColor: '#56EB04',
          activeBarColor: '#56EB04',
          position: 'right',
        },
        {
          name: 'Base',
          labelColor: '#FE2D2D',
          activeBarColor: '#2986CC',
          position: 'right',
        },
      ];
    } else {
      // For other parameters, use the original labels
      return [
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
      ];
    }
  };

  // Assuming you want to display the first entry in the data array
  const firstEntry = data.length > 0 ? data[0] : null;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.speedometerContainer}>
        {getSpeedometerData().map((item, index) => (
            <View style={styles.speedometer} key={index}>
              <Text style={styles.title}>{item.title}</Text>
              <RNSpeedometer
                value={item.value}
                size={200}
                minValue={item.min}
                maxValue={item.max}
                allowedDecimals={1}
                labels={getLabels(item.title)}
              />
              {/* Displaying measurement units below the values */}
              <Text style={styles.valueText}>{`${getMeasurementUnit(item.title)}`}</Text>
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
      return '     mg/L';
    case 'Turbidity':
      return '     NTU';
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
    marginLeft: 80,
  },
});

export default RealTimeMonitoring;