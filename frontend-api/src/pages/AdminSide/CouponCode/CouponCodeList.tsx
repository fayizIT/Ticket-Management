import React, { useEffect, useState } from "react";
import { ActionIcon } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import Flatpickr from "react-flatpickr";
import CouponService from "../../../services/CouponService";
import { ToastContainer, toast } from "react-toastify";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import {DataTable,DataTableColumn,DataTableSortStatus,} from "mantine-datatable";
import { IoIosArrowDown } from "react-icons/io";
import Dropdown from "../../../Layouts/Dropdown";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/material_green.css";


interface Coupon {
  _id: string;
  code: string;
  discount: number;
  expiryDate: Date;
  isActive: boolean;
}

const CouponCodeList: React.FC = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [records, setRecords] = useState<Coupon[]>([]);
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Coupon>>({
    columnAccessor: "code",
    direction: "asc",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const data = await CouponService.fetchCoupons(); 
        setCoupons(data as Coupon[]);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        toast.error("Failed to fetch coupons");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  useEffect(() => {
    const filteredData = coupons.filter(({ code }) =>
      code.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const sortedData = filteredData.sort((a, b) => {
      const accessor = sortStatus.columnAccessor as keyof Coupon;
      return sortStatus.direction === "asc"
        ? a[accessor] > b[accessor]
          ? 1
          : -1
        : a[accessor] < b[accessor]
        ? 1
        : -1;
    });

    setRecords(sortedData.slice((page - 1) * pageSize, page * pageSize));
  }, [coupons, debouncedQuery, sortStatus, page, pageSize]);

  const handleEdit = (id: string) => {
    navigate(`/admin/editCoupon/${id}`);
  };

  const handleDelete = async () => {
    if (!selectedCouponId) return;

    try {
      await CouponService.deleteCoupon(selectedCouponId);
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon._id !== selectedCouponId)
      );
      toast.success("Coupon deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete coupon. Please try again.");
    } finally {
      setIsDialogOpen(false);
      setSelectedCouponId(null);
    }
  };

  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      const updatedCoupon = await CouponService.updateCouponStatus(
        id,
        !currentStatus
      ); 
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon._id === id ? updatedCoupon : coupon
        )
      );
      toast.success(`Coupon is now ${!currentStatus ? "active" : "inactive"}!`);
    } catch (error) {
      console.error("Error updating coupon status:", error);
      toast.error("Failed to update coupon status");
    }
  };

  const openDialog = (id: string) => {
    setSelectedCouponId(id);
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

  const columns: DataTableColumn<Coupon>[] = [
    {
      accessor: "actions",
      title: "Actions",
      render: ({ _id, isActive }) => (
        <div className="flex items-center space-x-5">
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
    { accessor: "code", title: "Code" },
    { accessor: "discount", title: "Discount" },
    {
      accessor: "isActive",
      title: "Status",
      render: ({ _id, isActive }) => (
        <span
          onClick={() => toggleActiveStatus(_id, isActive)}
          title={isActive ? "Deactivate" : "Activate"}
          className={`cursor-pointer font-bold ${
            isActive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
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
      <h2 className="text-2xl font-bold mb-4">Coupons</h2>
      <div className="grid grid-cols-1 sm:flex justify-between gap-5 mb-4">
        <button
          className="lg:w-1/4 sm:w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => navigate("/admin/addCoupon")}
        >
          Create Coupon
        </button>

        {/* <Flatpickr
          options={{ mode: "range", dateFormat: "Y-m-d" }}
          value={dateRange}
          onChange={setDateRange}
          className="lg:w-1/4 sm:w-full form-input border border-gray-300 rounded-md py-2 px-3"
          placeholder="Select date range"
        /> */}

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

        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <IconSearch size={14} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div>

      <DataTable<Coupon>
        records={records}
        columns={columns.filter(
          (col) => !hiddenColumns.includes(col.accessor as string)
        )}
        page={page}
        onPageChange={setPage}
        totalRecords={coupons.length}
        recordsPerPage={pageSize}
        onRecordsPerPageChange={setPageSize}
        recordsPerPageOptions={[10, 20, 30, 50, 100]}
        sortStatus={sortStatus}
        onSortStatusChange={(newSortStatus: DataTableSortStatus<Coupon>) => {
          setSortStatus(newSortStatus);
        }}
        withTableBorder={true}
        paginationText={({ from, to, totalRecords }) =>
          `Showing ${from} to ${to} of ${totalRecords} entries`
        }
      />

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon?"
      />
    </div>
  );
};

export default CouponCodeList;
