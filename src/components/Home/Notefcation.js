import React from "react";
import img from '../../global/images/arrangement-medical-still-life-elements.jpg'
import img2 from '../../global/images/arrangement-medical-still-life-elements.jpg'
import img3 from '../../global/images/arrangement-medical-still-life-elements.jpg'
import img4 from '../../global/images/arrangement-medical-still-life-elements.jpg'
import img5 from '../../global/images/arrangement-medical-still-life-elements.jpg'
import img6 from '../../global/images/arrangement-medical-still-life-elements.jpg'
import img7 from '../../global/images/arrangement-medical-still-life-elements.jpg'
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

const Notefcation = () => {
  const nav = useNavigate();
  const clickHandler = () => {
    nav("/Home");
  };
  const clickHandler2 = () => {
    console.log("dd");
    nav("/Profile");
  };
  const clickHandler3 = () => {
    nav("/Friends");
  };
  const clickHandler4 = () => {
    nav("/Messanger");
  };
  return (
    <div className="text-[#ffffff]">
     <div className="tablet:hidden"> <Navbar /></div>
      <div className="icone mb-2 mt-16 bg-slate-600 rounded-r-full rounded-l-full tablet:hidden flex justify-evenly items-center w-[100%]">
        <div className="flex justify-center p-2 items-center">
          <box-icon
            name="list-ul"
            color="black"
            style={{ cursor: "pointer" }}
          ></box-icon>
        </div>
        <box-icon
          name="user-circle"
          color="black"
          onClick={clickHandler2}
          style={{ cursor: "pointer" }}
        ></box-icon>
        <box-icon
          style={{ cursor: "pointer" }}
          name="bell"
          type="solid"
          color="#4755a6"
          animation="tada"
        ></box-icon>
        <box-icon
          type="logo"
          style={{ cursor: "pointer" }}
          color="black"
          name="messenger"
          onClick={clickHandler4}
        ></box-icon>
        <box-icon
          style={{ cursor: "pointer" }}
          name="tv"
          color="black"
        ></box-icon>
        <box-icon
          style={{ cursor: "pointer" }}
          name="group"
          onClick={clickHandler3}
          type="solid"
          color="black"
        ></box-icon>
        <box-icon
          style={{ cursor: "pointer" }}
          name="home"
          onClick={clickHandler}
          color="black"
        ></box-icon>
      </div>
      <div className="">
        <div className="flex mt-3 px-3 font-bold text-xl mb-2 justify-between items-center">
          <box-icon name="search-alt" color="#ffffff"></box-icon>
          <p>الإشعارات</p>
        </div>
        <p className="text-right mb-3 text-stone-400 px-3">جديدة</p>
        <div>
          <div className="bg-slate-600 px-3 rounded-lg flex justify-between flex-row-reverse mb-4 py-1 items-center">
            <img className="w-14 rounded-full" src={img} alt="" />
            <p dir="rtl" className="text-center text-sm w-[60%]">
              ردت Yara على تعليق لك على منشور ل Mohammad
            </p>
            <box-icon name="dots-horizontal-rounded" color="#ffffff"></box-icon>
          </div>
          <div className="flex justify-between bg-slate-600 px-3 rounded-lg flex-row-reverse py-1 mb-4 items-center">
            <img className="w-14 rounded-full" src={img2} alt="" />
            <p dir="rtl" className="text-center text-sm w-[60%]">
              أعجب Yahya Mustafa وعشرون اخرون بمنشورك "افعل ماشئت فأنت.....
            </p>
            <box-icon name="dots-horizontal-rounded" color="#ffffff"></box-icon>
          </div>
          <div className="flex justify-between flex-row-reverse bg-slate-600 px-3  rounded-lg py-1 mb-4 items-center">
            <img className="w-14 rounded-full" src={img3} alt="" />
            <p dir="rtl" className="text-center text-sm w-[60%]">
              تم التعليق بواسطة Naya Othman وثلاثون من الأشخاص الأخرون على منشور
              تتابعه في صفحتك Th.....
            </p>
            <box-icon name="dots-horizontal-rounded" color="#ffffff"></box-icon>
          </div>
          <div className="flex justify-between bg-slate-600 px-3 rounded-lg flex-row-reverse mb-4 py-1 items-center">
            <img className="w-14 rounded-full" src={img4} alt="" />
            <p dir="rtl" className="text-center text-sm w-[60%]">
              أعجبت سارة بتعليقك "منورة"
            </p>
            <box-icon name="dots-horizontal-rounded" color="#ffffff"></box-icon>
          </div>
          <p className="text-right px-3 mb-4 text-stone-400">الأقدم</p>
          <div className="flex justify-between px-3 rounded-lg flex-row-reverse py-1 mb-4 items-center">
            <img className="w-14 rounded-full" src={img5} alt="" />
            <p dir="rtl" className="text-center text-sm w-[60%]">
              تم قبول طلب الصداقة بواسطة Mazen Refaie
            </p>
            <box-icon name="dots-horizontal-rounded" color="#ffffff"></box-icon>
          </div>
          <div className="flex justify-between px-3 flex-row-reverse mb-4 items-center">
            <img className="w-14 rounded-full" src={img7} alt="" />
            <p dir="rtl" className="text-center text-sm w-[60%]">
              ردت Yara على تعليق لك على منشور ل Ahmad{" "}
            </p>
            <box-icon name="dots-horizontal-rounded" color="#ffffff"></box-icon>
          </div>
          <div className="flex justify-between px-3 flex-row-reverse mb-4 items-center">
            <img className="w-14 rounded-full" src={img6} alt="" />
            <p dir="rtl" className="text-center text-sm w-[60%]">
              اعجب Mohammad بتعليقك"....{" "}
            </p>
            <box-icon name="dots-horizontal-rounded" color="#ffffff"></box-icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notefcation;
