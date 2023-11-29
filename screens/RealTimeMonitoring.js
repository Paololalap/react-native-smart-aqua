import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import RNSpeedometer from 'react-native-speedometer';

const RealTimeMonitoring = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lspu.edu.ph/lakes-sustainable-development/api/public/parameter/');
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
        value: parseFloat(firstEntry?.Temperature) || 0,
        labels: getLabels(),
      },
      {
        title: 'pH',
        value: parseFloat(firstEntry?.PH) || 0,
        labels: getLabels(),
      },
      {
        title: 'Dissolved Oxygen',
        value: parseFloat(firstEntry?.LDO) || 0,
        labels: getLabels(),
      },
      {
        title: 'Turbidity',
        value: parseFloat(firstEntry?.TURBIDITY) || 0,
        labels: getLabels(),
      },
    ];
  };

  const getLabels = () => {
    return [
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
    ];
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
                minValue={0}
                maxValue={100}
                allowedDecimals={1}
                labels={item.labels}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
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
});

export default RealTimeMonitoring;
