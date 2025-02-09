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
    updatePlant(state, action: PayloadAction<Plant>) {
      const index = state.plants.findIndex((plant) => plant.id === action.payload.id);
      if (index !== -1) {
        state.plants[index] = action.payload;
      }
    },
  },
});

export const { addPlant, updatePlant } = plantsSlice.actions;

export default plantsSlice.reducer;
