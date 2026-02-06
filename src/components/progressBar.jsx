function ProgressBar({ percent }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          height: 8,
          background: "#e0e0e0",
          borderRadius: 5,
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: percent >= 80 ? "#4caf50" : "#2196f3",
            transition: "width 0.3s ease"
          }}
        />
      </div>

      <small>{percent}% completed</small>
    </div>
  );
}

export default ProgressBar;
