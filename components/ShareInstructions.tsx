"use client";
import React, { useState } from "react";

const ShareInstructions = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="my-4">
      <button
        onClick={() => setShowHelp(!showHelp)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showHelp ? "Hide Instructions" : "How to Share?"}
      </button>

      {showHelp && (
        <div className="mt-4 p-4 bg-gray-100 rounded border border-gray-300 text-sm leading-6 space-y-2">
          <h2 className="text-lg font-semibold">📤 How to Share Your PicSpace:</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Go to your Dashboard.</li>
            <li>Tap the space you want to add a member to.</li>
            <li>
              Haven’t created a space yet? Tap the <strong>“Create PicSpace”</strong> button in the top navbar.
              On mobile, open the menu by tapping the three lines (<span className="font-mono">☰</span>), then select “Create PicSpace.”
            </li>
            <li>After selecting a space, a card will appear showing its details.</li>
            <li>In this card, you’ll find the PicSpace ID and Invite Code — copy both.</li>
            <li>Share them with the person you want to add to your space.</li>
          </ol>
          <p className="text-red-600 font-medium">
            ⚠️ Anyone with your Invite Code can join — share it only with people you trust.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShareInstructions;
