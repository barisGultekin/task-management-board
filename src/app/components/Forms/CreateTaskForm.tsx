"use client";

import React, { useState } from "react";
import styles from "./Form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/slices/tasksSlice";
import { RootState } from "../../redux/store";

interface CreateTaskFormProps {
  onClose: () => void; // Function to close the modal
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState(users[0]?.id || 0);
  const [storyPoints, setStoryPoints] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(), // Use timestamp as unique ID
      title,
      description,
      status: "Open", // Default to "Open" when creating
      assigneeId: parseInt(assigneeId as unknown as string, 10),
      storyPoints,
      startDate,
      endDate,
    };

    dispatch(addTask(newTask)); // Dispatch the addTask action
    onClose(); // Close the modal
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <label>
        <p>Title:</p>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        <p>Description:</p>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        <p>Assignee:</p>

        <select
          value={assigneeId}
          onChange={(e) => setAssigneeId(parseInt(e.target.value, 10))}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <p>Story Points:</p>

        <input
          type="number"
          value={storyPoints}
          onChange={(e) => setStoryPoints(parseInt(e.target.value, 10))}
          min="1"
          required
        />
      </label>
      <label>
        <p>Start Date:</p>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        <p>End Date:</p>

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <div className={styles.actions}>
        <button type="submit">Create Task</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
