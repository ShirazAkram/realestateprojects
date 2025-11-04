export default function PropertyCard({ property }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <img
        src={`http://localhost:5000${property.image}`}
        alt={property.title}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "1rem" }}>
        <h3>{property.title}</h3>
        <p>{property.location}</p>
        <strong>₹{property.price.toLocaleString()}</strong>
      </div>
    </div>
  );
}
