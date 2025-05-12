
import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice= createSlice({
    name: "theme",
    initialState: 
    {themes:false},
    reducers:{
        themeSelector:(state)=>{
            state.themes=!state.themes;
        }
    }
})

export default ThemeSlice.reducer;

export const {themeSelector}= ThemeSlice.actions