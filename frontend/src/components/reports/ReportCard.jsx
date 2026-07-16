import "./ReportCard.css";

function ReportCard({ title, value, color }) {
  return (
    <div className={`card border-start border-5 border-${color} shadow-sm h-100`}>
      <div className="card-body">

        <h6 className="text-muted mb-2">
          {title}
        </h6>

        <h2 className="fw-bold mb-0">
          {value}
        </h2>

      </div>
    </div>
  );
}

export default ReportCard;