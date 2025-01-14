import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string; // "Open", "In Progress", "In Review", "Done"
  assigneeId: number;
  storyPoints: number;
  startDate: string;
  endDate: string;
}

const initialState: Task[] = [
  {
    id: 1,
    title: "Design Homepage",
    description: "Create a responsive design for the homepage",
    status: "Open",
    assigneeId: 1,
    storyPoints: 3,
    startDate: "2025-01-01",
    endDate: "2025-01-05",
  },
  {
    id: 2,
    title: "Implement Drag-and-Drop",
    description: "Develop drag-and-drop functionality for tasks",
    status: "In Progress",
    assigneeId: 2,
    storyPoints: 5,
    startDate: "2025-01-03",
    endDate: "2025-01-10",
  },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const { addTask, editTask, deleteTask, updateTaskStatus } =
  tasksSlice.actions;
export default tasksSlice.reducer;
