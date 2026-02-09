import React from 'react';
import { Users, Code2, Rocket } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-brand-graphite relative border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-white">Everything you need to ship</h2>
          <p className="text-brand-muted">We handle the matchmaking, you handle the code.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-3xl bg-brand-black border border-brand-border hover:border-brand-primary/40 transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-brand-primary/20">
              <Users className="text-brand-primary" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Find Teammates</h3>
            <p className="text-brand-muted leading-relaxed">
              Filter developers by tech stack, college, or skill level. Stop spamming Discord channels looking for help.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-3xl bg-brand-black border border-brand-border hover:border-brand-primary/40 transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-purple-500/20">
              <Code2 className="text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Showcase Work</h3>
            <p className="text-brand-muted leading-relaxed">
              Build a portfolio that matters. Verified contributions and project history help you stand out to recruiters.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-3xl bg-brand-black border border-brand-border hover:border-brand-primary/40 transition-all group hover:-translate-y-1 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-emerald-500/20">
              <Rocket className="text-emerald-400" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Launch Faster</h3>
            <p className="text-brand-muted leading-relaxed">
              From idea to MVP in record time. Manage requests, accept contributors, and keep your project moving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;