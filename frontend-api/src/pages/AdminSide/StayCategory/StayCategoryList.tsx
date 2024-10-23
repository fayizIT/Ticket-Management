import React, { useEffect, useState } from "react";
import { ActionIcon, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  DataTable,
  DataTableColumn,
  DataTableSortStatus,
} from "mantine-datatable";
import Flatpickr from "react-flatpickr";
import { StayCategoryService } from "../../../services/StayCategoryService";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "../../../Layouts/Dropdown";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/material_green.css";

interface StayCategory {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const StayCategoryList: React.FC = () => {
  const navigate = useNavigate();
  const [stayCategories, setStayCategories] = useState<StayCategory[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<StayCategory[]>([]);
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState<Date[]>([]); // Ensure this is defined in your component
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "name",
    direction: "asc",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  useEffect(() => {
    const fetchStayCategories = async () => {
      try {
        const data = await StayCategoryService.fetchAll();
        setStayCategories(data);
      } catch {
        toast.error("Failed to fetch stay categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStayCategories();
  }, []);

  useEffect(() => {
    const filteredData = stayCategories.filter(({ name }) =>
      name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    // Sort filtered data based on sortStatus
    const sortedData = filteredData.sort((a, b) => {
      const accessor = sortStatus.columnAccessor as keyof StayCategory;
      if (typeof a[accessor] === "string" && typeof b[accessor] === "string") {
        return sortStatus.direction === "asc"
          ? a[accessor].localeCompare(b[accessor])
          : b[accessor].localeCompare(a[accessor]);
      } else if (
        typeof a[accessor] === "number" &&
        typeof b[accessor] === "number"
      ) {
        return sortStatus.direction === "asc"
          ? a[accessor] - b[accessor]
          : b[accessor] - a[accessor];
      }
      return 0; // If types are different, don't sort
    });

    setRecords(sortedData.slice((page - 1) * pageSize, page * pageSize));
  }, [stayCategories, debouncedQuery, sortStatus, page, pageSize]);

  const handleDelete = async () => {
    if (!selectedCategoryId) return;
    try {
      await StayCategoryService.delete(selectedCategoryId);
      setStayCategories((prev) =>
        prev.filter((category) => category._id !== selectedCategoryId)
      );
      toast.success("Category deleted successfully!");
    } catch {
      toast.error("Failed to delete category. Please try again.");
    } finally {
      setIsDialogOpen(false);
    }
  };

  const openDialog = (id: string) => {
    setSelectedCategoryId(id);
    setIsDialogOpen(true);
  };

  const toggleColumnVisibility = (columnAccessor: string) => {
    setHiddenColumns((prevHiddenColumns) => {
      if (prevHiddenColumns.includes(columnAccessor)) {
        return prevHiddenColumns.filter((col) => col !== columnAccessor);
      } else {
        return [...prevHiddenColumns, columnAccessor];
      }
    });
  };

  const handleDateChange = (selectedDates: Date[]) => {
    setDateRange(selectedDates);
  };

  const columns: DataTableColumn<StayCategory>[] = [
    {
      accessor: "actions",
      title: "Actions",
      render: ({ _id }) => (
        <div className="flex items-center space-x-4">
          <ActionIcon
            onClick={() => navigate(`/admin/editStayCategory/${_id}`)}
            title="Edit"
          >
            <FiEdit />
          </ActionIcon>
          <ActionIcon onClick={() => openDialog(_id)} title="Delete">
            <RiDeleteBin6Line />
          </ActionIcon>
        </div>
      ),
    },
    { accessor: "name", title: "Name" },
    { accessor: "description", title: "Description" },
    {
      accessor: "price",
      title: "Price",
      render: ({ price }) => `${price.toFixed(2)}`,
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
      <h2 className="text-2xl font-bold mb-4">Stay Categories</h2>
      <div className="grid grid-cols-1 sm:flex justify-between gap-5 mb-4">
        <button
          className="lg:w-1/4 sm:w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => navigate("/admin/addStayCategory")}
        >
          Create Category
        </button>
        <Flatpickr
  options={{ mode: "range", dateFormat: "Y-m-d" }}
  value={dateRange}
  onChange={handleDateChange}  // Use the handle function
  className="lg:w-1/4 sm:w-full form-input border border-gray-300 rounded-md py-2 px-3"
  placeholder="Select date range"
/>

        <div className="lg:w-1/4 sm:w-full">
          <Dropdown
            btnClassName="w-full flex items-center border border-gray-300 rounded-md px-4 py-2 text-sm bg-white shadow-sm hover:bg-gray-100"
            button={
              <>
                <span className="mr-1">Columns</span>
                <IoIosArrowDown />
              </>
            }
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
                        <span className="ml-2">
                          {(col.title as string) || (col.accessor as string)}
                        </span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Dropdown>
        </div>

        <TextInput
          placeholder="Search..."
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
          className="lg:w-1/4 sm:w-full"
        />
      </div>

      <DataTable
        className="whitespace-nowrap"
        records={records}
        columns={columns.filter(
          (col) => !hiddenColumns.includes(col.accessor as string)
        )}
        highlightOnHover
        totalRecords={stayCategories.length}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={setPage}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        minHeight={200}
        paginationText={({ from, to, totalRecords }) =>
          `Showing ${from} to ${to} of ${totalRecords} entries`
        }
      />

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Stay Category"
        message="Are you sure you want to delete this stay category? This action cannot be undone."
      />
    </div>
  );
};
export default StayCategoryList;
