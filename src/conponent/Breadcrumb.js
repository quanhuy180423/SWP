import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb-shop py-2">
      <div className="container mx-auto">
        <ol className="breadcrumb flex flex-wrap text-gray-700 justify-center m-3">
          {location.pathname !== "/" && (
            <>
              <li className="breadcrumb-item">
                <Link to="/" className="text-gray-500 hover:underline text-lg">
                  Trang chủ
                </Link>
                <meta itemProp="position" content="1" />
                {pathnames.length > 0 && <span className="mx-2"> / </span>}
              </li>
            </>
          )}
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return isLast ? (
              <li className="breadcrumb-item text-lg" key={to}>
                <span className="text-gray-500">
                  {decodeURIComponent(value)}
                </span>
                <meta itemProp="position" content={index + 2} />
              </li>
            ) : (
              <li className="breadcrumb-item" key={to}>
                <Link to={to} className="text-gray-500 hover:underline">
                  {decodeURIComponent(value)}
                </Link>
                <meta itemProp="position" content={index + 2} />
                <span className="mx-2"> / </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Breadcrumb;
