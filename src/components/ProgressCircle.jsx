function ProgressCircle({ percent }) {
  const angle = percent * 3.6;

  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: `conic-gradient(
          #4caf50 ${angle}deg,
          #e0e0e0 ${angle}deg
        )`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: "bold"
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {percent}%
      </div>
    </div>
  );
}

export default ProgressCircle;
