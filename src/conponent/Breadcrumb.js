import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className="breadcrumb-shop bg-gray-100 py-2">
      <div className="container mx-auto">
        <ol className="breadcrumb flex flex-wrap text-gray-700">
          <li className="breadcrumb-item">
            <Link to="/" className="text-blue-500 hover:underline">
              Trang chủ
            </Link>
            <meta itemProp="position" content="1" />
            {pathnames.length > 0 && <span className="mx-2"> &gt;&gt; </span>}
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return isLast ? (
              <li className="breadcrumb-item" key={to}>
                <span className="text-gray-500">{decodeURIComponent(value)}</span>
                <meta itemProp="position" content={index + 2} />
              </li>
            ) : (
              <li className="breadcrumb-item" key={to}>
                <span className="mx-2"> &gt;&gt; </span>
                <Link to={to} className="text-blue-500 hover:underline">
                  {decodeURIComponent(value)}
                </Link>
                <meta itemProp="position" content={index + 2} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Breadcrumb;
