import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function TodoApp() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const addTask = () => {
    if (task.trim().length === 0) return;

    const newTask = {
      id: Date.now().toString(),
      text: task,
      done: false
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // 🗑️ Delete Task Function (NEW)
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title]}> To-Do App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            
            {/* Toggle Done */}
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={[styles.task, item.done && styles.done]}>
                {item.text}
              </Text>
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>

          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#22bacef3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    color: 'white',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22bacef3',
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  task: {
    fontSize: 18,
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteBtn: {
    backgroundColor: '#445566',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});