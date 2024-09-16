import React, { useState } from 'react';

import { VscTrash } from 'react-icons/vsc';
import { formatToString} from '../../../../helper/helper';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DeleteConfirmationModal } from '../modal/deleteModal/deleteModalWindow';
import { EditTaskModal } from '../modal/editModal/editModal';
import { AddSubTaskModal } from '../modal/addSubTaskModal/addSubtaskModal';

import { Modal } from '../modal/modalWindow';
import { AddSubTaskButton, DeleteButton, EditButton, TaskRow } from './taskItemStyled';
import { ITaskItemProp } from '../../../../helper/Task.types';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




export const TaskItem: React.FC<ITaskItemProp>  = ({task, color}) => {
  const { _id, text, date, subLevel } = task;
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const formattedDate = formatToString(date);
    
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const openSubTaskModal = () => {
    setModalContent(
      <AddSubTaskModal
      _id = {_id} 
      subLevel ={subLevel} 
      onClose ={closeModal} />
    );
    openModal();
  };

  const openEditModal = () => {
    setModalContent(
      <EditTaskModal _id={_id} text={text} onClose={closeModal} />
    );
    openModal();
  };

  const openDeleteModal = () => {
    setModalContent(
      <DeleteConfirmationModal _id={_id} onClose={closeModal} />
    );
    openModal();
  };



  function CSSGrid() {
    return (
      <TaskRow >
        <Box sx={{ width: 1 }} >
          <Box display="grid" gridTemplateColumns="repeat(13, 1fr)" gap={1} >
           

            <Box gridColumn="span 6">
              <Item style={{ backgroundColor: `${color}`}}>{text}</Item>
            </Box>
            <Box gridColumn="span 3">
              <Item>{formattedDate}</Item>
            </Box>
            <Box gridColumn="span 2">
            <Item>
                <AddSubTaskButton
                 onClick={openSubTaskModal}>
                  Add subtask
                  </AddSubTaskButton>
              </Item>
            </Box>
            <Box gridColumn="span 1">
              <Item>
                <EditButton onClick={openEditModal}>Edit</EditButton>
              </Item>
            </Box>
            <Box gridColumn="span 1">
              <Item>
                <DeleteButton onClick={openDeleteModal}>
                  <VscTrash style={{ height: '14px' }} />
                </DeleteButton>
              </Item>
            </Box>
          </Box>
        </Box>
        <Modal isOpen={showModal} onClose={closeModal}>
          {modalContent}
        </Modal>
      </TaskRow>
    );
  }

  return <CSSGrid />;
};
