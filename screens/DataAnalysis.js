import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Plotly from 'react-native-plotly';
import { Picker } from '@react-native-picker/picker';
import Sdata from '../Sdata.json'; // Import your JSON data
import Pdata from '../Pdata.json'; // Import predicted data

const DataAnalysis = () => {
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [selectedOption, setSelectedOption] = useState('Temperature'); // Default selection
  const [dataX, setDataX] = useState([]); // Store x data
  const [dataY, setDataY] = useState([]); // Store y data
  const [predictedData, setPredictedData] = useState([]); // Store predicted data
  const [predictedUpperBounds, setPredictedUpperBounds] = useState([]); // Store predicted upper bounds
  const [predictedLowerBounds, setPredictedLowerBounds] = useState([]); // Store predicted lower bounds
  const [interpretation, setInterpretation] = useState(""); // Interpretation text

  useEffect(() => {
    // Calculate the chart container dimensions
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const chartWidth = screenWidth - 10; // Full width
    const chartHeight = screenHeight / 2; // Half of the height

    setChartDimensions({ width: chartWidth, height: chartHeight });

    // Extract and set measured data
    const extractedData = [];
    const extractedDateData = [];

    for (const item of Sdata) {
      if (selectedOption === 'Temperature') {
        extractedData.push(parseFloat(item.Temperature)); // Parse Temperature as a float
      } else if (selectedOption === 'pH') {
        extractedData.push(parseFloat(item.PH)); // Parse pH as a float
      } else if (selectedOption === 'Turbidity') {
        extractedData.push(parseFloat(item.TURBIDITY)); // Parse Turbidity as a float
      } else if (selectedOption === 'Dissolved Oxygen') {
        extractedData.push(parseFloat(item.LDO)); // Parse Dissolved Oxygen as a float
      }
      extractedDateData.push(item.Date);
    }

    setDataX(extractedData);
    setDataY(extractedDateData);

    // Extract and set predicted data and bounds
    const extractedPredictedData = [];
    const extractedPredictedUpperBounds = [];
    const extractedPredictedLowerBounds = [];

    for (const item of Pdata) {
      if (selectedOption === 'Temperature') {
        extractedPredictedData.push(parseFloat(item.temp_pred)); // Parse Temperature prediction as a float
        extractedPredictedUpperBounds.push(parseFloat(item.temp_upper)); // Parse Temperature upper bound as a float
        extractedPredictedLowerBounds.push(parseFloat(item.temp_lower)); // Parse Temperature lower bound as a float
      } else if (selectedOption === 'pH') {
        extractedPredictedData.push(parseFloat(item.ph_pred)); // Parse pH prediction as a float
        extractedPredictedUpperBounds.push(parseFloat(item.ph_upper)); // Parse pH upper bound as a float
        extractedPredictedLowerBounds.push(parseFloat(item.ph_lower)); // Parse pH lower bound as a float
      } else if (selectedOption === 'Turbidity') {
        extractedPredictedData.push(parseFloat(item.turb_pred)); // Parse Turbidity prediction as a float
        extractedPredictedUpperBounds.push(parseFloat(item.turb_upper)); // Parse Turbidity upper bound as a float
        extractedPredictedLowerBounds.push(parseFloat(item.turb_lower)); // Parse Turbidity lower bound as a float
      } else if (selectedOption === 'Dissolved Oxygen') {
        extractedPredictedData.push(parseFloat(item.lod_pred)); // Parse Dissolved Oxygen prediction as a float
        extractedPredictedUpperBounds.push(parseFloat(item.lod_upper)); // Parse Dissolved Oxygen upper bound as a float
        extractedPredictedLowerBounds.push(parseFloat(item.lod_lower)); // Parse Dissolved Oxygen lower bound as a float
      }
    }

    setPredictedData(extractedPredictedData);
    setPredictedUpperBounds(extractedPredictedUpperBounds);
    setPredictedLowerBounds(extractedPredictedLowerBounds);

    // Calculate interpretation based on the data
    // You can customize the interpretation logic based on your requirements
    const latestMeasuredValue = extractedData[extractedData.length - 1];
    const latestPredictedValue = extractedPredictedData[extractedPredictedData.length - 1];

    if (latestMeasuredValue < latestPredictedValue) {
      setInterpretation("The measured value is below the predicted value.(Placeholder only)");
    } else if (latestMeasuredValue > latestPredictedValue) {
      setInterpretation("The measured value is above the predicted value.(Placeholder only)");
    } else {
      setInterpretation("The measured value matches the predicted value.(Placeholder only)");
    }
  }, [selectedOption]);

  const data = [
    {
      x: dataY, // Dates (y)
      y: dataX, // Parameter data (x)
      type: 'scatter',
      mode: 'lines',
      name: 'Measured Data',
    },
    {
      x: dataY, // Dates (y)
      y: predictedData, // Predicted data (x)
      type: 'scatter',
      mode: 'lines',
      name: 'Predicted Data',
    },
    {
      x: dataY, // Dates (y)
      y: predictedUpperBounds, // Predicted upper bounds (x)
      mode: 'lines',
      fill: 'tonexty',
      name: 'Upper Bound',
    },
    {
      x: dataY, // Dates (y)
      y: predictedLowerBounds, // Predicted lower bounds (x)
      mode: 'lines',
      fill: 'tonexty',
      name: 'Lower Bound',
    },
  ];

  const layout = {
    title: selectedOption, // Display selected option in the chart title
    xaxis:{
      range: [new Date() - 7 * 24 * 60 * 60 * 1000, '2023-09-05'], //new Date()
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
        >
          <Picker.Item label="Temperature" value="Temperature" />
          <Picker.Item label="pH" value="pH" />
          <Picker.Item label="Turbidity" value="Turbidity" />
          <Picker.Item label="Dissolved Oxygen" value="Dissolved Oxygen" />
        </Picker>
      </View>
      <View style={[styles.chartContainer, { width: chartDimensions.width, height: chartDimensions.height }]}>
        <Plotly data={data} layout={layout} />
      </View>
      <View style={styles.interpretationContainer}>
        <Text style={styles.interpretationLabel}>Interpretation:</Text>
        <Text style={styles.interpretationText}>{interpretation}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: '95%', // Adjust the width as needed
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2, // Add a border
    borderColor: '#000000', // Border color
    borderRadius: 25, // Border radius
    paddingHorizontal: 8,
  },
  chartContainer: {
    width: "98%",
    borderWidth: 2, // Add a border
    borderColor: '#000000', // Border color
    borderRadius: 5, // Border radius
  },
  interpretationContainer: {
    width: "100%",
    padding: 10,
  },
  interpretationLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  interpretationText: {
    fontSize: 14,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default DataAnalysis;
