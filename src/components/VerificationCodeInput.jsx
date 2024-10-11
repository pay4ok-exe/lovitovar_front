import React, { useState, useRef } from "react";

const VerificationCodeInput = ({ onCompleted }) => {
  const [code, setCode] = useState(new Array(4).fill("")); // Hold individual digits in an array
  const inputs = useRef([]);

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return; // Allow only numbers

    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);

    // Auto-focus to next input field after a number is typed
    if (slot < 3 && num) {
      inputs.current[slot + 1].focus();
    }

    // If all slots are filled
    if (newCode.every((item) => item !== "")) {
      onCompleted(newCode.join("")); // Pass the completed code to parent component
    }
  };

  const handleBackspace = (e, slot) => {
    if (e.key === "Backspace" && !code[slot] && slot > 0) {
      // Focus to previous input field when backspacing from an empty field
      inputs.current[slot - 1].focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {code.map((num, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric" // to ensure mobile keyboards are optimized for numeric input
          maxLength="1"
          value={num}
          ref={(ref) => (inputs.current[idx] = ref)}
          onChange={(e) => processInput(e, idx)}
          onKeyDown={(e) => handleBackspace(e, idx)}
          className="w-12 h-12 text-center text-xl border rounded focus:border-indigo-500 focus:outline-none"
          autoFocus={!code[0] && idx === 0} // Auto-focus the first input
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
