"use client";

import { Component, ReactNode } from "react";
import Link from "next/link";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return this.props.fallback ?? (
        <div
          className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
          style={{ backgroundColor: "#050508" }}
        >
          <div
            className="max-w-md w-full p-8"
            style={{ background: "rgba(220,80,80,0.06)", border: "1px solid rgba(220,80,80,0.2)" }}
          >
            <p
              className="font-light mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "2rem", color: "rgba(245,235,200,0.8)" }}
            >
              Something went wrong
            </p>
            <p className="text-xs mb-6" style={{ color: "rgba(200,185,150,0.4)" }}>
              {this.state.error.message}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 text-xs tracking-widest uppercase"
              style={{ border: "1px solid rgba(212,168,67,0.3)", color: "rgba(212,168,67,0.7)" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
