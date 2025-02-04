import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const PageHeader = ({ title, breadcrumbItems }) => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    if (breadcrumbItems) return breadcrumbItems;

    const paths = location.pathname.split("/").filter((path) => path);
    return paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      link: "/" + paths.slice(0, index + 1).join("/"),
    }));
  };

  return (
    <div className="bg-white shadow-sm w-full sticky top-0 z-50">
      <div className="flex flex-col gap-1 px-6 py-4">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800">
          {title || getBreadcrumbs().slice(-1)[0]?.label || "Dashboard"}
        </h1>

        {/* Breadcrumbs */}
        <div className="flex items-center text-sm">
          <Link to="/" className="text-gray-600 hover:text-theme-color">
            Home
          </Link>

          {getBreadcrumbs().map((item, index) => (
            <React.Fragment key={index}>
              <IoIosArrowForward className="mx-2 text-gray-400" />
              {index === getBreadcrumbs().length - 1 ? (
                <span className="text-theme-color font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.link}
                  className="text-gray-600 hover:text-theme-color"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
