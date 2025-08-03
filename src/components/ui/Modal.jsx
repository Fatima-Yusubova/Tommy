// Modal.jsx
import { X } from "lucide-react";

const Modal = ({ open, setOpen, children }) => {
  return (
    <>
      <div
        className={`${
          open
            ? "absolute  z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[800px] bg-gradient-to-br from-white via-purple-50 to-indigo-50 block rounded-3xl p-8 shadow-2xl border border-purple-200 max-h-[600px] overflow-y-scroll"
            : "hidden"
        }`}
      >
        <div className="w-full flex justify-end mb-6">
          <button
            onClick={() => setOpen(false)}
            className="p-3 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 rounded-xl transition-all duration-200 shadow-lg"
          >
            <X />
          </button>
        </div>
        {children}
      </div>
      {open && (
        <div className="fixed z-10 inset-0 bg-black/50 backdrop-blur-sm"></div>
      )}
    </>
  );
};

export default Modal;