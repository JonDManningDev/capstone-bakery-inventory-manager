import { useAlerts } from "../../context/AlertsContext";

export function Alerts() {
  const { alerts, removeAlert } = useAlerts();

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="container alerts-container">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert alert-${
            alert.variant || "info"
          } alert-dismissable fade show`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close mx-2"
            aria-label="Close"
            onClick={() => removeAlert(alert.id)}
          ></button>
        </div>
      ))}
    </div>
  );
}
