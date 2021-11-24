import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.findIndex(task => task.title === newTaskTitle) !== -1) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
      );

      return;
    }

    setTasks(state => [
      ...state,
      {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks: Task[] = tasks
      .map(task => {
        if (task.id === id) {
          return {
            id,
            title: task.title,
            done: !task.done
          }
        } else {
          return task;
        }
      })

    setTasks(() => updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { 
          text: "Sim", 
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== id);

            setTasks(() => updatedTasks);
          }
        },
        {
          text: "Não",
          onPress: () => {},
          style: "cancel"
        }
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks: Task[] = tasks
      .map(task => {
        if (task.id === taskId) {
          return {
            id: taskId,
            title: taskNewTitle,
            done:  task.done,
          }
        } else {
          return task;
        }
      })

    setTasks(() => updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})