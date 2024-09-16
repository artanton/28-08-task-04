// import { createSelector } from '@reduxjs/toolkit';

import { RootState } from "../store";

export const selectTask =( state: RootState )=> state.task.tasks;


// export const selectFilter = state => state.filt.filter;

export const selectIsLoading =( state: RootState ) => state.task.isLoading;

export const selectError = ( state: RootState ) => state.task.error;

// export const selectSearchedContacts = createSelector(
//   [selectTask, selectFilter],
//   (storeContacts, searchedContact) => {
//     return storeContacts.filter(contact => {
//       const fitContact = contact.name
//         .toLowerCase()
//         .includes(searchedContact.toLowerCase());
//       return fitContact;
//     });
//   }
// );
