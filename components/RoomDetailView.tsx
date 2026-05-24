"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Users, AlertTriangle } from "lucide-react";
import Footer from "@/components/sections/Footer";
import { type RoomRead } from "@/lib/api";
import { type Room } from "@/data/rooms";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";

const gold = "rgba(212,168,67,0.9)";

interface DisplayRoom {
  name: string;
  type: string;
  description: string;
  story: string;
  price: number;
  maxGuests: number;
  isActive: boolean;
  image?: string;
  tagline?: string;
  amenities: string[];
}

interface Props {
  idParam: string;
  staticRoom: Room | null;
  liveRoom: RoomRead | null;
  error?: string;
}

export function RoomDetailView({ idParam, staticRoom, liveRoom, error }: Props) {
  const display: DisplayRoom = {
    name:        liveRoom?.name            ?? staticRoom?.name        ?? "",
    type:        liveRoom?.type            ?? staticRoom?.type        ?? "",
    description: liveRoom?.description     ?? staticRoom?.description ?? "",
    story:       liveRoom?.story           ?? staticRoom?.story       ?? "",
    price:       liveRoom?.price_per_night ?? staticRoom?.price       ?? 0,
    maxGuests:   liveRoom?.max_guests      ?? staticRoom?.maxGuests   ?? 2,
    isActive:    liveRoom?.is_active       ?? true,
    image:       staticRoom?.image,
    tagline:     staticRoom?.tagline,
    amenities:   staticRoom?.amenities ?? [],
  };

  const hasData = !!staticRoom;

  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(212,168,67,0.06) 0%, transparent 60%)" }} />

      <section className="relative pt-40 pb-16 px-6 md:px-12 lg:px-20">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group"
          style={{ color: "rgba(152,152,168,0.4)" }}
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to all rooms
        </Link>

        {!hasData && (
          <div className="max-w-md p-6 flex items-start gap-3" style={{ background: "rgba(220,80,80,0.06)", border: "1px solid rgba(220,80,80,0.2)" }}>
            <AlertTriangle size={18} style={{ color: "rgba(220,100,100,0.8)" }} />
            <div>
              <p className="text-sm mb-1" style={{ color: "rgba(245,235,200,0.85)" }}>Room not found</p>
              <p className="text-xs" style={{ color: "rgba(200,185,150,0.5)" }}>{error ?? "The requested room does not exist."}</p>
            </div>
          </div>
        )}

        {hasData && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
          >
            {/* Image */}
            <motion.div
              variants={staggerItem}
              className="relative overflow-hidden"
              style={{ height: "min(70vh, 640px)", border: "1px solid rgba(212,168,67,0.15)" }}
            >
              {display.image && (
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: `url('${display.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(8,8,6,0.5) 100%)" }} />
              {!display.isActive && (
                <div className="absolute top-4 left-4 px-3 py-1.5 text-xs tracking-widest uppercase" style={{ background: "rgba(220,80,80,0.15)", border: "1px solid rgba(220,80,80,0.3)", color: "rgba(220,100,100,0.9)" }}>
                  Unavailable
                </div>
              )}
            </motion.div>

            {/* Content */}
            <div>
              <motion.p variants={staggerItem} className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "rgba(212,168,67,0.6)" }}>
                {display.type}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="font-light leading-none mb-5"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #f5e8c0 0%, #c8a84b 40%, #f5e8c0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {display.name}
              </motion.h1>

              {display.tagline && (
                <motion.p variants={staggerItem} className="italic mb-8" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.4rem", color: gold }}>
                  &ldquo;{display.tagline}&rdquo;
                </motion.p>
              )}

              <motion.p variants={staggerItem} className="text-sm leading-relaxed mb-8" style={{ color: "rgba(200,185,150,0.6)" }}>
                {display.description}
              </motion.p>

              {display.story && (
                <motion.div variants={staggerItem} className="mb-8 p-6" style={{ background: "rgba(13,13,8,0.5)", border: "1px solid rgba(212,168,67,0.1)" }}>
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(212,168,67,0.5)" }}>The Story</p>
                  <p className="text-sm leading-relaxed italic" style={{ color: "rgba(200,185,150,0.7)", fontFamily: '"Cormorant Garamond", serif', fontSize: "1.1rem" }}>
                    {display.story}
                  </p>
                </motion.div>
              )}

              {display.amenities.length > 0 && (
                <motion.div variants={staggerItem} className="mb-8">
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.2)" }}>Amenities</p>
                  <div className="grid grid-cols-2 gap-2">
                    {display.amenities.map((a) => (
                      <div key={a} className="flex items-center gap-2 text-xs" style={{ color: "rgba(200,185,150,0.6)" }}>
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: gold }} />
                        {a}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                variants={staggerItem}
                className="flex items-center gap-8 mb-10 pb-8"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <Users size={16} style={{ color: gold }} />
                  <span className="text-sm" style={{ color: "rgba(200,185,150,0.7)" }}>Up to {display.maxGuests} guests</span>
                </div>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-end justify-between">
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>From</p>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "3rem", color: gold, lineHeight: 1, letterSpacing: "-0.02em" }}>
                    ${display.price.toLocaleString()}
                    <span className="text-sm ml-1" style={{ color: "rgba(200,185,150,0.4)" }}>/ night</span>
                  </p>
                </div>

                {display.isActive ? (
                  <Link href={`/booking?room=${idParam}`}>
                    <motion.button
                      className="px-8 py-4 text-xs tracking-widest uppercase"
                      style={{ background: gold, color: "#080806", border: "none" }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Reserve
                    </motion.button>
                  </Link>
                ) : (
                  <button disabled className="px-8 py-4 text-xs tracking-widest uppercase" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)", border: "none" }}>
                    Unavailable
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
