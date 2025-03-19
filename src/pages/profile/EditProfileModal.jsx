// const EditProfileModal = ({ open, onClose, loggedUser, onProfileUpdated }) => {
//   if (!loggedUser) return null; // Prevents issues if `loggedUser` is undefined

//   const [formData, setFormData] = useState({
//     fname: loggedUser.fname || "",
//     lname: loggedUser.lname || "",
//     bio: loggedUser.bio || "",
//     locationCity: loggedUser.location?.city || "",
//     locationCountry: loggedUser.location?.country || "",
//   });

//   useEffect(() => {
//     if (open) {
//       setFormData({
//         fname: loggedUser.fname || "",
//         lname: loggedUser.lname || "",
//         bio: loggedUser.bio || "",
//         locationCity: loggedUser.location?.city || "",
//         locationCountry: loggedUser.location?.country || "",
//       });
//     }
//   }, [open, loggedUser]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     axios
//       .patch(`http://localhost:3000/users/${loggedUser.id}`, formData)
//       .then(() => {
//         onProfileUpdated(formData);
//         onClose();
//       })
//       .catch((error) => console.error("Error updating profile:", error));
//   };

//   return (
//     <Dialog open={open} handler={onClose}>
//       <div className="p-4">
//         <h2 className="text-lg font-semibold">Edit Profile</h2>
//         <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" />
//         <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" />
//         <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
//         <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
//           Save
//         </button>
//         <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mt-4 ml-2">
//           Cancel
//         </button>
//       </div>
//     </Dialog>
//   );
// };

// export default EditProfileModal;
