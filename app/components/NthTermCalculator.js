// GeneralTermCalculator.js
import { useState } from "react";

function GeneralTermCalculator() {
  const [formula, setFormula] = useState("");
  const [n, setN] = useState("");
  const [result, setResult] = useState("");

  const calculateTerm = () => {
    try {
      // Evaluate the formula with the value of n
      const term = eval(formula.replace(/n/g, n));
      setResult(`The ${n}th term is: ${term}`);
    } catch (error) {
      setResult("Error: Invalid formula or value of n");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">General Term Calculator</h2>
      <div>
        <label className="block font-semibold mb-1">Formula:</label>
        <input
          type="text"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          placeholder="Enter the formula (e.g., 2 * n + 1)"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Value of n:</label>
        <input
          type="number"
          value={n}
          onChange={(e) => setN(e.target.value)}
          placeholder="Enter the value of n"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
      </div>
      <button
        onClick={calculateTerm}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
        Calculate
      </button>
      <div className="mt-4 text-xl font-semibold">{result}</div>
    </div>
  );
}

export default GeneralTermCalculator;
