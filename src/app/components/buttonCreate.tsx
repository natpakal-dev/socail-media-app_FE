import React, { useState } from "react";

const buttonCreate = ({title, handleModal}: {title: string, handleModal: (modal: boolean) => void}) => {
  return (
    <button
      type="button"
      className="bg-[#4aa56a] text-white font-bold py-2 px-4 rounded-md text-sm cursor-pointer"
      onClick={() => handleModal(true)}
    >
      {title}
    </button>
  );
};

export default buttonCreate;
