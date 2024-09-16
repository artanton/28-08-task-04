export interface ITask {
  _id: string;
  text: string;
  date: string;
  parentId: string;
  subLevel: number;
}

export interface IState {
  tasks: ITask[];
  isLoading: boolean;
  error: null | string | unknown;
}

export interface ITaskItemProp {
  task: Omit<ITask, 'parentId'>;
  color: string;
  children: React.ReactNode;
}

export interface IgeneralModal {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export interface IaddSubTaskModal extends Pick<ITask, '_id' | 'subLevel'> {
  onClose: () => void;
};

export interface IdeleteTaskModal extends Pick<ITask,'_id'>{
  onClose: () => void;
};

export interface IeditTaskModal extends Pick<ITask, '_id'|'text'>{
  onClose: ()=> void;
}
