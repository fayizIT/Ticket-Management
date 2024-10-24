import React, { useEffect, useState, ChangeEvent } from "react";
import { ActionIcon, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import { FaPlus } from "react-icons/fa";
import { TicketCategoryService } from "../../../services/TicketCategoryService";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import {
  DataTable,
  DataTableColumn,
  DataTableSortStatus,
} from "mantine-datatable";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Dropdown from "../../../Layouts/Dropdown";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowDown } from "react-icons/io";
import { errorAlert, successAlert } from "../../../Layouts/Toast";
import Swal from "sweetalert2";

interface TicketCategory {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const TicketCategoriesList: React.FC = () => {
  const navigate = useNavigate();
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(
    []
  );
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<TicketCategory[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<TicketCategory>
  >({
    columnAccessor: "name",
    direction: "asc",
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);

  useEffect(() => {
    const fetchTicketCategories = async () => {
      setLoading(true);
      try {
        const categories = await TicketCategoryService.getAll();
        setTicketCategories(categories);
      } catch (error) {
        console.error("Error fetching ticket categories:", error);
        toast.error("Failed to fetch ticket categories");
      } finally {
        setLoading(false);
      }
    };

    fetchTicketCategories();
  }, []);

  useEffect(() => {
    const filteredData = ticketCategories.filter(({ name }) =>
      name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
      const accessor = sortStatus.columnAccessor as keyof TicketCategory;
      return sortStatus.direction === "asc"
        ? a[accessor] > b[accessor]
          ? 1
          : -1
        : a[accessor] < b[accessor]
        ? 1
        : -1;
    });

    setRecords(sortedData.slice((page - 1) * pageSize, page * pageSize));
  }, [ticketCategories, debouncedQuery, sortStatus, page, pageSize]);

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-ticket-category/${id}`);
  };

  const handleDelete = async () => {
    if (!selectedCategoryId) return;

    try {
      await TicketCategoryService.delete(selectedCategoryId);
      setTicketCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== selectedCategoryId)
      );
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete category. Please try again.");
    } finally {
      setIsDialogOpen(false);
      setSelectedCategoryId(null);
    }
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

  // Corrected: Added async to function definition
  const handleSelectChange = async (selectedOption: string) => {
    if (selectedOption === "delete" && selectedRecords.length > 0) {
      const confirmation = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert these changes!",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        padding: "2em",
      });
      if (confirmation.isConfirmed) {
        for (const recordId of selectedRecords) {
          // Using a for loop to await each delete
          try {
            await TicketCategoryService.delete(recordId);
            setTicketCategories((prev) =>
              prev.filter((category) => category._id !== recordId)
            );
            toast.success("Records deleted successfully!");
          } catch {
            toast.error("Failed to delete some records. Please try again.");
          }
        }
      }
    } else if (selectedOption === "edit" && selectedRecords.length === 1) {
      navigate(`/admin/edit-ticket-category/${selectedRecords[0]}`);
    } else if (
      selectedOption === "exportExcel" &&
      selectedRecords.length === 1
    ) {
      console.log("Exporting Excel...");
      // Add your Excel export logic here
    }
  };

  const openDialog = (id: string) => {
    setSelectedCategoryId(id);
    setIsDialogOpen(true);
  };

  const handleSelectRecord = (id: string) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((recordId) => recordId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllRecords = () => {
    if (selectedRecords.length === records.length) {
      setSelectedRecords([]); // Deselect all
    } else {
      setSelectedRecords(records.map((record) => record._id)); // Select all
    }
  };

  const handleCreate = () => {
    navigate("/admin/create-ticket-category");
  };

  const columns: DataTableColumn<TicketCategory>[] = [
    {
      accessor: "select",
      title: (
        <input
          type="checkbox"
          checked={
            selectedRecords.length === records.length && records.length > 0
          }
          onChange={handleSelectAllRecords}
          className="w-6 h-6"
        />
      ),
      render: ({ _id }) => (
        <input
          type="checkbox"
          checked={selectedRecords.includes(_id)}
          onChange={() => handleSelectRecord(_id)}
          className="w-6 h-6"
        />
      ),
    },
    {
      accessor: "actions",
      title: "Actions",
      render: ({ _id }) => (
        <div className="flex items-center space-x-1">
          <ActionIcon
            onClick={() => handleEdit(_id)}
            title="Edit"
            className="text-blue-500"
            variant="transparent"
          >
            <FiEdit />
          </ActionIcon>
          <ActionIcon
            onClick={() => openDialog(_id)}
            title="Delete"
            className="text-red-500"
            variant="transparent"
          >
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
      <h2 className="text-2xl font-bold mb-4">Ticket Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
        <button
          className="py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full"
          onClick={handleCreate}
        >
          Create Coupon
        </button>

        <div className="w-full">
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
                {columns
                  .filter((col) => col.accessor !== "select")
                  .map((col, index) => (
                    <li key={index} className="flex flex-col">
                      <div className="flex items-center px-4 py-1">
                        <label className="cursor-pointer mb-0">
                          <input
                            type="checkbox"
                            checked={
                              !hiddenColumns.includes(col.accessor as string)
                            }
                            className="mr-2"
                            onChange={() =>
                              toggleColumnVisibility(col.accessor as string)
                            }
                          />
                          {col.title}
                        </label>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Dropdown>
        </div>

        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <IconSearch size={14} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <ActionIcon
            onClick={() => setQuery("")}
            title="Clear search"
            size="sm"
            variant="transparent"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <IconX size={14} />
          </ActionIcon>
        </div>

        <div className="w-full">
          <select
            id="ctnSelect1"
            className="form-select border border-gray-300 rounded-md px-4 py-2 text-sm bg-white shadow-sm hover:bg-gray-100 w-full"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleSelectChange(e.target.value)
            }
          >
            <option value="">Action Dropdown</option>
            <option value="edit">Edit</option>
            <option value="exportExcel">Export Excel</option>
            <option value="delete">Delete</option>
          </select>
        </div>
      </div>

      <DataTable<TicketCategory>
        className="whitespace-nowrap"
        records={records}
        columns={columns.filter(
          (col) => !hiddenColumns.includes(col.accessor as string)
        )}
        highlightOnHover
        totalRecords={ticketCategories.length}
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
        title="Delete Ticket Category"
        message="Are you sure you want to delete this ticket category? This action cannot be undone."
      />
    </div>
  );
};

export default TicketCategoriesList;
