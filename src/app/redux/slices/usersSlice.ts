import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  avatar: string;
}

const initialState: User[] = [
  { id: 1, name: "Eda", avatar: "https://robohash.org/defne.png" },
  { id: 2, name: "Eray", avatar: "https://robohash.org/kaan.png" },
  { id: 3, name: "Emre", avatar: "https://robohash.org/emre.png" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;