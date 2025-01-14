"use client";
import React from "react";
import BoardColumn from "../BoardColumn/BoardColumn";
import styles from "./Board.module.scss";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateTaskStatus } from "@/app/redux/slices/tasksSlice";

import Modal from "../Modal/Modal";

const Board = () => {
  // Access tasks from Redux store
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  // Handle dropping a task into a new column
  const handleDrop = (taskId: number, newStatus: string) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  const closeModal = () => {
    console.log("foo")
  };

  return (
    <div className={styles.board}>
      <Modal onClose={closeModal}/>
      {["Open", "In Progress", "In Review", "Done"].map((status) => (
        <BoardColumn
          key={status}
          title={status}
          tasks={tasks.filter((task: { status: string; }) => task.status === status)}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default Board;