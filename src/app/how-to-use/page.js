"use client";

export default function HowToUsePage() {
  const steps = [
    {
      text: "Go to the Predict page.",
      link: "/predict",
      emoji: "🖼️",
    },
    {
      text: "Drag & drop an image into the upload box, or click to select one from your device.",
      emoji: "📂",
    },
    {
      text: "Wait a few seconds while Veritas processes your image.",
      emoji: "⏳",
    },
    {
      text: "The result will appear instantly, showing whether the face is detected as AI, Real, 2D, or 3D.",
      emoji: "🔍",
    },
    {
      text: "Use this classification to label, sort, or compare your visuals.",
      emoji: "🏷️",
    },
  ];

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* Content */}
      <main className="flex flex-col flex-1 px-6 py-12 items-center text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          How to Use Veritas
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed mb-12">
          Veritas is super simple! Upload an image and it will classify the face as{" "}
          <span className="font-semibold text-purple-600 dark:text-purple-400">AI</span>,{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">Real</span>,{" "}
          <span className="font-semibold text-yellow-500 dark:text-yellow-400">2D</span>, or{" "}
          <span className="font-semibold text-blue-500 dark:text-blue-400">3D</span>.
        </p>

        <div className="flex flex-col gap-6 w-full">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-2xl">{step.emoji}</div>
              <p className="text-left text-gray-800 dark:text-gray-200 text-base sm:text-lg">
                {step.link ? (
                  <>
                    Go to the{" "}
                    <a
                      href={step.link}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      Predict
                    </a>{" "}
                    page.
                  </>
                ) : (
                  step.text
                )}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-gray-600 dark:text-gray-400 text-lg sm:text-xl">
          That’s it! No setup, no confusion — just clear, instant results ✨
        </p>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} Veritas – Built with Next.js & PyTorch
      </footer>
    </div>
  );
}
