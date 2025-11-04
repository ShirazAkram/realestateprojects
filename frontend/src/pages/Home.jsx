import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await API.get("/properties");
      setProperties(data);
    };
    fetchProperties();
  }, []);

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <h2>Available Properties</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {properties.map((p) => (
          <PropertyCard key={p._id} property={p} />
        ))}
      </div>
    </div>
  );
}
