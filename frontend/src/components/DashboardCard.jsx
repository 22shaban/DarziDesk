import "./DashboardCard.css";

function DashboardCard({
  title,
  value,
  icon,
  color = "primary",
}) {
  return (
    <div className={`card shadow-sm border-start border-5 border-${color} h-100`}>
      <div className="card-body d-flex justify-content-between align-items-center">

        <div>
          <p className="text-muted mb-1">
            {title}
          </p>

          <h3 className="fw-bold mb-0">
            {value}
          </h3>
        </div>

        <div
          style={{
            fontSize: "2rem",
            opacity: 0.8,
          }}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default DashboardCard;