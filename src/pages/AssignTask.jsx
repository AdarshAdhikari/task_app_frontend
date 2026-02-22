import { useState, useEffect } from "react";
import axios from "axios";
import "./AssignTask.css";

const AssignTask = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          receivers: selectedUsers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");
      setDescription("");
      setSelectedUsers([]);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="assign-container">
      <h2 className="assign-title">Assign Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          className="assign-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="assign-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

       <h4 className="assign-section-title">Select Team Members</h4>

        <div className="user-grid">
          {users.map((user) => {
            const isSelected = selectedUsers.includes(user._id);

            return (
              <div
                key={user._id}
                className={`user-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleCheckboxChange(user._id)}
              >
                <div className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="user-info">
                  <h4>{user.name || user.email}</h4>
                  <p>Team Member</p> {/*we can assign role for each member here in future:  <p>{user.role}</p>*/
                  }
                </div>

                <div className="user-selector">
                  <div className={`radio ${isSelected ? "active" : ""}`} />
                </div>
              </div>
            );
          })}
        </div>

        <button className="assign-button" type="submit">
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default AssignTask;
