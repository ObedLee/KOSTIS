import { configureStore, createSlice } from '@reduxjs/toolkit'

let datasets = createSlice({
  name : 'datasets',
  initialState :[],
  reducers : {
    addDataset(state, data){
      if (state === [])
        return [data]
      else
        return [...state, data]
    },
    deleteDataset(state, i){
      return state.splice(i,1)
    }
  }
})

export default configureStore({
  reducer: {
    datasets : datasets.reducer
  }
}) 

export let { addDataset, deleteDataset } = datasets.actions 