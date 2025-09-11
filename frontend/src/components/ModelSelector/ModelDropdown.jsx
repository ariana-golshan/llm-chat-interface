import { useRef, useEffect } from "react";

function ModelDropdown({
  models,
  selectedModel,
  setSelectedModel,
  open,
  setOpen,
  buttonRef,
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen, buttonRef]);

  if (!open) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-9 right-0 mt-2 w-[150px] text-center bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden  z-10"
      customStyle={{ background: "transparent", margin: 0 }}
    >
      <div className="overflow-y-auto h-40 scrollbar-thin">
        {models.map((model) => (
          <div
            key={model}
            onClick={() => {
              setSelectedModel(model);
              setOpen(false);
            }}
            className="p-2 m-1 rounded-lg hover:bg-gray-200 cursor-pointer duration-200"
          >
            {model}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelDropdown;
