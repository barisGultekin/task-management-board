"use client";

import React, { useState } from "react";
import styles from "./Form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { editTask } from "../../redux/slices/tasksSlice";

interface EditTaskFormProps {
  task: {
    id: number;
    status: string;
    title: string;
    description: string;
    assigneeId: number;
    storyPoints: number;
    startDate: string;
    endDate: string;
  };
  onClose: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assigneeId, setAssigneeId] = useState(task.assigneeId);
  const [storyPoints, setStoryPoints] = useState(task.storyPoints);
  const [startDate, setStartDate] = useState(task.startDate);
  const [endDate, setEndDate] = useState(task.endDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      id: task.id,
      status: task.status,
      title,
      description,
      assigneeId,
      storyPoints,
      startDate,
      endDate,
    };

    dispatch(editTask(updatedTask)); // Dispatch the editTask action
    onClose(); // Close the modal
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Edit Task</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Assignee:
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
        Story Points:
        <input
          type="number"
          value={storyPoints}
          onChange={(e) => setStoryPoints(parseInt(e.target.value, 10))}
          min="1"
          required
        />
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <div className={styles.actions}>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;