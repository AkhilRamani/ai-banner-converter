export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 mb-16">Designers are calling it their secret weapon.</h2>

        <div className="gap-8 mb-16">
          <div className="bg-neutral-50 rounded-3xl p-8">
            <p className="text-neutral-600 mb-6 italic">
              "This saved me hours of layout tweaking every campaign. The AI somehow gets design composition. It's scary good."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-neutral-600 font-semibold text-sm">JD</span>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Jane Designer</p>
                <p className="text-sm text-neutral-600">Senior Designer at TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
