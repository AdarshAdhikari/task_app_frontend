function AddProjectCard({ onAdd }) {
  return (
    <div
      onClick={onAdd}
      style={{
        border: "2px dashed #bbb",
        borderRadius: 12,
        padding: 20,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 150,
        background: "#fafafa"
      }}
    >
      <h3 style={{ color: "#777" }}>+ Add Project</h3>
    </div>
  );
}

export default AddProjectCard;
