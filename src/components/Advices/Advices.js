import React from "react";
import capsule from "../../global/images/capsule(1).png";
import checked from "../../global/images/checked.png";
import steth2 from "../../global/images/stethoscope.png";
import plaster from "../../global/images/checked.png";
import UseAxiosGet from "../../hooks/useAxiosGet";
import { API } from "../../data/config";

const Advices = () => {
  const { data } = UseAxiosGet(API.advice.ADVICE);

  return (
    <div className="pt-[85px] ">
      <div className="mb-[100px]">
        <img src={capsule} className="w-[500px] ml-20" alt="" />
        <div className="w-[277px] text-[var(--gray-color)] bg-[var(--p-color)] h-[114px] absolute top-[416px] left-[120px] rounded-lg">
          {data?.data.short_advices[0].content}
        </div>
        <div className="flex justify-between w-[500px] text-[var(--gray-color)] items-center absolute top-36 left-[57%]">
          <img src={checked} className="w-12" alt="" />
          <p className="w-[410px]">{data?.data.long_advices[0].content}</p>
        </div>
        <div className="flex justify-between w-[500px] text-[var(--gray-color)] items-center absolute top-[50%] left-[45%]">
          <img src={checked} className="w-12" alt="" />
          <p className="w-[410px]">{data?.data.long_advices[1].content}</p>
        </div>
        <div className="flex justify-between w-[500px] text-[var(--gray-color)] items-center absolute top-[73%] left-[57%]">
          <img src={checked} className="w-12" alt="" />
          <p className="w-[410px]">{data?.data.long_advices[2].content}</p>
        </div>
      </div>
      <div className="relative py-[100px] pl-16 text-[var(--gray-color)] bg-[var(--greenLigth-color)]">
        <img src={steth2} alt="" className="mb-5" />
        <p className="absolute top-[26%]  left-[108px] text-center w-[230px]">
          {data?.data.short_advices[1].content}
        </p>
        <div className="absolute w-[430px] top-[20%] left-[67%] flex justify-between items-start bg-[var(--p-color)] py-10 px-2 rounded-2xl h-[180px]">
          <img src={plaster} className="w-12" alt="" />
          <p className="w-[350px]">{data?.data.meduim_advices[0].content}</p>
        </div>
        <div className="absolute w-[430px] top-[20%] left-[32%] flex justify-between items-start bg-[var(--p-color)] py-10 px-2 rounded-2xl h-[180px]">
          <img src={plaster} className="w-12" alt="" />
          <p className="w-[350px]">{data?.data.meduim_advices[1].content}</p>
        </div>
        <div className="absolute w-[430px] top-[58%] left-[50%] flex justify-between items-start bg-[var(--p-color)] py-10 px-2 rounded-2xl h-[180px]">
          <img src={plaster} className="w-12" alt="" />
          <p className="w-[350px]">{data?.data.meduim_advices[2].content}</p>
        </div>
      </div>
      <div className="relative my-[40px] h-[100vh]">
        <img src={capsule} className="w-[500px] absolute right-11" alt="" />
        <div className="w-[277px] text-[var(--gray-color)] bg-[var(--p-color)] h-[100px] absolute top-[345px] right-[223px] rounded-lg">
          {data?.data.short_advices[2].content}
        </div>
        <div className="flex justify-between w-[500px] text-[var(--gray-color)] items-center absolute top-36 right-[57%]">
          <img src={checked} className="w-12" alt="" />
          <p className="w-[410px]">{data?.data.long_advices[3].content}</p>
        </div>
        <div className="flex justify-between w-[500px] text-[var(--gray-color)] items-center absolute top-[50%] right-[45%]">
          <img src={checked} className="w-12" alt="" />
          <p className="w-[410px]">{data?.data.long_advices[4].content}</p>
        </div>
        <div className="flex justify-between w-[500px] text-[var(--gray-color)] items-center absolute top-[73%] right-[57%]">
          <img src={checked} className="w-12" alt="" />
          <p className="w-[410px]">{data?.data.long_advices[5].content}</p>
        </div>
      </div>
      <div className="relative text-[var(--gray-color)] font-[Caprasimo] h-[60vh] bg-[var(--greenLigth-color)]">
        <p className="absolute top-20 left-10 text-4xl">Final thoughts: </p>
        <div className="absolute top-[43%] left-[3%] text-lg w-[520px] flex justify-between items-start opacity-[70%]">
          <div className="w-3 h-3 rounded-full bg-[var(--gray-color)] mt-2"></div>
          <p className="w-[460px]">
            Follow these recommendations to maintain your health and wellbeing.
            If you have any questions or concerns, don't hesitate to contact with 
            your healthcare provider.
          </p>
        </div>
        <div className="absolute top-[43%] left-[50%] text-lg w-[520px] flex justify-between items-start opacity-[70%]">
          <div className="w-3 h-3 rounded-full bg-[var(--gray-color)] mt-2"></div>
          <p className="w-[460px]">
            Remember to take care of your health by following these guidelines.
            By making small changes to your lifestyle, you can improve your
            overall wellbeing and reduce your risk of developing health
            problems.
          </p>
        </div>
      </div>
      <div className="w-full h-3 bg-[var(--gray-color)]"></div>
    </div>
  );
};

export default Advices;
