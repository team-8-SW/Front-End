import React, { useState } from "react";
import { Dialog, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

const AddSkillModal = ({ open, onClose, userId, onSkillAdded }) => {
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState(false);

  const handleAddSkill = (event) => {
    event.preventDefault(); // Prevent form refresh

    if (!newSkill.trim()) {
      setError(true);
      return;
    }
    setError(false);

    axios.get(`http://localhost:3000/users/${userId}`)
      .then(response => {
        const n=[...response.data.skills]
        
        const updatedSkills = [...n, newSkill];

        return axios.patch(`http://localhost:3000/users/${userId}`, {
          skills: updatedSkills
        });
      })
      .then(response => {
        console.log("Skill added successfully!", response.data);
        onSkillAdded(newSkill); // Update parent component
        setNewSkill(""); // Clear input
        onClose(); // Close modal
      })
      .catch(error => console.error("Error adding skill:", error));
  };

  return (
    <Dialog open={open} handler={onClose}>
      <form onSubmit={handleAddSkill} className="p-4">
        <Typography variant="h5" className="mb-2">Add Skill</Typography>
        <input
          type="text"
          placeholder="Skill (ex: Project Management)"
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
