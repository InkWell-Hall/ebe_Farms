import React from "react";

const Sizes = () => {
  return (
    <div>
      <div>
        <label className="block font-semibold mb-1">Sizes</label>
        <div className="flex gap-2 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() =>
                setSize((prev) =>
                  prev.includes(s)
                    ? prev.filter((sz) => sz !== s)
                    : [...prev, s]
                )
              }
              className={`px-4 py-1 rounded border ${
                size.includes(s)
                  ? "bg-[#0F123F] text-white"
                  : "bg-white text-black border-gray-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sizes;
