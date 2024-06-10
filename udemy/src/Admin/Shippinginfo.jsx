import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const Shippinginfo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
   
   //http://localhost:3000/ship
    axios
      .get("https://e-commerce-1-mzmg.onrender.com/ship")
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 90},
    {
      field: "address",
      headerName: "Address",
      width: 160,
      valueGetter: (params) =>
        `${params.row.line1 || ""} ${params.row.line2 || ""}`, //function to merge two columns
    },
    { field: "city", headerName: "City", width: 80 },
    { field: "state", headerName: "State", width: 80 },
    { field: "email", headerName: "email", width: 55 },
    { field: "phone", headerName: "phone", width: 60 },
    { field: "discount", headerName: "Discount", width: 80 },
    { field: "shippingcost", headerName: "shippingcost", width: 115},
    { field: "total", headerName: "Total", width: 80 },
    { field: "shippingMethod", headerName: "shippingMethod", width: 115 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Shippinginfo;
