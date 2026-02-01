function ProgressBar({ percent }) {
  return (
    <div style={{ width: "100%", background: "#ddd", height: 20, borderRadius: 10 }}>
      <div
        style={{
          width: `${percent}%`,
          background: "green",
          height: "100%",
          borderRadius: 10,
          textAlign: "center",
          color: "white",
          fontSize: 12
        }}
      >
        {percent}%
      </div>
    </div>
  );
}

export default ProgressBar;
