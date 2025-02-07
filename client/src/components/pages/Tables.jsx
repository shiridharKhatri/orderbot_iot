import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://iot-production-df7c.up.railway.app")
const TableStatus = () => {
  const navigate = useNavigate()
  const [tableStatus, setTableStatus] = useState({
    table1Status: "available",
    table2Status: "available",
    table3Status: "available",
  });


  useEffect(() => {
    // Listening for updates from the server
    socket.on("seatStatusUpdate", (data) => {
      setTableStatus({
        table1Status: data.table1Status,
        table2Status: data.table2Status,
        table3Status: data.table3Status,
      });
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.off("seatStatusUpdate");
    };
  }, []);

  const updateTableStatus = (status) => {
    return status === "available" ? "bg-green-600" : "bg-red-600";
  };

  return (
    <div className="bg-primary text-white flex w-full">
      <div className="lg:col-span-1"></div>
      <div className="container mx-auto text-center p-8 bg-secondary rounded-lg w-full col-span-4 shadow-lg max-w-4xl size-fit">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {["table1", "table2", "table3"].map((table, index) => {
            return (
              <div
                key={index}
                className={`p-8 rounded-full shadow-lg text-2xl font-semibold transition-all flex flex-col items-center justify-center w-40 h-40 ${updateTableStatus(
                  tableStatus[table + "Status"]
                )} border border-gray-600`}
                onClick={()=>navigate(`/menu/${index+1}`)}
              >
                {`Table ${index + 1}`}
                <span className="status mt-2 text-lg text-highlight">
                  {tableStatus[table + "Status"] === "available"
                    ? "Available"
                    : "Booked"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableStatus;
