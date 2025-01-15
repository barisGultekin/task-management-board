"use client";
import React, { useState } from "react";
import styles from "./Board.module.scss";

import BoardColumn from "../BoardColumn/BoardColumn";
import Modal from "../Modal/Modal";
import TaskInfo from "../TaskInfo/TaskInfo";
import EditTaskForm from "../Forms/EditTaskForm";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { updateTaskStatus, deleteTask } from "@/app/redux/slices/tasksSlice";

const Board = () => {
  // Access tasks from Redux store
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    setIsTaskModalOpen(true);
  };

  const closeModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const openEditModal = (taskId: number) => {
    closeModal();
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const openDeleteModal = (taskId: number) => {
    closeModal();
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const handleDelete = () => {
    if (selectedTask) {
      dispatch(deleteTask(selectedTask.id)); // Dispatch delete action
      closeDeleteModal();
    }
  };

  return (
    <div className={styles.board}>

      {/* TASK MODAL */}
      {isTaskModalOpen && (
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
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          )}
        </Modal>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && selectedTask && (
        <Modal onClose={closeEditModal}>
          <EditTaskForm task={selectedTask} onClose={closeEditModal} />
        </Modal>
      )}

      {/* DELETE MODAL */}
      {isDeleteModalOpen && selectedTask && (
        <Modal onClose={closeDeleteModal}>
          <div className={styles.confirmation}>
            <h2>Delete Task</h2>
            <p>Are you sure you want to delete the task:</p>
            <p>{selectedTask.title}</p>
            <div className={styles.actions}>
              <button onClick={handleDelete} className={styles.confirmButton}>
                Yes, Delete
              </button>
              <button onClick={closeDeleteModal} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {["Open", "In Progress", "In Review", "Done"].map((status) => (
        <BoardColumn
          key={status}
          title={status}
          taskCount={tasks.filter((task) => task.status === status).length}
          tasks={tasks.filter(
            (task: { status: string }) => task.status === status
          )}
          onDrop={handleDrop}
          onTaskClick={openModal}
          onTaskEdit={openEditModal}
          onTaskDelete={openDeleteModal}
        />
      ))}
    </div>
  );
};

export default Board;
