import React from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  type?: "text" | "date" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  options = [],
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 bg-[#3d3d3d] text-white border-none rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full p-2 bg-[#3d3d3d] text-white rounded focus:ring-2 focus:ring-blue-500">
          <option value="">Select {label}</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className="w-full p-2 bg-[#3d3d3d] text-white border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default InputField;
