"use client";
import React, { useState } from "react";

function InterpolatedTermCalculator() {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState("");

  const parseSequence = (sequenceString) => {
    return sequenceString.split(",").map((str) => parseFloat(str.trim()));
  };

  const isArithmeticSequence = (sequenceArray) => {
    const differences = [];
    for (let i = 1; i < sequenceArray.length; i++) {
      differences.push(sequenceArray[i] - sequenceArray[i - 1]);
    }
    return differences.every((diff) => diff === differences[0]);
  };

  const isGeometricSequence = (sequenceArray) => {
    const ratios = [];
    for (let i = 1; i < sequenceArray.length; i++) {
      ratios.push(sequenceArray[i] / sequenceArray[i - 1]);
    }
    return ratios.every((ratio) => ratio === ratios[0]);
  };

  const isQuadraticSequence = (sequenceArray) => {
    const secondDifferences = [];
    for (let i = 1; i < sequenceArray.length - 1; i++) {
      secondDifferences.push(
        sequenceArray[i + 1] - 2 * sequenceArray[i] + sequenceArray[i - 1]
      );
    }
    return secondDifferences.every((diff) => diff === secondDifferences[0]);
  };

  const isCubicSequence = (sequenceArray) => {
    const cubicDifferences = [];
    for (let i = 1; i < sequenceArray.length - 2; i++) {
      cubicDifferences.push(
        sequenceArray[i + 2] -
          3 * sequenceArray[i + 1] +
          3 * sequenceArray[i] -
          sequenceArray[i - 1]
      );
    }
    return cubicDifferences.every((diff) => diff === cubicDifferences[0]);
  };

  const calculateArithmeticFormula = (sequenceArray) => {
    const commonDifference = sequenceArray[1] - sequenceArray[0];
    const firstTerm = sequenceArray[0];
    return `an = ${firstTerm} + (n - 1) * ${commonDifference}`;
  };

  const calculateGeometricFormula = (sequenceArray) => {
    const commonRatio = sequenceArray[1] / sequenceArray[0];
    const firstTerm = sequenceArray[0];
    return `an = ${firstTerm} * ${commonRatio}^(n - 1)`;
  };

  const calculateQuadraticFormula = (sequenceArray) => {
    const a =
      0.5 * (sequenceArray[2] - 2 * sequenceArray[1] + sequenceArray[0]);
    const b = sequenceArray[1] - sequenceArray[0] + a;
    const c = sequenceArray[0];
    return `an = ${a} * n^2 + ${b} * n + ${c}`;
  };

  const calculateCubicFormula = (sequenceArray) => {
    const a =
      sequenceArray[3] -
      3 * sequenceArray[2] +
      3 * sequenceArray[1] -
      sequenceArray[0];
    const b =
      sequenceArray[2] - 3 * sequenceArray[1] + 3 * sequenceArray[0] - a;
    const c = sequenceArray[1] - 3 * sequenceArray[0] + a;
    const d = sequenceArray[0];
    return `an = ${a} * n^3 + ${b} * n^2 + ${c} * n + ${d}`;
  };

  const calculateSequence = () => {
    const sequenceArray = parseSequence(sequence);

    if (sequenceArray.length < 2) {
      setResult("Sequence must have at least two terms.");
      return;
    }

    if (isArithmeticSequence(sequenceArray)) {
      setResult(
        `Arithmetic Sequence:\n${calculateArithmeticFormula(sequenceArray)}`
      );
    } else if (isGeometricSequence(sequenceArray)) {
      setResult(
        `Geometric Sequence:\n${calculateGeometricFormula(sequenceArray)}`
      );
    } else if (isQuadraticSequence(sequenceArray)) {
      setResult(
        `Quadratic Sequence:\n${calculateQuadraticFormula(sequenceArray)}`
      );
    } else if (isCubicSequence(sequenceArray)) {
      setResult(`Cubic Sequence:\n${calculateCubicFormula(sequenceArray)}`);
    } else {
      setResult("Sequence does not match known patterns.");
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-6 mt-44 bg-white rounded-lg shadow-md text-[#3c3c3c] ">
        <h2 className="text-2xl font-bold mb-4 text-[#3c3c3c]">
          حاسبة الحد العام للمتتاليات
        </h2>
        <div>
          <label className="block font-semibold mb-1"></label>
          <input
            type="text"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="اجد الحد العام"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
          />
        </div>
        <button
          onClick={calculateSequence}
          className="w-full bg-[#98FF98] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#c3c3c3] transition duration-300">
          احسب{" "}
        </button>
        <div className="mt-4 text-xl font-semibold">{result}</div>
        <div className="mt-4 text-sm font-semibold"></div>
        <pre className="mt-2 whitespace-pre-wrap">{steps}</pre>
      </div>
      <div className=" border-t-[0.01px] border-[#c3c3c3] items-center text-center mt-[200px]">
        <p className=" text-[#c3c3c3]">Yahya Mohammad El-Misrati</p>
      </div>
    </div>
  );
}

export default InterpolatedTermCalculator;
