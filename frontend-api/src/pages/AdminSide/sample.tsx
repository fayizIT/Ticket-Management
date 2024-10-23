// import { ActionIcon, Checkbox, MultiSelect, TextInput } from '@mantine/core';
// import { type DatesRangeValue } from '@mantine/dates';
// import { useDebouncedValue } from '@mantine/hooks';
// import { IconSearch, IconX } from '@tabler/icons-react';
// import { IoIosArrowDown } from 'react-icons/io';
// import { FiEdit } from 'react-icons/fi';
// import { RiEyeLine } from 'react-icons/ri';
// import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
// import '@mantine/core/styles.css';
// import 'mantine-datatable/styles.css';
// import Flatpickr from 'react-flatpickr';
// import 'flatpickr/dist/flatpickr.css';
// import 'flatpickr/dist/themes/material_green.css'; 
// import dayjs from 'dayjs';
// import { ChangeEvent, useEffect, useMemo, useState } from 'react';
// import Dropdown from './Layouts/Dropdown';
// import { Link } from 'react-router-dom';
// import { errorAlert, successAlert } from './Layouts/Toast';

// interface Department {
//     name: string;
// }

// interface Company {
//     name: string;
// }

// interface Employee {
//     id: string;
//     firstName: string;
//     lastName: string;
//     department: Department;
//     company: Company;
//     birthDate: string;
//     age: number;
// }

// const employees: Employee[] = [
//     {
//         id: '1',
//         firstName: 'Rajesh',
//         lastName: 'Kumar',
//         department: { name: 'Industrial' },
//         company: { name: 'Tata Group' },
//         birthDate: '1950-05-21',
//         age: 74,
//     },
//     {
//         id: '2',
//         firstName: 'Suman',
//         lastName: 'Patel',
//         department: { name: 'Computers' },
//         company: { name: 'Infosys Ltd' },
//         birthDate: '1943-12-20',
//         age: 80,
//     },
//     {
//         id: '3',
//         firstName: 'Anita',
//         lastName: 'Sharma',
//         department: { name: 'Toys' },
//         company: { name: 'Reliance Industries' },
//         birthDate: '1955-01-29',
//         age: 69,
//     },
// ];

// const Datatable = () => {
//     const [employeeData, setEmployeeData] = useState<Employee[]>(employees);
//     const [page, setPage] = useState(1);
//     const PAGE_SIZES = [10, 20, 30, 50, 100];
//     const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
//     const [initialRecords, setInitialRecords] = useState<Employee[]>([]);
//     const [records, setRecords] = useState<Employee[]>([]);
//     const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
//     const [query, setQuery] = useState('');
//     const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
//     const [birthdaySearchRange, setBirthdaySearchRange] = useState<DatesRangeValue | undefined>(undefined);
//     const [seniors, setSeniors] = useState(false);
//     const [dateRange, setDateRange] = useState<DatesRangeValue | undefined>(undefined);
//     const [debouncedQuery] = useDebouncedValue(query, 200);
//     const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
//         columnAccessor: 'id',
//         direction: 'asc',
//     });
//     const [hiddenColumns, setHiddenColumns] = useState<any[]>(['company.name', 'age']);

//     const departments = useMemo(() => {
//         const departmentsSet = new Set(employees.map((e) => e.department.name));
//         return [...departmentsSet];
//     }, []);

//     useEffect(() => {
//         setPage(1);
//     }, [pageSize]);

//     useEffect(() => {
//         const from = (page - 1) * pageSize;
//         const to = from + pageSize;
//         setRecords([...initialRecords.slice(from, to)]);
//     }, [page, pageSize, initialRecords]);

//     useEffect(() => {
//         if (employeeData.length > 0) {
//             const sortedData = employeeData.slice().sort((a, b) => {
//                 const accessor = sortStatus.columnAccessor as keyof Employee;
//                 if (a[accessor] < b[accessor]) return sortStatus.direction === 'asc' ? -1 : 1;
//                 if (a[accessor] > b[accessor]) return sortStatus.direction === 'asc' ? 1 : -1;
//                 return 0;
//             });
//             setInitialRecords(sortedData);
//             setRecords(sortedData.slice(0, pageSize));
//         }
//     }, [employeeData, sortStatus, pageSize]);

//     useEffect(() => {
//         const filteredData = initialRecords.filter(({ firstName, lastName, department, birthDate }) => {
//             if (debouncedQuery !== '' && !`${firstName} ${lastName}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) return false;

//             if (
//                 birthdaySearchRange &&
//                 birthdaySearchRange[0] &&
//                 birthdaySearchRange[1] &&
//                 (dayjs(birthdaySearchRange[0]).isAfter(birthDate, 'day') || dayjs(birthdaySearchRange[1]).isBefore(birthDate, 'day'))
//             )
//                 return false;

//             if (selectedDepartments.length && !selectedDepartments.some((d) => d === department.name)) return false;

//             if (seniors && dayjs().diff(birthDate, 'year') <= 70) return false;

//             return true;
//         });
//         setRecords(filteredData.slice(0, pageSize));
//     }, [debouncedQuery, birthdaySearchRange, selectedDepartments, seniors, initialRecords, pageSize]);

//     const toggleColumnVisibility = (columnAccessor: string) => {
//         setHiddenColumns((prevHiddenColumns) => {
//             if (prevHiddenColumns.includes(columnAccessor)) {
//                 return prevHiddenColumns.filter((col) => col !== columnAccessor);
//             } else {
//                 return [...prevHiddenColumns, columnAccessor];
//             }
//         });
//     };

//     const columns: DataTableColumn<Employee | any>[] = [
//         {
//             accessor: 'actions',
//             title: 'Actions',
//             render: (rowData: any) => (
//                 <div className="flex items-center space-x-4">
//                     <button
//                         type="button"
//                         onClick={() => successAlert(rowData)}
//                         className="text-gray-600 hover:text-blue-600 transition"
//                     >
//                         <FiEdit className="text-lg" />
//                     </button>
//                     <button
//                         type="button"
//                         onClick={() => successAlert(rowData)}
//                         className="text-gray-600 hover:text-blue-600 transition"
//                     >
//                         <RiEyeLine className="text-lg" />
//                     </button>
//                 </div>
//             ),
//         },
//         {
//             accessor: 'name',
//             render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
//             filter: (
//                 <TextInput
//                     label="Employees"
//                     placeholder="Search employees..."
//                     leftSection={<IconSearch size={16} />}
//                     rightSection={
//                         <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery('')}>
//                             <IconX size={14} />
//                         </ActionIcon>
//                     }
//                     value={query}
//                     onChange={(e) => setQuery(e.currentTarget.value)}
//                 />
//             ),
//             filtering: query !== '',
//         },
//         {
//             accessor: 'department.name',
//             filter: (
//                 <MultiSelect
//                     label="Departments"
//                     description="Show all employees working at the selected departments"
//                     data={departments}
//                     value={selectedDepartments}
//                     placeholder="Search departments…"
//                     onChange={setSelectedDepartments}
//                     leftSection={<IconSearch size={16} />}
//                     clearable
//                     searchable
//                 />
//             ),
//             filtering: selectedDepartments.length > 0,
//         },
//         { accessor: 'company.name', title: 'Company', sortable: true, hidden: hiddenColumns.includes('company.name') },
//         {
//             accessor: 'birthDate',
//             sortable: true,
//         },
//         {
//             accessor: 'age',
//             textAlign: 'right',
//             render: ({ birthDate }) => dayjs().diff(birthDate, 'year'),
//             filter: () => (
//                 <Checkbox
//                     label="Seniors"
//                     description="Show employees who are older than 70 years"
//                     checked={seniors}
//                     onChange={() => setSeniors((current) => !current)}
//                 />
//             ),
//             sortable: true,
//             hidden: hiddenColumns.includes('age'),
//         },
//     ];

//     const handleSelectChange = (selectedOption: string) => {
//         if (selectedOption === 'edit' && selectedRecords.length === 1) {
//             successAlert('Edit Page');
//         } else if (selectedOption === 'exportExcel' && selectedRecords.length === 1) {
//             // downloadExcel(selectedRecords, 'Admin');
//         } else if (selectedOption === 'delete' && selectedRecords.length === 1) {
//             const confirmation = window.confirm('Are you sure you want to delete this record?');
//             if (confirmation) {
//                 setEmployeeData((current) => current.filter((employee) => employee.id !== selectedRecords[0].id));
//                 setSelectedRecords([]);
//                 successAlert('Record deleted successfully');
//             }
//         }
//     };

//     return (
//         <div className="panel mt-6 p-5 bg-white rounded-lg shadow-md">
//             <div className="grid grid-cols-1 sm:flex justify-between gap-5 mb-4">
//                 <div className="lg:w-1/4 sm:w-full">
//                     <Link to="#" className="block w-full py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700">
//                         Create Page
//                     </Link>
//                 </div>

//                 <div className="lg:w-1/4 sm:w-full">
//                     <Dropdown
//                         btnClassName="w-full flex items-center border border-gray-300 rounded-md px-4 py-2 text-sm bg-white shadow-sm hover:bg-gray-100"
//                         button={
//                             <>
//                                 <span className="mr-1">Columns</span>
//                                 <IoIosArrowDown />
//                             </>
//                         }
//                     >
//                         <div className="absolute z-10 bg-white bg-opacity-80 rounded-md shadow-md p-4">
//                             <ul className="min-w-[300px] max-h-60 overflow-y-auto">
//                                 {columns.map((col: any, index) => (
//                                     <li key={index} className="flex flex-col">
//                                         <div className="flex items-center px-4 py-1">
//                                             <label className="cursor-pointer mb-0">
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={!hiddenColumns.includes(col.accessor)}
//                                                     className="form-checkbox"
//                                                     onChange={() => toggleColumnVisibility(col.accessor)}
//                                                 />
//                                                 <span className="ml-2">{col.title || col.accessor}</span>
//                                             </label>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </Dropdown>
//                 </div>

//                 <div className="lg:w-1/4 sm:w-full">
//                     <Flatpickr
//                         options={{
//                             mode: 'range',
//                             dateFormat: 'Y-m-d',
//                             static: false,
//                         }}
//                         value={dateRange}
//                         onChange={(date) => setDateRange(date)}
//                         className="form-input border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                         placeholder="Select date range"
//                     />
//                 </div>

//                 <div className="lg:w-1/4 sm:w-full">
//                     <input
//                         type="text"
//                         className="form-input w-full border border-gray-300 rounded-md py-2 px-3"
//                         placeholder="Search..."
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                     />
//                 </div>

//                 <div className="lg:w-1/4 sm:w-full">
//                     <select
//                         id="ctnSelect1"
//                         className="form-select w-full border border-gray-300 rounded-md py-2 px-3"
//                         onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectChange(e.target.value)}
//                     >
//                         <option value="">Action Dropdown</option>
//                         <option value="edit">Edit</option>
//                         <option value="exportExcel">Export Excel</option>
//                         <option value="delete">Delete</option>
//                     </select>
//                 </div>
//             </div>

//             <div className="datatables mt-6">
//                 <DataTable
//                     className="whitespace-nowrap table-hover"
//                     records={records}
//                     columns={columns.filter(col => !hiddenColumns.includes(col.accessor))}
//                     highlightOnHover
//                     totalRecords={employees.length}
//                     recordsPerPage={pageSize}
//                     page={page}
//                     onPageChange={setPage}
//                     recordsPerPageOptions={PAGE_SIZES}
//                     onRecordsPerPageChange={setPageSize}
//                     sortStatus={sortStatus}
//                     onSortStatusChange={setSortStatus}
//                     selectedRecords={selectedRecords}
//                     onSelectedRecordsChange={(selectedRows) => setSelectedRecords(selectedRows)}
//                     minHeight={200}
//                     paginationText={({ from, to, totalRecords }) => `Showing ${from} to ${to} of ${totalRecords} entries`}
//                     tableProps={{
//                         className: "min-w-full border border-gray-300 rounded-lg",
//                     }}
//                     recordsPerPageOptionsProps={{
//                         className: "text-gray-600",
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Datatable;
