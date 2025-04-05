import React from "react";

const Modal = ({
  showModal,
  setModal,
  handleSubmit
}: {
  showModal: boolean;
  setModal: (modal: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void
}) => {
  if (!showModal) return null;

  const handleSubmitPost =()=> {
    if (handleSubmit) {
      const formEvent = new Event('submit') as unknown as React.FormEvent;
      console.log('formEvent', formEvent);
      handleSubmit(formEvent);
    }
    setModal(false);
  }
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
        onClick={() => setModal(false)}
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start text-2xl font-semibold">
                Create Post
              </div>
              <div className="h-10 mt-3">
                <select className="h-auto focus:outline-none border border-[#9dccac] text-green-500 rounded-md text-xs px-2 py-2 font-semibold">
                  <option value="">Choose a Community</option>
                  <option value="music">Music</option>
                  <option value="foods">Foods</option>
                  <option value="technology">Technology</option>
                </select>
              </div>
              <div className="mt-3 border border-[#f1f1f1] px-2 py-1 rounded-md">
                <input
                  className="w-full focus:outline-none"
                  placeholder="Title"
                />
              </div>
              <div className="mt-3 relative border border-[#f1f1f1] px-2 py-1 rounded-md">
                <textarea
                  className="w-full focus:outline-none h-40"
                  placeholder="What's on your mind..."
                ></textarea>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto cursor-pointer"
                onClick={handleSubmitPost}
              >
                Post
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
