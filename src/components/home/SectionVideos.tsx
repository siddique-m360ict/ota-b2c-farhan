"use client"

import Image from "next/image"
import React, { FC, useState } from "react"
import { Icons } from "../icons"
import NcPlayIcon from "./elements/NcPlayIcon"
import NcPlayIcon2 from "./elements/NcPlayIcon2"

export interface VideoType {
  id: string
  title: string
  thumbnail: string
}

export interface SectionVideosProps {
  videos?: VideoType[]
  className?: string
}

const VIDEOS_DEMO: VideoType[] = [
  {
    id: "y0lJ_Hywk_4",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/131423/pexels-photo-131423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "ZCNxVp45AkA",
    title:
      "Why not visit Bangladesh? Are you still waiting? Buy the tickets and Visit Beautiful Bangladesh!!!",
    thumbnail: "/images/home/videos/thumb2.jpg",
  },
  {
    id: "H5ZDvi2M4WU",
    title:
      "Why not visit Bangladesh?Are you still waiting? Buy the tickets and Visit Beautiful Bangladesh!!!",
    thumbnail:
      "https://images.pexels.com/photos/1660995/pexels-photo-1660995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "eEaZvEZye84",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/4983184/pexels-photo-4983184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "EuDJZDaSP0Q",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
]

const SectionVideos: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = "",
}) => {
  const [isPlay, setIsPlay] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo]
    return (
      <div
        className="group h-[30vh] w-full overflow-hidden rounded-3xl border-4 border-white bg-neutral-800 will-change-transform dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] md:h-full"
        title={video.title}
      >
        {isPlay ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          ></iframe>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center"
            >
              <NcPlayIcon />
            </div>

            <Image
              fill
              className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105 "
              src={video.thumbnail}
              title={video.title}
              alt={video.title}
              sizes="(max-width: 1000px) 100vw,
                (max-width: 1200px) 75vw,
                50vw"
            />
          </>
        )}
      </div>
    )
  }

  const renderSubVideo = (video: VideoType, index: number) => {
    if (index === currentVideo) return null
    return (
      <div
        className="group relative h-20 w-full cursor-pointer overflow-hidden rounded-xl md:h-28 md:rounded-2xl"
        onClick={() => {
          setCurrentVideo(index)
          !isPlay && setIsPlay(true)
        }}
        title={video.title}
        key={String(index)}
      >
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <NcPlayIcon2 />
        </div>
        <Image
          fill
          className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110 "
          src={video.thumbnail}
          title={video.title}
          alt={video.title}
          sizes="(max-width: 300px) 100vw,
          (max-width: 1200px) 50vw,
          25vw"
        />
      </div>
    )
  }

  return (
    <div className={`mb-20 mt-10 ${className}`}>
      <div className="mx-3 md:mx-0">
        <h1 className="text-3xl font-semibold md:text-4xl">🎬 The Videos</h1>
        <span className="mt-2 block text-base font-normal text-neutral-500 dark:text-neutral-400 sm:text-lg md:mt-3">
          Check out our hottest videos. View more and share more new{" "}
          <br className="hidden md:block" />
          perspectives on just about any topic. Everyone’s welcome.
        </span>
      </div>

      <div className="relative flex flex-col py-4 sm:py-4 sm:pr-4  md:py-6 md:pr-6 lg:flex-row xl:py-14 xl:pr-14">
        <div className="absolute -bottom-4 -right-4 -top-4 z-0 w-2/3 rounded-3xl bg-[#ecf1ff] dark:bg-neutral-800 dark:bg-opacity-40 sm:rounded-[50px] md:bottom-0 md:right-0 md:top-0 xl:w-1/2"></div>
        <div className="relative flex-grow pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
          {renderMainVideo()}
        </div>
        <div className="grid flex-shrink-0 grid-cols-4 gap-2 sm:gap-6 lg:w-36 lg:grid-cols-1 xl:w-40">
          {videos.map(renderSubVideo)}
        </div>
      </div>
    </div>
  )
}

export default SectionVideos
