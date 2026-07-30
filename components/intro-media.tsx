"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

const INTRO_VIDEO = "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/gig/videos/ffa4dfe689dd2562e382970b13968ecb-1777372542974/I%20will%20build%20rebuild%20custom%20business%20website%20development_%20full%20stack%20website%20developer";

export function IntroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoMissing, setVideoMissing] = useState(false);
  const reduce = useReducedMotion();

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) await video.play(); else video.pause();
  };

  return (
    <motion.div initial={reduce ? false : { opacity: 0, scale: .94, rotateY: -8 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }} className="perspective relative mx-auto w-full max-w-[570px] lg:ml-auto">
      <div className="absolute -inset-5 border border-line/50" />
      <div className="absolute -right-5 -top-5 size-20 border-r border-t border-acid/60" />
      <div className="group relative aspect-[4/5] overflow-hidden border border-line bg-panel">
        <Image src="/hero2.png" alt="MD Nazmul Hasan, Backend Developer" fill sizes="(min-width: 1024px) 40vw, 90vw" priority className="object-cover object-[50%_35%] transition duration-700 group-hover:scale-[1.025]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-7">
          <div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-acid">Portrait / 2026</p><p className="mt-1 text-xl font-semibold">MD Nazmul Hasan</p></div>
          <button onClick={() => setPlaying(true)} disabled={videoMissing} className="focus-ring grid size-14 place-items-center rounded-full bg-acid text-ink transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Play introduction video"><Play size={18} fill="currentColor" className="ml-0.5"/></button>
        </div>
        <AnimatePresence>
          {playing && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 bg-black">
            <video ref={videoRef} src={INTRO_VIDEO} autoPlay playsInline muted={muted} preload="metadata" poster="/hero.png" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setVideoMissing(true); setPlaying(false); }} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent p-5 pt-16">
              <p className="font-mono text-[9px] uppercase tracking-wider text-white">A short introduction</p>
              <div className="flex gap-2"><button onClick={() => { setMuted(v => !v); if(videoRef.current) videoRef.current.muted=!muted; }} className="focus-ring grid size-11 place-items-center rounded-full bg-white/10 backdrop-blur" aria-label={muted ? "Unmute video" : "Mute video"}>{muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}</button><button onClick={toggle} className="focus-ring grid size-11 place-items-center rounded-full bg-white/10 backdrop-blur" aria-label="Pause video"><Pause size={16}/></button></div>
            </div>
          </motion.div>}
        </AnimatePresence>
      </div>
      <div className="absolute -bottom-5 left-5 border border-line bg-ink px-4 py-3 font-mono text-[9px] uppercase tracking-[.18em] text-muted"><span className="mr-2 inline-block size-1.5 rounded-full bg-acid" />Human behind the systems</div>
    </motion.div>
  );
}
