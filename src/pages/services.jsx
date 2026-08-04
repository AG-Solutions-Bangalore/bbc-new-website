import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MapPinIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,

  GlobeAltIcon,
  ShareIcon,
  XMarkIcon,

} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout/footer";
import PartnerCardSkeleton from "@/widgets/cards/partner-card-skeleton";
import { fetchUsers, getUserImageUrl } from "@/lib/api";

const INITIAL_VISIBLE_PARTNERS = 12;
const PARTNER_BATCH_SIZE = 16;

const PartnerCard = memo(function PartnerCard({ partner, openDialog }) {
  const shareText = encodeURIComponent(
    [partner.name, partner.mobile, partner.company, partner.occupation]
      .filter(Boolean)
      .join(" ")
  );

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="flex p-4">
          <div className="mr-3 flex-shrink-0">
            <img
              src={getUserImageUrl(partner.image)}
              alt={partner.name}
              width="64"
              height="112"
              loading="lazy"
              decoding="async"
              className="h-[7rem] w-[4rem] rounded-lg object-cover border-2 border-gray-200"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {partner.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {partner.occupation || partner.category || "Professional"}
            </p>

            {/* <p className="text-[13px]  text-indigo-600 line-clamp-2">
  {partner.product || "Product/Services"}
</p> */}
            <span className="px-2 py-1 text-[13px] font-medium text-indigo-500 bg-indigo-50 rounded-md line-clamp-2">
              {partner.product || "Product/Services"}
            </span>

            <p className="mt-1 flex items-center text-xs text-gray-500">
              <MapPinIcon className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{partner.area || "Location"}</span>
            </p>
          </div>
        </div>

        <div className="mt-auto border-t border-gray-100">
          <div className="flex">
            {partner.details_view === 1 ? (
              <a
                href={`/business-profile/${partner.company_short}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => localStorage.setItem("short", partner.company_short)}
                className="flex-1 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors border-r border-gray-100 text-center"
              >
                View Profile
              </a>
            ) : (
              <button
                className="flex-1 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors border-r border-gray-100"
                onClick={() => openDialog(partner)}
              >
                View Profile
              </button>
            )}


            <a
              aria-label={`Share ${partner.name} profile on WhatsApp`}
              className="flex items-center justify-center px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 transition-colors"
              href={`https://api.whatsapp.com/send/?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShareIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});


const PartnerProfileDialog = memo(function PartnerProfileDialog({ open, handleClose, partner }) {

  if (!partner || !open) return null;

  const shareText = encodeURIComponent(
    [partner.name, partner.mobile, partner.company, partner.occupation]
      .filter(Boolean)
      .join(" ")
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 md:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl max-h-full md:max-h-[90vh] md:rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">{partner.name}</h2>
              <p className="text-xs text-gray-500">{partner.occupation || partner.category || ""}</p>
            </div>
          </div>

          <button
            aria-label="Close partner profile"
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            onClick={handleClose}
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Summary card */}
            <div className="flex flex-row w-full">
            <div className="h-[12rem] w-36 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 mr-3">
              <img
                src={getUserImageUrl(partner.image)}
                alt={partner.name}
                width="144"
                height="192"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-blue-50 rounded-xl w-full p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{partner.company}</h3>
              {partner.product && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Products & Services</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700">{partner.product}</p>
                  </div>
                </div>
              )}
            </div>
            </div>


            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Phone */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-3">
                    <PhoneIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium">{partner.mobile || "N/A"}</p>
                  </div>
                </div>

                {/* Email */}
                {partner.email && (
                  <div className="bg-gray-50 rounded-xl p-4 flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-3">
                      <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium break-all">{partner.email}</p>
                    </div>
                  </div>
                )}

                {/* Location */}
                {partner.area && (
                  <div className="bg-gray-50 rounded-xl p-4 flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-3">
                      <GlobeAltIcon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium break-all">{partner.area}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-3 flex justify-between items-center bg-gray-50">
          <button
            className="text-gray-600 text-sm hover:text-gray-900"
            onClick={handleClose}
          >
            Close
          </button>
          <a
            aria-label={`Share ${partner.name} profile on WhatsApp`}
            href={`https://api.whatsapp.com/send/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
            >
              <ShareIcon className="h-4 w-4 mr-2" /> Share Profile
            </button>
          </a>
        </div>
      </div>
    </div>
  );
});
export function Services() {
  const [partners, setPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [sortKey, setSortKey] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_PARTNERS);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPartners = async () => {
      try {
        const users = await fetchUsers();
        if (isMounted) setPartners(users);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPartners();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPartners = useMemo(() => {
    if (searchQuery.trim() === "") {
      return partners;
    }

    const query = searchQuery.toLowerCase();
    return partners.filter(partner => {
      const searchableFields = [
        partner.name,
        partner.occupation,
        partner.category,
        partner.company,
        partner.area,
        partner.profile_mix
      ].filter(Boolean);

      return searchableFields.some(field =>
        String(field).toLowerCase().includes(query)
      );
    });
  }, [searchQuery, partners]);

  const sortedPartners = useMemo(() => {
    if (!sortKey) return filteredPartners;

    return [...filteredPartners].sort((a, b) => {
      if (sortKey === "company") {
        const companyA = a.company || "";
        const companyB = b.company || "";
        return companyA.localeCompare(companyB);
      }

      return (a.name || "").localeCompare(b.name || "");
    });
  }, [filteredPartners, sortKey]);

  const visiblePartners = useMemo(
    () => sortedPartners.slice(0, visibleCount),
    [sortedPartners, visibleCount]
  );

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_PARTNERS);
  }, [partners.length, searchQuery, sortKey]);

  useEffect(() => {
    if (loading || visibleCount >= sortedPartners.length) return undefined;

    const node = loadMoreRef.current;
    if (!node || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) =>
            Math.min(count + PARTNER_BATCH_SIZE, sortedPartners.length)
          );
        }
      },
      { rootMargin: "800px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [loading, sortedPartners.length, visibleCount]);

  const sortPartnersByName = useCallback(() => {
    setSortKey("name");
  }, []);

  const sortPartnersByCompany = useCallback(() => {
    setSortKey("company");
  }, []);

  const handleOpenDialog = useCallback((partner) => {
    setSelectedPartner(partner);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedPartner(null);
  }, []);
  const PartnersSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array(12).fill(0).map((_, index) => (
        <PartnerCardSkeleton key={index} />
      ))}
    </div>
  );

  return (
    <>
      <section className="relative block h-[25vh]  bg-white mt-4 md:mt-8">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
          <h1 className="block antialiased tracking-normal font-sans leading-tight text-center font-bold text-4xl  mt-10 md:mt-0 text-gray-700">
            Our Awesome Partners
          </h1>
        </div>
      </section>



      <section className="relative bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="relative mb-8 -mt-16 flex w-full min-w-0 flex-col break-words bg-white rounded-lg shadow px-5 py-4">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="relative flex-1 w-full">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search partners by name, occupation, company or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="w-full sm:w-auto px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300">
                Search
              </button>
            </div>
          </div>

          <div className="mt-8">
            {loading ? (
               <PartnersSkeleton />
            ) : sortedPartners.length === 0 ? (
              <div className="flex justify-center items-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-700">No partners found matching your search.</p>
              </div>
            ) : (
              <>
                <div className="mb-5 flex justify-end items-center">
                  <div className="flex gap-2">
                    <button onClick={sortPartnersByName}
                      className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors">
                      Sort by Name
                    </button>
                    <button onClick={sortPartnersByCompany}
                      className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors">
                      Sort by Company
                    </button>

                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {visiblePartners.map((partner) => (
                    <PartnerCard
                      key={partner.id}
                      partner={partner}
                      openDialog={handleOpenDialog}
                    />
                  ))}
                </div>
                {visibleCount < sortedPartners.length && (
                  <div ref={loadMoreRef} aria-hidden="true" className="h-px" />
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <PartnerProfileDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        partner={selectedPartner}
      />

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Services;
