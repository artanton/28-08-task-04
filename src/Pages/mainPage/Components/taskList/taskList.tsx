import { useSelector } from 'react-redux';
import { TaskItem } from '../taskItem/taskItem';
import { TasksList } from './taskListStyled';
import { selectTask } from '../../../../redux/tasks/selectors';
import { getColorForLevel, groupTasksByParentId, rootEl } from '../../../../helper/helper';
import { ITask } from '../../../../helper/Task.types';
import { FC } from 'react';

// Рекурсивная функция для отображения задач и их подзадач

const renderTasks = (tasks:ITask[], taskMap:Record<string, ITask[]>, level = 0):JSX.Element => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id} style={{ paddingLeft: 20 }}>
          <TaskItem task={task} color={getColorForLevel(level)} children/>
          {taskMap[task._id] &&
            renderTasks(taskMap[task._id], taskMap, level + 1)}
        </li>
      ))}
    </ul>
  );
};

export const TaskList:FC = () => {
  const tasks = useSelector(selectTask);
  const taskMap = groupTasksByParentId(tasks);

  const topLevelTasks = taskMap[rootEl(tasks)|| ""] || [];

  return <TasksList>{renderTasks(topLevelTasks, taskMap)}</TasksList>;
};
