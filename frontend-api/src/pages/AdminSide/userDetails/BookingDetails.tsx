import React, { useEffect, useState } from "react";
import { ActionIcon, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import { FaEye, FaPlus } from "react-icons/fa";
import Flatpickr from "react-flatpickr";
import ConfirmDialogBox from "../../../components/ConfirmDialogBox";
import { fetchBookings } from "../../../services/BookingService";
import {
  DataTable,
  DataTableColumn,
  DataTableSortStatus,
} from "mantine-datatable";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "../../../Layouts/Dropdown";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "flatpickr/dist/flatpickr.css";

interface Booking {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfVisit: Date;
  totalVisitors: number;
  paymentStatus: boolean;
}

const BookingDetails: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Booking>>({
    columnAccessor: "fullName",
    direction: "asc",
  });
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [records, setRecords] = useState<Booking[]>([]);
  const [dateRange, setDateRange] = useState<Date[]>([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  useEffect(() => {
    const filteredData = bookings.filter(({ fullName, dateOfVisit }) => {
      const matchesName = fullName
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase());
      const matchesDate =
        dateRange.length === 0 ||
        (new Date(dateOfVisit) >= dateRange[0] &&
          new Date(dateOfVisit) <= dateRange[1]);
      return matchesName && matchesDate;
    });

    const sortedData = filteredData.sort((a, b) => {
      const accessor = sortStatus.columnAccessor as keyof Booking;
      return sortStatus.direction === "asc"
        ? a[accessor] > b[accessor]
          ? 1
          : -1
        : a[accessor] < b[accessor]
        ? 1
        : -1;
    });

    setRecords(sortedData.slice((page - 1) * pageSize, page * pageSize));
  }, [bookings, debouncedQuery, sortStatus, page, pageSize, dateRange]);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };

  const toggleColumnVisibility = (columnAccessor: string) => {
    setHiddenColumns((prev) =>
      prev.includes(columnAccessor)
        ? prev.filter((col) => col !== columnAccessor)
        : [...prev, columnAccessor]
    );
  };

  const columns: DataTableColumn<Booking>[] = [
    {
      accessor: "actions",
      title: "Actions",
      render: ({ _id }) => (
        <ActionIcon
          onClick={() => handleViewDetails({ _id } as Booking)}
          title="View Details"
          className="text-blue-500"
          variant="transparent"
        >
          <FaEye />
        </ActionIcon>
      ),
    },
    { accessor: "fullName", title: "Full Name" },
    { accessor: "phoneNumber", title: "Phone Number" },
    { accessor: "email", title: "Email" },
    {
      accessor: "dateOfVisit",
      title: "Date of Visit",
      render: ({ dateOfVisit }) =>
        new Date(dateOfVisit).toLocaleDateString("en-GB"),
    },
    { accessor: "totalVisitors", title: "Total Visitors" },
    {
      accessor: "paymentStatus",
      title: "Payment Status",
      render: ({ paymentStatus }) => (
        <span className={paymentStatus ? "text-green-600" : "text-red-600"}>
          {paymentStatus ? "Completed" : "Not Completed"}
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <button
          className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center"
          onClick={() => {
            /* Navigate to add booking */
          }}
        >
          <FaPlus className="mr-2" /> Create Booking
        </button>

        <Flatpickr
          options={{ mode: "range", dateFormat: "Y-m-d" }}
          value={dateRange}
          onChange={setDateRange}
          className="flex-1 form-input border border-gray-300 rounded-md py-2 px-3"
          placeholder="Select date range"
        />

        <div className="flex-1">
          <Dropdown
            btnClassName="w-full flex items-center border border-gray-300 rounded-md px-4 py-2 text-sm bg-white shadow-sm hover:bg-gray-100"
            button={<span>Columns</span>}
          >
            <div className="absolute z-10 bg-white bg-opacity-80 rounded-md shadow-md p-4">
              <ul className="min-w-[300px] max-h-60 overflow-y-auto">
                {columns.map((col, index) => (
                  <li key={index} className="flex flex-col">
                    <div className="flex items-center px-4 py-1">
                      <label className="cursor-pointer mb-0">
                        <input
                          type="checkbox"
                          checked={
                            !hiddenColumns.includes(col.accessor as string)
                          }
                          className="form-checkbox"
                          onChange={() =>
                            toggleColumnVisibility(col.accessor as string)
                          }
                        />
                        <span className="ml-2">{col.title || col.accessor}</span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Dropdown>
        </div>

        <TextInput
          placeholder="Search by full name..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          rightSection={
            <ActionIcon
              size="sm"
              variant="transparent"
              onClick={() => setQuery("")}
            >
              <IconX size={14} />
            </ActionIcon>
          }
          className="flex-1"
        />
      </div>

      <DataTable<Booking>
        records={records}
        columns={columns.filter(
          (col) => !hiddenColumns.includes(col.accessor as string)
        )}
        highlightOnHover
        totalRecords={bookings.length}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={setPage}
        recordsPerPageOptions={[10, 20, 30, 50, 100]}
        onRecordsPerPageChange={setPageSize}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        minHeight={200}
        paginationText={({ from, to, totalRecords }) =>
          `Showing ${from} to ${to} of ${totalRecords} entries`
        }
      />

      <ConfirmDialogBox
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          /* Handle delete */
        }}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
      />
    </div>
  );
};

export default BookingDetails;
