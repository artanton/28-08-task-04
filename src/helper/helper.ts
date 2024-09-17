import type { ITask } from "./Task.types";

//  parentId grouping func
export const groupTasksByParentId = (tasks:ITask[]):Record<string, ITask[]> => {
  const taskMap:Record<string, ITask[]> = {};
  tasks.forEach(task => {
    if (!taskMap[task.parentId]) {
      taskMap[task.parentId] = [];
    }
    taskMap[task.parentId].push(task);
  });
  return taskMap;
};

//  time formatting func

export function formatToString(date:string):string {
  const actualDate = new Date(date);

  actualDate.setMilliseconds(0);

  const year = actualDate.getFullYear();
  const month = String(actualDate.getMonth() + 1).padStart(2, '0');
  const day = String(actualDate.getDate()).padStart(2, '0');
  const hour = String(actualDate.getHours()).padStart(2, '0');
  const minute = String(actualDate.getMinutes()).padStart(2, '0');
  const second = String(actualDate.getSeconds()).padStart(2, '0');

  const pickedDate = `${day}-${month}-${year}   ${hour}:${minute}:${second}`;
  return pickedDate;
}

//  random color for level stylization func

// export function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215)
//     .toString(16)
//     .padStart(6, 0)}`;
// }
export function getRandomHexColor():string {
  
  const getRandomChannelValue = () => Math.floor(Math.random() * 128) + 128;

  // Генерация значений для каждого канала цвета
  const r = getRandomChannelValue();
  const g = getRandomChannelValue();
  const b = getRandomChannelValue();

  // Преобразование в формат HEX
  const rgbToHex = (r:number, g:number, b:number):string => `#${[r, g, b]
    .map(value => value.toString(16).padStart(2, '0'))
    .join('')}`;

  return rgbToHex(r, g, b);
}

//  unic colors for subtask level assignment func

const colorMap: Record<number, string> = {};

export const getColorForLevel = (level:number):string => {
  if (!colorMap[level]) {
    colorMap[level] = getRandomHexColor();
  }
 
  return colorMap[level];
};


//  root perent element searching func

export const rootEl =( tasks:ITask[]):string|null => {
  const idArr:string[] = [];
  tasks.forEach((task:ITask) => {
    idArr.push(task.parentId);
  });
  idArr.sort((a, b) => a.localeCompare(b));

  return idArr[0] !== undefined ? idArr[0] : null;
};
