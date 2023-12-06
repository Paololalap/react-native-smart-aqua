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
        value: parseFloat(firstEntry?.temp),
        min: 23,
        max: 36,
        labels: getLabels(),
      },
      {
        title: 'pH',
        value: parseFloat(firstEntry?.ph),
        min: 0,
        max: 14,
        labels: getLabels(),
      },
      {
        title: 'Dissolved Oxygen',
        value: parseFloat(firstEntry?.do),
        min: 0,
        max: 10,
        labels: getLabels(),
      },
      {
        title: 'Turbidity',
        value: parseFloat(firstEntry?.turbidity),
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
          labelColor: '#FE2D2D',
          activeBarColor: '#FE2D2D',
        },
        {
          name: 'Normal',
          labelColor: '#56EB04',
          activeBarColor: '#56EB04',
        },
        {
          name: 'Good',
          labelColor: '#26631a',
          activeBarColor: '#26631a',
        },
      ];
    } 
    if (title === 'pH') {
      return [
          { name: 'Acidic', labelColor: '#FF0000', activeBarColor: '#FF0000', key: 'Acidic1'},
          { name: 'Acidic', labelColor: '#FF3300', activeBarColor: '#FF3300', key: 'Acidic2'},
          { name: 'Acidic', labelColor: '#FF6600', activeBarColor: '#FF6600', key: 'Acidic3'},
          { name: 'Acidic', labelColor: '#FF9900', activeBarColor: '#FF9900', key: 'Acidic4'},
          { name: 'Acidic', labelColor: '#FFCC00', activeBarColor: '#FFCC00', key: 'Acidic5'},
          { name: 'Acidic', labelColor: '#FFFF00', activeBarColor: '#FFFF00', key: 'Acidic6'},
          { name: 'Normal', labelColor: '#CCFF00', activeBarColor: '#CCFF00', key: 'Normal1'},
          { name: 'Normal', labelColor: '#99FF00', activeBarColor: '#99FF00', key: 'Normal2'},
          { name: 'Base', labelColor: '#66FF00', activeBarColor: '#66FF00', key: 'Base1'},
          { name: 'Base', labelColor: '#33FF00', activeBarColor: '#33FF00', key: 'Base2'},
          { name: 'Base', labelColor: '#00FF00', activeBarColor: '#00FF00', key: 'Base3'},
          { name: 'Base', labelColor: '#00FF33', activeBarColor: '#00FF33', key: 'Base4'},
          { name: 'Base', labelColor: '#00FF66', activeBarColor: '#00FF66', key: 'Base5'},
          { name: 'Base', labelColor: '#0066FF', activeBarColor: '#0066FF', key: 'Base6'},
          { name: 'Base', labelColor: '#0000FF', activeBarColor: '#0000FF', key: 'Base7'},
      ];
    } if (title === 'Turbidity') {
      return [
        {
          name: 'Very Low',
          labelColor: '#2986CC',
          activeBarColor: '#2986CC',
        },
        {
          name: 'Low',
          labelColor: '#6da6d1',
          activeBarColor: '#6da6d1',
        },
        {
          name: 'Normal',
          labelColor: '#56EB04',
          activeBarColor: '#56EB04',
        },
        {
          name: 'High',
          labelColor: '#d95252',
          activeBarColor: '#d95252',
        },
        {
          name: 'Very High',
          labelColor: '#FE2D2D',
          activeBarColor: '#FE2D2D',
        }
      ];
    } if (title === 'Temperature') {
      return [
        {
          name: 'Low',
          labelColor: '#2986CC',
          activeBarColor: '#2986CC',
        },
        {
          name: 'Normal',
          labelColor: '#56EB04',
          activeBarColor: '#56EB04',
        },
        {
          name: 'High',
          labelColor: '#FE2D2D',
          activeBarColor: '#FE2D2D',
        },
      ];
    }
  };

  const firstEntry = data.length > 0 ? data[0] : null;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.speedometerContainer}>
        {getSpeedometerData().map((item, index) => (
          <View style={styles.speedometer} key={index}>
            <Text style={styles.title}>{item.title}</Text>
            <RNSpeedometer
              value={item.title === 'Turbidity' ? Math.abs(item.value) : item.value}
              size={200}
              minValue={item.min}
              maxValue={item.max}
              allowedDecimals={2}
              labels={getLabels(item.title)}
            />
            <Text style={styles.valueText}>{`    ${item.title === 'Turbidity' ? (item.value >= 100 ? '+' : '-') : ''}  ${getMeasurementUnit(item.title)}`}</Text>
          </View>
        ))}
        </View>
      </View>
    </ScrollView>
  );
};

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
    marginLeft: 80,
  },
});

export default RealTimeMonitoring;