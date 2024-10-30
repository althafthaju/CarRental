import React, { useState } from "react";

const CompanySide: React.FC<{ userName: string }> = ({ userName }) => {
  const [cars, setCars] = useState<string[]>([]);
  const [newCar, setNewCar] = useState({ name: "", vehicleNumber: "" });
  const [vehicleNumberToDelete, setVehicleNumberToDelete] = useState("");
  const [showAddCarForm, setShowAddCarForm] = useState(false);
  const [showDeleteCarForm, setShowDeleteCarForm] = useState(false);

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    setCars((prev) => [...prev, newCar.name]);
    setNewCar({ name: "", vehicleNumber: "" });
    setShowAddCarForm(false);
  };

  const handleDeleteCar = (e: React.FormEvent) => {
    e.preventDefault();
    setCars((prev) => prev.filter((car) => car !== vehicleNumberToDelete));
    setVehicleNumberToDelete("");
    setShowDeleteCarForm(false);
  };

  return (
    <div className="container mt-4">
      <nav className="company_managing">
        <h1>Company Manager</h1>
        <div style={{ padding: 10 }}>{userName}</div>
      </nav>
      <h2>Available Cars</h2>
      <ul className="list-group mb-4">
        {cars.map((car, index) => (
          <li key={index} className="list-group-item">
            {car}
          </li>
        ))}
      </ul>

      <button
        className="btn btn-primary mb-2"
        onClick={() => setShowAddCarForm(!showAddCarForm)}
      >
        {showAddCarForm ? "Cancel" : "Add Car"}
      </button>
      {showAddCarForm && (
        <form onSubmit={handleAddCar} className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Car Name"
              value={newCar.name}
              onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Vehicle Number"
              value={newCar.vehicleNumber}
              onChange={(e) =>
                setNewCar({ ...newCar, vehicleNumber: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      )}

      <button
        className="btn btn-danger mb-2"
        onClick={() => setShowDeleteCarForm(!showDeleteCarForm)}
      >
        {showDeleteCarForm ? "Cancel" : "Delete Car"}
      </button>
      {showDeleteCarForm && (
        <form onSubmit={handleDeleteCar} className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Vehicle Number to Delete"
              value={vehicleNumberToDelete}
              onChange={(e) => setVehicleNumberToDelete(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Delete
          </button>
        </form>
      )}
    </div>
  );
};

export default CompanySide;
