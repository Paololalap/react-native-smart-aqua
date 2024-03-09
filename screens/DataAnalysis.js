import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Plotly from 'react-native-plotly';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios'; // Import axios

const DataAnalysis = () => {
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [selectedOption, setSelectedOption] = useState('Temperature');
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [predictedUpperBounds, setPredictedUpperBounds] = useState([]);
  const [predictedLowerBounds, setPredictedLowerBounds] = useState([]);
  const [interpretation, setInterpretation] = useState("");

  useEffect(() => {
    // Calculate the chart container dimensions
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const chartWidth = screenWidth - 10; // Full width
    const chartHeight = screenHeight / 2; // Half of the height

    setChartDimensions({ width: chartWidth, height: chartHeight });

    // Fetch data from the provided URL using axios
    axios
      .get("https://lspu.edu.ph/e-sentry/api/public/parameter")
      .then((response) => {
        const fetchedData = response.data;

        // Extract and set measured data
        const extractedData = [];
        const extractedDateData = [];

        for (const item of fetchedData) {
          if (selectedOption === "Temperature") {
            extractedData.push(parseFloat(item.Temperature)); // Parse Temperature as a float
          } else if (selectedOption === "pH") {
            extractedData.push(parseFloat(item.PH)); // Parse pH as a float
          } else if (selectedOption === "Turbidity") {
            extractedData.push(parseFloat(item.TURBIDITY)); // Parse Turbidity as a float
          } else if (selectedOption === "Dissolved Oxygen") {
            extractedData.push(parseFloat(item.LDO)); // Parse Dissolved Oxygen as a float
          }
          extractedDateData.push(item.Date);
        }

        setDataX(extractedData);
        setDataY(extractedDateData);

        // Fetch predicted data from the new API using axios
        axios
          .get("https://lspu.edu.ph/e-sentry/api/public/parameter/preds")
          .then((predictedResponse) => {
            const fetchedPredictedData = predictedResponse.data;

            // Extract and set predicted data and bounds
            const extractedPredictedData = [];
            const extractedPredictedUpperBounds = [];
            const extractedPredictedLowerBounds = [];

            for (const item of fetchedPredictedData) {
              if (selectedOption === "Temperature") {
                extractedPredictedData.push(parseFloat(item.temp_pred));
                extractedPredictedUpperBounds.push(parseFloat(item.temp_upper));
                extractedPredictedLowerBounds.push(parseFloat(item.temp_lower));
              } else if (selectedOption === "pH") {
                extractedPredictedData.push(parseFloat(item.ph_pred));
                extractedPredictedUpperBounds.push(parseFloat(item.ph_upper));
                extractedPredictedLowerBounds.push(parseFloat(item.ph_lower));
              } else if (selectedOption === "Turbidity") {
                extractedPredictedData.push(parseFloat(item.turb_pred));
                extractedPredictedUpperBounds.push(parseFloat(item.turb_upper));
                extractedPredictedLowerBounds.push(parseFloat(item.turb_lower));
              } else if (selectedOption === "Dissolved Oxygen") {
                extractedPredictedData.push(parseFloat(item.lod_pred));
                extractedPredictedUpperBounds.push(parseFloat(item.lod_upper));
                extractedPredictedLowerBounds.push(parseFloat(item.lod_lower));
              }
            }

            setPredictedData(extractedPredictedData);
            setPredictedUpperBounds(extractedPredictedUpperBounds);
            setPredictedLowerBounds(extractedPredictedLowerBounds);

            // Calculate interpretation based on the data
            const latestMeasuredValue = extractedData[extractedData.length - 1];
            const latestPredictedValue =
              extractedPredictedData[extractedPredictedData.length - 1];

            if (latestMeasuredValue < latestPredictedValue) {
              setInterpretation(
                "The measured value is below the predicted value."
              );
            } else if (latestMeasuredValue > latestPredictedValue) {
              setInterpretation(
                "The measured value is above the predicted value."
              );
            } else {
              setInterpretation(
                "The measured value matches the predicted value."
              );
            }
          })
          .catch((predictedError) => {
            console.error("Error fetching predicted data:", predictedError);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedOption]);

  const data = [
    {
      x: dataY,
      y: dataX,
      type: 'scatter',
      mode: 'lines',
      name: 'Measured Data',
    },
    {
      x: dataY,
      y: predictedData,
      type: 'scatter',
      mode: 'lines',
      name: 'Predicted Data',
    },
    {
      x: dataY,
      y: predictedUpperBounds,
      mode: 'lines',
      fill: 'tonexty',
      name: 'Upper Bound',
    },
    {
      x: dataY,
      y: predictedLowerBounds,
      mode: 'lines',
      fill: 'tonexty',
      name: 'Lower Bound',
    },
  ];

  const layout = {
    title: selectedOption,
    xaxis: {
      range: [new Date() - 7 * 24 * 60 * 60 * 1000, '2023-09-05'],
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
    width: '95%',
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 8,
  },
  chartContainer: {
    width: "98%",
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 5,
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
});

export default DataAnalysis;
