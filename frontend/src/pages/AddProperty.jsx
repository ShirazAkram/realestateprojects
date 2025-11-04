import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "sale",
    bedrooms: "",
    bathrooms: "",
    area: "",
    image: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      await API.post("/properties", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Property added successfully!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <select name="type" onChange={handleChange}>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
        <input name="bedrooms" type="number" placeholder="Bedrooms" onChange={handleChange} />
        <input name="bathrooms" type="number" placeholder="Bathrooms" onChange={handleChange} />
        <input name="area" type="number" placeholder="Area (sqft)" onChange={handleChange} />
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          onChange={handleChange}
        ></textarea>
        <input name="image" type="file" onChange={handleChange} />
        <button type="submit">Submit Property</button>
      </form>
    </div>
  );
}
