"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { rooms as staticRooms } from "@/data/rooms";
import Footer from "@/components/sections/Footer";
import { staggerContainer, staggerItem, fadeUp } from "@/animations/variants";
import { rooms as apiRooms, type RoomRead } from "@/lib/api";
import { normalizeRoomName } from "@/lib/utils";

export default function RoomsPage() {
  const gold = "rgba(212,168,67,0.9)";
  const [apiData, setApiData] = useState<RoomRead[] | null>(null);

  useEffect(() => {
    apiRooms.list()
      .then((data) => setApiData(data))
      .catch(() => { /* silently fall back to static data */ });
  }, []);

  // Merge: API provides live price + active status, static provides image/rating/location
  const rooms = staticRooms
    .map((room) => {
      const live = apiData?.find((r) => normalizeRoomName(r.name) === normalizeRoomName(room.name));
      return {
        ...room,
        price:     live ? live.price_per_night : room.price,
        available: live ? live.is_active       : true,
        apiId:     live ? live.id              : null,
      };
    })
    .filter((r) => r.available);

  return (
    <div style={{ backgroundColor: "#050508", minHeight: "100vh" }}>
      {/* Page hero */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(212,168,67,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(180,110,50,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="relative w-full">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-10 group"
            style={{ color: "rgba(152,152,168,0.4)" }}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #8a600e, #d4a843)" }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: "rgba(212,168,67,0.6)" }}>
                Five Rooms. Five Stories.
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-light leading-none mb-6"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "clamp(3rem, 8vw, 8rem)",
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #f5e8c0 0%, #c8a84b 40%, #f5e8c0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Find the Room<br />That&apos;s Yours
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-sm leading-relaxed max-w-md"
              style={{ color: "rgba(200,185,150,0.55)" }}
            >
              Not every stay is the same. Browse our five rooms — each named
              for the experience it was built around.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Rooms grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-40">
        <div className="w-full">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                id={room.id}
                variants={staggerItem}
                className="group relative flex flex-col overflow-hidden rounded-lg"
                style={{
                  background: "rgba(13,13,20,0.5)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                {/* Image — clickable to detail page */}
                <Link href={`/rooms/${room.id}`}>
                  <div className="relative overflow-hidden" style={{ height: "280px" }}>
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url('${room.image}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </motion.div>
                  </div>
                </Link>

                {/* Card content */}
                <div className="flex flex-col p-5">
                  {/* Name + rating */}
                  <div className="flex items-start justify-between mb-2">
                    <Link href={`/rooms/${room.id}`} className="hover:opacity-80 transition-opacity">
                      <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                        {room.name}
                      </p>
                    </Link>
                    <div className="flex items-center gap-1">
                      <Star size={14} fill={gold} style={{ color: gold }} />
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{room.rating}</span>
                    </div>
                  </div>

                  {/* Location */}
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {room.location}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px mb-3" style={{ background: "rgba(255,255,255,0.08)" }} />

                  {/* Specs */}
                  <div className="flex items-center gap-3 text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                    <span>{room.beds}</span>
                    <span>·</span>
                    <span>{room.guests}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                        From
                      </p>
                      <p
                        className="font-light leading-none"
                        style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: "1.75rem",
                          color: gold,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        ${room.price.toLocaleString()}
                        <span className="text-xs ml-1" style={{ color: "rgba(200,185,150,0.4)" }}>
                          / night
                        </span>
                      </p>
                    </div>

                    <Link href={`/booking?room=${room.id}`} data-cursor="hover">
                      <motion.button
                        className="px-5 py-2.5 text-xs tracking-widest uppercase"
                        style={{
                          background: "rgba(212,168,67,0.1)",
                          color: gold,
                          border: "1px solid rgba(212,168,67,0.3)",
                        }}
                        whileHover={{ background: "rgba(212,168,67,0.2)", scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        Reserve
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
