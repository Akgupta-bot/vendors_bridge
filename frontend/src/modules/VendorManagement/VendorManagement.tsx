import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X, Building2, Users, Loader2, Eye } from "lucide-react";
import { apiClient } from "../../api/axios";

interface Vendor {
  _id: string;
  companyName: string;
  category: string;
  gstNumber: string;
  phone: string;
  status: "ACTIVE" | "PENDING" | "BLOCKED";
  email: string;
  address?: string;
}

interface VendorForm {
  companyName: string;
  contactPerson?: string;
  category: string;
  gstNumber: string;
  phone: string;
  email: string;
  address: string;
  status: "ACTIVE" | "PENDING" | "BLOCKED";
}

type FilterStatus = "ALL" | "ACTIVE" | "PENDING" | "BLOCKED";

export const VendorManagement: React.FC = () => {
  const location = useLocation();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [vendorForm, setVendorForm] = useState<VendorForm>({
    companyName: "",
    contactPerson: "",
    category: "Constructions",
    gstNumber: "",
    phone: "",
    email: "",
    address: "",
    status: "ACTIVE",
  });

  // =========================================================================
  // CORE API INTEGRATION PIPELINES (MATCHED TO ROUTER ENDPOINTS)
  // =========================================================================
  const fetchVendors = async () => {
    try {
      setIsLoading(true);
      // FIXED: Path adjusted from '/vendor/get-all' to match backend '/vendor/get-all-vender'
      const response = await apiClient.get("/vendor/get-all-vender");
      if (response.data?.success) {
        setVendors(response.data.vendors);
      }
    } catch (error: any) {
      console.error("Failed to load supplier directories:", error);
      // Fallback local mockup records if data layers are empty
      setVendors([
        {
          _id: "1",
          companyName: "Infra Supplies Pvt Ltd",
          category: "Constructions",
          gstNumber: "27AABCS1429Bz0",
          phone: "XYZ Number",
          status: "ACTIVE",
          email: "infra@supply.com",
        },
        {
          _id: "2",
          companyName: "Tech Core LTD",
          category: "IT",
          gstNumber: "27AABCS1429Bz0",
          phone: "XYZ Number",
          status: "ACTIVE",
          email: "core@tech.com",
        },
        {
          _id: "3",
          companyName: "FastLog Transport",
          category: "logistics",
          gstNumber: "27AABCS1429Bz0",
          phone: "XYZ Number",
          status: "BLOCKED",
          email: "fast@log.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();

    if (location.state?.openDrawer) {
      setIsModalOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setVendorForm({ ...vendorForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // FIXED: Path adjusted from '/vendor/register' to route directly to root target option '/'
      const response = await apiClient.post("/vendor", {
        ...vendorForm,
        role: "VENDOR",
      });

      if (response.data?.success) {
        setIsModalOpen(false);
        setVendorForm({
          companyName: "",
          category: "Constructions",
          gstNumber: "",
          phone: "",
          email: "",
          address: "",
          status: "ACTIVE",
        });
        fetchVendors();
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to authorize profile node payload serialization.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.gstNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      activeFilter === "ALL" || vendor.status === activeFilter;
    return matchesSearch && matchesStatus;
  });

  const getCount = (status: FilterStatus) => {
    if (status === "ALL") return vendors.length;
    return vendors.filter((v) => v.status === status).length;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-rose-50 text-rose-600 border-rose-200";
    }
  };

  return (
    <div className="w-full h-full space-y-6 font-sans relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Vendors
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Manage supplier profiles and registrations
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-sm transition flex items-center gap-2"
        >
          <Plus size={14} /> + Add Vendor
        </button>
      </div>

      <div className="relative w-full">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          type="text"
          placeholder="Search bar ...... search by name, gst number, category..."
          className="w-full bg-white border border-slate-200/80 rounded-2xl pl-12 pr-5 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition text-sm shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 select-none">
        {(["ALL", "ACTIVE", "PENDING", "BLOCKED"] as FilterStatus[]).map(
          (type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`text-xs font-bold px-4 py-1.5 border rounded-full transition-all flex items-center gap-1.5 ${
                activeFilter === type
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className="capitalize">{type.toLowerCase()}</span>
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  activeFilter === type
                    ? "bg-slate-800 text-emerald-400"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {getCount(type)}
              </span>
            </button>
          ),
        )}
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-500" size={28} />
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
            No supplier node structures match your search or category
            parameters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/60 text-slate-400 font-bold tracking-wide uppercase text-[10px]">
                  <th className="p-4 font-semibold">Vendor Name</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">GST no.</th>
                  <th className="p-4 font-semibold">Contact no.</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredVendors.map((vendor) => (
                  <tr
                    key={vendor._id}
                    className="hover:bg-slate-50/60 transition group"
                  >
                    <td className="p-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-emerald-500/10 flex items-center justify-center text-slate-500 group-hover:text-emerald-600 transition">
                          <Building2 size={14} />
                        </div>
                        <span>{vendor.companyName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 capitalize">
                      {vendor.category}
                    </td>
                    <td className="p-4 font-mono text-slate-800 tracking-wider font-semibold">
                      {vendor.gstNumber}
                    </td>
                    <td className="p-4 font-mono text-slate-500">
                      {vendor.phone}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase px-2.5 py-0.5 border rounded-full ${getStatusBadgeClass(vendor.status)}`}
                      >
                        {vendor.status.toLowerCase()}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        type="button"
                        className="border border-slate-200 hover:border-slate-800 text-slate-700 font-bold px-3 py-1.5 rounded-lg bg-white transition hover:bg-slate-50 text-[11px] inline-flex items-center gap-1.5"
                      >
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <Users size={16} />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        Add New Vendor
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Provision corporate supplier profiles
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 transition hover:bg-slate-50"
                  >
                    <X size={16} />
                  </button>
                </div>

                {errorMessage && (
                  <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs px-4 py-2.5 rounded-xl">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 tracking-wide block mb-1.5 uppercase">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="e.g. Infra Supplies Pvt Ltd"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                      value={vendorForm.companyName}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 tracking-wide block mb-1.5 uppercase">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      required
                      placeholder="e.g. Harshit"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                      value={vendorForm.contactPerson}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 tracking-wide block mb-1.5 uppercase">
                        Category
                      </label>
                      <select
                        name="category"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition appearance-none"
                        value={vendorForm.category}
                        onChange={handleFormChange}
                      >
                        <option value="Constructions">Constructions</option>
                        <option value="IT">IT Infrastructure</option>
                        <option value="logistics">Logistics & Freight</option>
                        <option value="Raw Materials">Raw Materials</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 tracking-wide block mb-1.5 uppercase">
                        GST Number
                      </label>
                      <input
                        type="text"
                        name="gstNumber"
                        required
                        placeholder="e.g. 27AABCS1429Bz0"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono tracking-wider text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                        value={vendorForm.gstNumber}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 tracking-wide block mb-1.5 uppercase">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Phone string sequence"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                        value={vendorForm.phone}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 tracking-wide block mb-1.5 uppercase">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="vendor@workspace.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition"
                        value={vendorForm.email}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 tracking-wide block mb-1.5 uppercase">
                      Operational Status
                    </label>
                    <select
                      name="status"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition appearance-none"
                      value={vendorForm.status}
                      onChange={handleFormChange}
                    >
                      <option value="ACTIVE">Active Deployment</option>
                      <option value="PENDING">Pending Evaluation</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 tracking-wide block mb-1.5 uppercase">
                      Corporate Office Address
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      placeholder="Physical operational storage warehouse string address location..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:bg-white transition resize-none"
                      value={vendorForm.address}
                      onChange={handleFormChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition text-xs shadow-md flex items-center justify-center gap-2 disabled:bg-slate-700 mt-2"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : (
                      "Save Supplier Record"
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
