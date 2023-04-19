import React from "react";
const FormField = ({
  labelName,
  placeholder,
  type,
  name,
  register,
  errors,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
      </div>
      <input
        {...register(name, {
          required: "This is required",
          maxLength: {
            value: 30,
            message: "Max length 30",
          },
        })}
        type={type}
        placeholder={placeholder}
        className="bg-gray-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
      />
      <p className="text-red-600">{errors[name]?.message}</p>
    </div>
  );
};

export default FormField;
