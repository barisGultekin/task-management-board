"use client";
import React, { useState } from "react";
import styles from "./Board.module.scss";

import BoardColumn from "../BoardColumn/BoardColumn";
import Modal from "../Modal/Modal";
import TaskInfo from "../TaskInfo/TaskInfo";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateTaskStatus } from "@/app/redux/slices/tasksSlice";

const Board = () => {
  // Access tasks from Redux store
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Handle dropping a task into a new column
  const handleDrop = (taskId: number, newStatus: string) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  // Modal handlers
  const openModal = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className={styles.board}>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {selectedTask && (
            <TaskInfo
              id={selectedTask.id}
              title={selectedTask.title}
              description={selectedTask.description}
              status={selectedTask.status}
              assigneeId={selectedTask.assigneeId}
              storyPoints={selectedTask.storyPoints}
              startDate={selectedTask.startDate}
              endDate={selectedTask.endDate}
            />
          )}
        </Modal>
      )}
      {["Open", "In Progress", "In Review", "Done"].map((status) => (
        <BoardColumn
          key={status}
          title={status}
          tasks={tasks.filter(
            (task: { status: string }) => task.status === status
          )}
          onDrop={handleDrop}
          onTaskClick={openModal}
        />
      ))}
    </div>
  );
};

export default Board;
