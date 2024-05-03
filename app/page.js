"use client";
import React, { useState } from "react";

function InterpolatedTermCalculator() {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState("");

  function findFormula(sequence) {
    const numbers = sequence.split(",").map(Number);
    const n = numbers.length;

    let steps = "";

    const differences = [];
    for (let i = 1; i < n; i++) {
      differences.push(numbers[i] - numbers[i - 1]);
    }

    steps += "Differences: " + differences.join(", ") + "\n\n";

    let formula = "";

    // Check for cubic sequence
    const isCubic = differences.every((val) => val === differences[0]);
    if (isCubic) {
      formula = `t(n) = ${differences[0] / 6}*n^3`;
    } else {
      // Check for polynomial sequences up to degree 3
      if (n >= 2) {
        const coefficients = [];
        for (let i = 1; i <= 3; i++) {
          const coeffs = [];
          for (let j = 0; j < i; j++) {
            coeffs.push(nCr(i - 1, j) * differences[i - 1 - j]);
          }
          coefficients.push(coeffs.reduce((acc, curr) => acc + curr, 0));
        }
        formula = "t(n) = ";
        for (let i = 3; i >= 0; i--) {
          if (coefficients[i] !== 0) {
            formula += `${coefficients[i]}*n^${i}`;
            if (i !== 0) formula += " + ";
          }
        }
      } else {
        // If none of the patterns fit, default to constant sequence
        formula = `t(n) = ${numbers[0]}`;
      }
    }

    return { formula, steps };
  }

  // Function to calculate binomial coefficient
  function nCr(n, r) {
    if (r > n) return 0;
    if (r === 0 || n === r) return 1;
    return nCr(n - 1, r - 1) + nCr(n - 1, r);
  }

  const handleCalculate = () => {
    if (!sequence) {
      setResult("Please enter a sequence.");
      setSteps("");
      return;
    }
    const { formula, steps } = findFormula(sequence);
    setResult(formula);
    setSteps(steps);
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-6 mt-44 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Interpolated Term Calculator
        </h2>
        <div>
          <label className="block font-semibold mb-1">Sequence:</label>
          <input
            type="text"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="Enter the sequence (e.g., 4,14,40,88,168)"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full bg-[#ff1500] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#c3c3c3] transition duration-300">
          Calculate
        </button>
        <div className="mt-4 text-xl font-semibold">{result}</div>
        <div className="mt-4 text-sm font-semibold">Steps:</div>
        <pre className="mt-2 whitespace-pre-wrap">{steps}</pre>
      </div>
      <div className=" border-t-[0.01px] border-[#c3c3c3] items-center text-center mt-[200px]">
        <p className=" text-[#c3c3c3]">Yahya Mohammad El-Misrati</p>
      </div>
    </div>
  );
}

export default InterpolatedTermCalculator;
