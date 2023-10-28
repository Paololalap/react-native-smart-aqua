// TaskScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";

const TaskScreen = () => {
  const initialTasks = [
    { id: "1", title: "Feed the fish Morning", completed: false },
    { id: "2", title: "Feed the fish Afternoon", completed: false },
    { id: "3", title: "Check Water Parameters", completed: false },
    // Add more tasks as needed
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [savedTasks, setSavedTasks] = useState([]);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  // Reset completed tasks at midnight
  useEffect(() => {
    const resetTasks = () => {
      const currentDate = new Date();
      const resetHour = 0; // Reset at midnight (0:00)

      if (currentDate.getHours() === resetHour) {
        setTasks(initialTasks);
      }
    };

    const intervalId = setInterval(resetTasks, 1000 * 60); // Check every minute

    return () => clearInterval(intervalId);
  }, []);

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
    setIsSaveEnabled(updatedTasks.some((task) => task.completed));
  };

  const saveTasks = () => {
    const tasksToSave = tasks.filter((task) => task.completed && !savedTasks.includes(task));
    setSavedTasks([...savedTasks, ...tasksToSave]);
    setIsSaveEnabled(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => toggleTaskCompletion(item.id)}
    >
      <View style={styles.checkbox}>
        {item.completed && <View style={styles.checkedBox} />}
      </View>
      <Text
        style={[
          styles.taskText,
          item.completed && styles.completedTaskText,
          savedTasks.includes(item) && styles.savedTaskText,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Save Task"
        onPress={saveTasks}
        disabled={!isSaveEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    height:60,
    marginBottom: 10,
    borderWidth:2,
    borderRadius:5,
    paddingLeft:10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#3498db",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: {
    width: 14,
    height: 14,
    backgroundColor: "#3498db",
  },
  taskText: {
    fontSize: 18,
  },
  completedTaskText: {
    
    color: "#777777",
  },
  savedTaskText: {
    color: "#00cc00", // Green color for saved tasks
  },
});

export default TaskScreen;