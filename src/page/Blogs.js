import React from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <>
      <div>
        <div>
          {/* <img
          src="./img/page_trang_suc.png"
          alt="img 1"
          className="article-img mb-5"
        /> */}
          <h1 className="text-4xl font-bold flex justify-center mb-4">
            Danh mục bài viết
          </h1>
          <div className="flex justify-center">
            <div className="flex justify-around">
              <div className="m-2">
                <Link to="/jewely">
                  <button className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black">
                    Tin tức - Blog
                  </button>
                </Link>
              </div>
              <div className="m-2">
                <Link to="/jewely">
                  <button className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black">
                    Bảng giá vàng
                  </button>
                </Link>
              </div>
              <div className="m-2">
                <Link to="/jewely">
                  <button className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black">
                    Trang sức vàng
                  </button>
                </Link>
              </div>
              <div className="m-2">
                <Link to="/jewely">
                  <button className="bg-white hover:bg-gray-200 text-black text-lg font-normal py-2 px-4 rounded border-2 border-black">
                    Góc chia sẽ
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <hr className="my-4 border-t-2 border-gray-300 w-10/12" />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="container px-10 p-4 gap-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 shadow-md col-span-2 w-9/10  rounded-xl">
                <Link to="/jewely">
                  <img
                    src="https://file.hstatic.net/200000567741/file/ef8ff8c8cd176d493406_4770826eb5734cd3ba1f34958e580cd6_grande.jpg"
                    alt="123"
                    className="object-cover w-full "
                  />
                  <p>{Date.apply()}</p>
                  <span className="text-gray-500 text-xl font-bold">Titel</span>
                  <p>Description</p>
                </Link>
              </div>
              <div className="bg-white p-4 shadow-md w-9/10  rounded-xl">
                <Link to="/jewely">
                  <img
                    src="https://file.hstatic.net/200000567741/file/ef8ff8c8cd176d493406_4770826eb5734cd3ba1f34958e580cd6_grande.jpg"
                    alt="123"
                    className="object-cover w-full h-5/6"
                  />
                  <p>{Date.apply()}</p>
                  <span className="text-gray-500 text-xl font-bold">Titel</span>
                  <p>Description</p>
                </Link>
              </div>
              <div className="bg-white p-4 shadow-md w-9/10  rounded-xl">
                <Link to="/jewely">
                  <img
                    src="https://file.hstatic.net/200000567741/file/ef8ff8c8cd176d493406_4770826eb5734cd3ba1f34958e580cd6_grande.jpg"
                    alt="123"
                    className="object-cover w-full "
                  />
                  <p>{Date.apply()}</p>
                  <span className="text-gray-500 text-xl font-bold">Titel</span>
                  <p>Description</p>
                </Link>
              </div>
              <div className="bg-white p-4 shadow-md w-9/10  rounded-xl">
                <Link to="/jewely">
                  <img
                    src="https://file.hstatic.net/200000567741/file/ef8ff8c8cd176d493406_4770826eb5734cd3ba1f34958e580cd6_grande.jpg"
                    alt="123"
                    className="object-cover w-full "
                  />
                  <p>{Date.apply()}</p>
                  <span className="text-gray-500 text-xl font-bold">Titel</span>
                  <p>Description</p>
                </Link>
              </div>
              <div className="bg-white p-4 shadow-md w-9/10  rounded-xl">
                <Link to="/jewely">
                  <img
                    src="https://file.hstatic.net/200000567741/file/ef8ff8c8cd176d493406_4770826eb5734cd3ba1f34958e580cd6_grande.jpg"
                    alt="123"
                    className="object-cover w-full "
                  />
                  <p>{Date.apply()}</p>
                  <span className="text-gray-500 text-xl font-bold">Titel</span>
                  <p>Description</p>
                </Link>
              </div>
              <div className="bg-white p-4 shadow-md">Box 4</div>
              <div className="bg-white p-4 shadow-md">Box 4</div>
              <div className="bg-white p-4 shadow-md">Box 4</div>
              <div className="bg-white p-4 shadow-md">Box 4</div>
              <div className="bg-white p-4 shadow-md">Box 4</div>
              <div className="bg-white p-4 shadow-md">Box 4</div>
              <div className="bg-white p-4 shadow-md">Box 4</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
