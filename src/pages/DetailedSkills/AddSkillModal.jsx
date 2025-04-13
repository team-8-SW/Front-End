import React, { useState } from "react";
import { Dialog, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

const AddSkillModal = ({ open, onClose, userId, onSkillAdded }) => {
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState(false);

  const handleAddSkill = async (event) => {
    event.preventDefault();

    if (!newSkill.trim()) {
      setError(true);
      return;
    }
    setError(false);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/profiles/me/skills",
        { name: newSkill.trim() }, // ✅ backend expects "name"
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.skill) {
        onSkillAdded(res.data.skill);
      }
      setNewSkill("");
      onClose();
    } catch (err) {
      console.error("Error adding skill:", err);
      alert(err.response?.data?.error || "Failed to add skill");
    }
  };

  return (
    <Dialog open={open} handler={onClose}>
      <form onSubmit={handleAddSkill} className="p-4">
        <Typography variant="h5" className="mb-2">Add Skill</Typography>
        <input
          type="text"
          placeholder="Skill (e.g., React, Leadership)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className={`border p-2 w-full rounded-md ${error ? "border-red-500" : ""}`}
        />
        {error && <Typography className="text-red-500 text-sm">Skill is required</Typography>}
        <div className="flex justify-end mt-4">
          <Button color="red" onClick={onClose} className="mr-2">Cancel</Button>
          <Button type="submit" color="blue">Save</Button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddSkillModal;
