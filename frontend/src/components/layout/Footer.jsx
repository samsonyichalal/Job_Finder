import React from "react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/60 py-4 px-6 text-center text-xs font-medium text-muted/60">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 max-w-7xl mx-auto">
        <span>© {new Date().getFullYear()} Career Compass. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-muted transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-muted transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
