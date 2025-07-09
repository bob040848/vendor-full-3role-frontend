"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = () => {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const [savedDataURL, setSavedDataURL] = useState<string | null>(null);

  const clear = () => {
    if (!sigCanvasRef.current) return;
    sigCanvasRef.current.clear();
    setSavedDataURL(null);
  };

  const save = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas || canvas.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }

    const dataURL = canvas.getTrimmedCanvas().toDataURL("image/png");
    setSavedDataURL(dataURL);
    console.log("Saved Signature Base64:", dataURL);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-gray-900 rounded-xl shadow-md text-white">
      <h2 className="text-xl font-bold text-orange-400">Sign Below</h2>

      <div className="bg-white rounded border border-gray-300">
        <SignatureCanvas
          ref={sigCanvasRef}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "signature-canvas",
          }}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={clear}
          className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition"
        >
          Clear
        </button>
        <button
          onClick={save}
          className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 transition"
        >
          Save
        </button>
      </div>

      {savedDataURL && (
        <div className="mt-4 text-center">
          <p className="text-white mb-2">Saved Signature:</p>
          <img
            src={savedDataURL}
            alt="Saved signature"
            className="border border-gray-400 rounded bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
