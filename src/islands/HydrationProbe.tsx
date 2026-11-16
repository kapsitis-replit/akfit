// Phase 1 scaffold check: proves React islands hydrate. Delete in Phase 2.
import { useState } from 'react';

export default function HydrationProbe() {
  const [count, setCount] = useState(0);
  return (
    <button
      type="button"
      data-testid="hydration-probe"
      onClick={() => setCount((c) => c + 1)}
      className="border border-zinc-700 px-4 py-2 font-mono text-xs uppercase tracking-widest"
    >
      React island clicks: {count}
    </button>
  );
}
