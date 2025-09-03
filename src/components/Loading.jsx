import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 p-5">
      <div className="flex flex-col items-center gap-4 bg-white/90 border border-white/60 backdrop-blur rounded-2xl px-8 py-10 shadow-2xl">
        <div className="relative">
          <div className="h-14 w-14 rounded-full border-4 border-white/80"></div>
          <div className="absolute inset-0 h-14 w-14 rounded-full border-4 border-t-transparent border-r-transparent border-b-indigo-500 border-l-purple-500 animate-spin"></div>
        </div>
        <div className="text-center">
          <h2 className="text-slate-800 font-semibold text-lg">Loading</h2>
          <p className="text-slate-500 text-sm">Please wait while we get things ready...</p>
        </div>
      </div>
    </div>
  )
}

export default Loading