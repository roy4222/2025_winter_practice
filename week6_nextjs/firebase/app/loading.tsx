"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen flex items-center justify-center bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-md z-[9999]">
      <div className="flex flex-col items-center justify-center">
        <div className="text-blue-500 dark:text-blue-400 transform scale-150">
          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"><animate id="IconifyId196993f3629b221f1147" fill="freeze" attributeName="x" begin="0;IconifyId196993f3629b221f1158.end" dur="0.2s" values="1;13"/><animate id="IconifyId196993f3629b221f1148" fill="freeze" attributeName="y" begin="IconifyId196993f3629b221f1155.end" dur="0.2s" values="1;13"/><animate id="IconifyId196993f3629b221f1149" fill="freeze" attributeName="x" begin="IconifyId196993f3629b221f1156.end" dur="0.2s" values="13;1"/><animate id="IconifyId196993f3629b221f1150" fill="freeze" attributeName="y" begin="IconifyId196993f3629b221f1157.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"><animate id="IconifyId196993f3629b221f1151" fill="freeze" attributeName="y" begin="IconifyId196993f3629b221f1147.end" dur="0.2s" values="13;1"/><animate id="IconifyId196993f3629b221f1152" fill="freeze" attributeName="x" begin="IconifyId196993f3629b221f1148.end" dur="0.2s" values="1;13"/><animate id="IconifyId196993f3629b221f1153" fill="freeze" attributeName="y" begin="IconifyId196993f3629b221f1149.end" dur="0.2s" values="1;13"/><animate id="IconifyId196993f3629b221f1154" fill="freeze" attributeName="x" begin="IconifyId196993f3629b221f1150.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1"><animate id="IconifyId196993f3629b221f1155" fill="freeze" attributeName="x" begin="IconifyId196993f3629b221f1151.end" dur="0.2s" values="13;1"/><animate id="IconifyId196993f3629b221f1156" fill="freeze" attributeName="y" begin="IconifyId196993f3629b221f1152.end" dur="0.2s" values="13;1"/><animate id="IconifyId196993f3629b221f1157" fill="freeze" attributeName="x" begin="IconifyId196993f3629b221f1153.end" dur="0.2s" values="1;13"/><animate id="IconifyId196993f3629b221f1158" fill="freeze" attributeName="y" begin="IconifyId196993f3629b221f1154.end" dur="0.2s" values="1;13"/></rect></svg>
        </div>
        <p className="mt-6 text-xl font-medium text-gray-700 dark:text-gray-300">載入中...</p>
      </div>
    </div>
  );
} 