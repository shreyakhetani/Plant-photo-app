import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: PlantsState = {
  plants: [],
};

const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    addPlant(state, action: PayloadAction<Plant>) {
      state.plants.push(action.payload);
    },
  },
});

export const { addPlant } = plantsSlice.actions;

export default plantsSlice.reducer;
