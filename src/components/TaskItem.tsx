import React, { useEffect, useRef, useState } from 'react';
import { 
  Image, 
  TouchableOpacity, 
  View, 
  StyleSheet, 
  TextInput 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({ 
  index, 
  task, 
  toggleTaskDone, 
  removeTask, 
  editTask 
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, taskNewTitleValue);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            ref={textInputRef}
            style={task.done ? styles.taskInputDone : styles.taskInput}
            value={taskNewTitleValue}
            editable={isEditing}
            onChangeText={setTaskNewTitleValue}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={ styles.iconsContainer } >
        { isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        ) }

        <View 
          style={ styles.iconsDivider }
        />

        <TouchableOpacity
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskInput: {
    color: '#666666',
    fontFamily: 'Inter-Medium',
    marginLeft: 15
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#1DB863',
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskInputDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    marginLeft: 15
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingRight: 24
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196,196,196,0.24)',
    marginHorizontal: 12
  }
})