import {createSlice} from "@reduxjs/toolkit"

const noteSlice = createSlice({
    name: "notes",
    initialState: [],

    reducers: {
        setNotes: (state, action) => {
            const {notes} = action.payload;
            state = notes;
        } 
    }
})

export const {setNotes} = noteSlice.actions;

export default  noteSlice.reducer ;

export const setAllNote = (state)=> state.notes;