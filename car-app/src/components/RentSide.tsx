import React, { useState } from "react";
import "./RentSide.css";

interface Car {
  id: number;
  name: string;
  available: boolean;
}

const availableCars: Car[] = [
  { id: 1, name: "Toyota Camry", available: true },
  { id: 2, name: "Honda Accord", available: true },
  { id: 3, name: "Ford Mustang", available: true },
];

const RentSide: React.FC<{ userName: string }> = ({ userName }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [filteredCars, setFilteredCars] = useState<Car[]>(availableCars);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClick = (num: number) => {
    setSelectedIndex(num);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);

    // Filter cars based on availability (this is a placeholder logic)
    const availableOnDate = availableCars.filter((car) => car.available);
    setFilteredCars(availableOnDate);
  };

  return (
    <div className="anoop">
      <nav>
        <h1>Car Rental</h1>
        <div style={{ padding: 10 }}>{userName}</div>
      </nav>

      <div style={{ padding: "1rem" }}>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ marginBottom: "1rem" }}
        />

        <h2>Available Cars:</h2>
        <ul className="list-group">
          {filteredCars.map((car, index) => (
            <li
              onClick={() => handleClick(index)}
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={car.id}
            >
              {car.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedIndex + 1 && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #000",
          }}
        >
          <h2>Details</h2>
          <p>{availableCars[selectedIndex].id}</p>
          <p>{availableCars[selectedIndex].name}</p>
          <p>{availableCars[selectedIndex].available}</p>
          <button type="button" className="btn btn-success">
            Rent
          </button>
        </div>
      )}
    </div>
  );
};

export default RentSide;
