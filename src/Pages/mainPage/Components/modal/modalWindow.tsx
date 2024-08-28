import { CloseButton, ModalContent, ModalOverlay } from './modalWindowsStyled';
import { FC, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { IgeneralModal } from '../../Task.types';


export const Modal:FC<IgeneralModal> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const closeModalOnEsc =( e:KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeModalOnEsc);

    return () => {
      window.removeEventListener('keydown', closeModalOnEsc);
    };
  }, [onClose]);

  const closeModalOnBackdrop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={closeModalOnBackdrop}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <MdClose style={{ color: 'red' }} />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};
