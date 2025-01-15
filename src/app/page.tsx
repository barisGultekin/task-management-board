"use client";

import React, { useState } from "react";
import styles from "./page.module.scss";
import Board from "./components/Board/Board";
import Modal from "./components/Modal/Modal";
import CreateTaskForm from "./components/Forms/CreateTaskForm";

export default function Home() {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  // Open Create Task Modal
  const openCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
  };

  // Close Create Task Modal
  const closeCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <h1>Task Manager</h1>
        <button onClick={openCreateTaskModal}>Create Task</button>
      </div>
      <div className={styles.content}>
        <Board />
      </div>

      {/* Create Task Modal */}
      {isCreateTaskModalOpen && (
        <Modal onClose={closeCreateTaskModal}>
          <CreateTaskForm onClose={closeCreateTaskModal} />
        </Modal>
      )}
    </div>
  );
}