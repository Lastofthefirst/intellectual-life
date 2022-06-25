import { useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { AudioPlayer } from '@/components/player/AudioPlayer'
import posterImage from '@/images/poster.jpg'

function random(length, min, max, seed = 1) {
  return Array.from({ length }).map(() => {
    let rand = Math.sin(seed++) * 10000
    rand = rand - Math.floor(rand)
    return Math.floor(rand * (max - min + 1) + min)
  })
}

function Waveform() {
  let id = useId()
  let barCount = 100
  let barWidth = 2
  let barGap = 2
  let lengths = random(barCount, 40, 100)

  return (
    <svg aria-hidden="true" className="absolute top-0 left-0 w-full h-20">
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="40%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
        <linearGradient id={`${id}-gradient`}>
          <stop offset="0%" stopColor="#4989E8" />
          <stop offset="50%" stopColor="#054f21" />
          <stop offset="100%" stopColor="#54FFA7" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${id}-pattern)`} />
        </mask>
        <pattern
          id={`${id}-pattern`}
          width={barCount * barWidth + barCount * barGap}
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          {Array.from({ length: barCount }).map((_, index) => (
            <rect
              key={index}
              width={barWidth}
              height={`${lengths[index]}%`}
              x={barGap * (index + 1) + barWidth * index}
              fill={`url(#${id}-fade)`}
            />
          ))}
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${id}-gradient)`}
        mask={`url(#${id}-mask)`}
        opacity="0.25"
      />
    </svg>
  )
}

function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
        <svg aria-hidden="true" className="h-2.5 w-2.5">
          <path
            d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z"
            className="fill-green-500"
          />
          <path
            d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z"
            className="fill-green-300"
          />
        </svg>
        <span className="ml-2.5">About</span>
      </h2>
      <p
        className={clsx('mt-2 text-base leading-7 text-slate-700', {
          'lg:line-clamp-4': !isExpanded,
        })}
      >
        In this talk at the 2016 ABS conference, Farzam Arbab explores the
        intellectual life of the Bahá’í community. The question of what will be its
        contribution to humanity and the advancement of civilization is
        raised. Three challenges in this regard are described. Then later three
        requirements for the development of the type of intelectuality we are seeking are
        offered.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="hidden mt-2 text-sm font-bold leading-6 text-green-600 hover:text-green-700 active:text-green-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}

export function Layout({ children }) {
  return (
    <>
      <div className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
        <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Talk given by</span>
          <span className="flex mt-6 font-bold text-slate-900">
            <span className="after:mt-6 after:text-slate-400 after:content-['/']">
              Farzam Arbab
            </span>
            <span className="mt-6">Association for Bahá’í Studies 2016</span>
          </span>
        </div>
        <div className="relative z-10 px-4 pt-10 pb-4 mx-auto sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:py-12 lg:px-8 xl:px-12">
          <Link href="/">
            <a
              className="block overflow-hidden relative mx-auto w-48 rounded-lg shadow-xl bg-slate-200 shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
              aria-label="Homepage"
            >
              <Image
                src={posterImage}
                unoptimized={true}
                alt=""
                layout="responsive"
                sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
                priority
              />
              <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
            </a>
          </Link>
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-xl font-bold text-slate-900">
              <Link href="/">
                <a>The Intellectual Life of the Bahá’í Community</a>
              </Link>
            </p>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
              Our contributions to the advancement of knowledge and civilization
              itself.
            </p>
          </div>
          <AboutSection className="hidden mt-12 lg:block" />
          <section className="mt-10 lg:mt-12">
            <h2 className="flex items-center font-mono text-sm font-medium leading-7 sr-only text-slate-900 lg:not-sr-only">
              <svg aria-hidden="true" className="h-2.5 w-2.5">
                <path
                  d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z"
                  className="fill-indigo-300"
                />
                <path
                  d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z"
                  className="fill-blue-300"
                />
              </svg>
              <span className="ml-2.5">Listen</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
            <ul className="flex justify-center mt-4 space-x-10 text-base font-medium leading-7 text-slate-700 sm:space-x-8 lg:block lg:space-x-0 lg:space-y-4">
              {/* <li className="flex">
                <Link href="/">
                  <a className="flex items-center group">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 fill-slate-400 group-hover:fill-slate-600"
                    >
                      <path d="M15.8 3a12.8 12.8 0 1 0 0 25.6 12.8 12.8 0 0 0 0-25.6Zm5.87 18.461a.8.8 0 0 1-1.097.266c-3.006-1.837-6.787-2.252-11.244-1.234a.796.796 0 1 1-.355-1.555c4.875-1.115 9.058-.635 12.432 1.427a.8.8 0 0 1 .265 1.096Zm1.565-3.485a.999.999 0 0 1-1.371.33c-3.44-2.116-8.685-2.728-12.755-1.493a1 1 0 0 1-.58-1.91c4.65-1.41 10.428-.726 14.378 1.7a1 1 0 0 1 .33 1.375l-.002-.002Zm.137-3.629c-4.127-2.45-10.933-2.675-14.871-1.478a1.196 1.196 0 1 1-.695-2.291c4.52-1.374 12.037-1.107 16.785 1.711a1.197 1.197 0 1 1-1.221 2.06" />
                    </svg>
                    <span className="sr-only sm:hidden">Spotify</span>
                    <span className="hidden sm:ml-3 sm:block">Spotify</span>
                  </a>
                </Link>
              </li>
              <li className="flex">
                <Link href="/">
                  <a className="flex items-center group">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 fill-slate-400 group-hover:fill-slate-600"
                    >
                      <path d="M27.528 24.8c-.232.592-.768 1.424-1.536 2.016-.44.336-.968.664-1.688.88-.768.232-1.72.304-2.904.304H10.6c-1.184 0-2.128-.08-2.904-.304a4.99 4.99 0 0 1-1.688-.88c-.76-.584-1.304-1.424-1.536-2.016C4.008 23.608 4 22.256 4 21.4V10.6c0-.856.008-2.208.472-3.4.232-.592.768-1.424 1.536-2.016.44-.336.968-.664 1.688-.88C8.472 4.08 9.416 4 10.6 4h10.8c1.184 0 2.128.08 2.904.304a4.99 4.99 0 0 1 1.688.88c.76.584 1.304 1.424 1.536 2.016C28 8.392 28 9.752 28 10.6v10.8c0 .856-.008 2.208-.472 3.4Z" />
                      <path
                        d="M18.056 18.488a1.069 1.069 0 0 0-.32-.688c-.36-.376-.992-.624-1.736-.624-.743 0-1.376.24-1.736.624-.183.2-.287.4-.32.688-.064.56-.024 1.04.04 1.816.065.736.184 1.72.336 2.712.112.712.2 1.096.28 1.368.136.448.625.832 1.4.832.776 0 1.273-.392 1.4-.832.08-.272.169-.656.28-1.368.152-1 .273-1.976.337-2.712.072-.776.104-1.256.04-1.816ZM17.968 14.408c0 1.088-.88 1.967-1.968 1.967a1.967 1.967 0 0 1-1.968-1.967c0-1.088.88-1.968 1.968-1.968s1.968.888 1.968 1.968Z"
                        className="fill-white"
                      />
                      <path
                        d="M15.976 6.656c-4.592.016-8.352 3.744-8.416 8.336-.048 3.72 2.328 6.904 5.648 8.072.08.032.16-.04.152-.12-.04-.288-.088-.576-.12-.864a.317.317 0 0 0-.168-.232 7.365 7.365 0 0 1-4.424-6.824c.04-4 3.304-7.256 7.296-7.288 4.088-.032 7.424 3.28 7.424 7.36 0 3.016-1.824 5.608-4.424 6.752a.272.272 0 0 0-.168.232l-.12.864c-.016.088.072.152.152.12a8.448 8.448 0 0 0 5.648-7.968c-.016-4.656-3.816-8.448-8.48-8.44Z"
                        className="fill-white"
                      />
                      <path
                        d="M15.784 9.456c-2.992.112-5.392 2.584-5.432 5.576a5.65 5.65 0 0 0 2.472 4.744c.072.048.176-.008.176-.096a7.853 7.853 0 0 1-.008-.968.326.326 0 0 0-.112-.272 4.574 4.574 0 0 1-1.448-3.456 4.585 4.585 0 0 1 4.392-4.448 4.574 4.574 0 0 1 4.752 4.568c0 1.312-.56 2.496-1.448 3.336a.381.381 0 0 0-.112.272c.016.312.008.616-.008.96-.008.088.096.152.176.096a5.661 5.661 0 0 0 2.472-4.672c.008-3.184-2.656-5.768-5.872-5.64Z"
                        className="fill-white"
                      />
                    </svg>
                    <span className="sr-only sm:hidden">Apple Podcast</span>
                    <span className="hidden sm:ml-3 sm:block">
                      Apple Podcast
                    </span>
                  </a>
                </Link>
              </li> */}
              <li className="flex">
                <Link
                  target={'_blank'}
                  href="https://github.com/Lastofthefirst/farzam/releases/download/publish/Farzam.zip"
                >
                  <a className="flex items-center group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 fill-slate-400 group-hover:fill-slate-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1.586l-.293-.293a1 1 0 10-1.414 1.414l2 2 .002.002a.997.997 0 001.41 0l.002-.002 2-2a1 1 0 00-1.414-1.414l-.293.293V9z"
                      />
                    </svg>
                    <span className="sr-only sm:hidden">Download Full</span>
                    <span className="hidden sm:ml-3 sm:block">
                      Download Full
                    </span>
                  </a>
                </Link>
              </li>
              <li className="flex">
                <Link href="https://raw.githubusercontent.com/Lastofthefirst/farzam/main/feed">
                  <a className="flex items-center group">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 fill-slate-400 group-hover:fill-slate-600"
                    >
                      <path d="M23.5 4h-15A4.5 4.5 0 0 0 4 8.5v15A4.5 4.5 0 0 0 8.5 28h15a4.5 4.5 0 0 0 4.5-4.5v-15A4.5 4.5 0 0 0 23.5 4Z" />
                      <path
                        d="M10 25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        className="fill-white"
                      />
                      <path
                        d="M7 16a9 9 0 0 1 9 9h3A12 12 0 0 0 7 13v3Z"
                        className="fill-white"
                      />
                      <path
                        d="M7 10a15 15 0 0 1 15 15h3A18 18 0 0 0 7 7v3Z"
                        className="fill-white"
                      />
                    </svg>
                    <span className="sr-only sm:hidden">RSS Feed</span>
                    <span className="hidden sm:ml-3 sm:block">RSS Feed</span>
                  </a>
                </Link>
              </li>
              <li className="flex">
                <Link
                  target="_blank"
                  href="https://yewtu.be/watch?v=By4IDyhjJ9Y"
                >
                  <a className="flex items-center group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 fill-slate-400 group-hover:fill-slate-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    <span className="sr-only sm:hidden">Video</span>
                    <span className="hidden sm:ml-3 sm:block">Video</span>
                  </a>
                </Link>
              </li>
              <li className="flex">
                <Link
                  target="_blank"
                  href="https://reflect.ridvan.org/farzam"
                >
                  <a className="flex items-center group">
                    <svg
                      className="w-6 h-6 fill-slate-400 group-hover:fill-slate-600"
                      style={{ width: '1.5rem' }}
                      fill="currentColor"
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.85"
                      >
                        <path d="m459.363 397.03s-12.208-1.866-7.36-16.016c4.472-13.051 13.633-26.685 29.437-29.204 44.098-7.028 50.712-12.431 78.748-30.58 20.605-13.339 33.412-16.229 38.871-34.609 4.344-14.624 75.257-46.043 62.751-35.649-18.616 15.471-3.752 67.238-59.051 103.036-29.829 19.31-75.721 27.259-111.666 30.485-30.69 2.754-31.73 12.537-31.73 12.537z" />
                        <path d="m231.408 189.7c-25.34-74.218 32.365-52.336 115.666-70.994 83.301-18.659 160.654-70.7925 185.993 3.426 25.34 74.219-21.647 149.511-104.948 168.169-20.882 4.677-42.01 17.395-62.427 14.611-61.034-8.323-115.297-59.598-134.284-115.212z" />
                        <g>
                          <path d="m196.478 787.83s40.576 189.167 252.505 99.9c89.284-37.607 151.159-155.227 180.712-304.379 46.002-232.169-119.028-311.991-119.028-311.991s180.33 63.668 160.769 313.625c-3.862 49.353-14.386 96.773-31.011 139.868-46.703 121.069-141.547 208.007-272.062 207.8-156.807-.249-171.885-144.823-171.885-144.823z" />
                          <path d="m436.063 656.162s-128.569 85.025 2.245 118.81c55.111 14.233 161.493-10.774 281.549-58.129 186.876-73.712 196.232-156.898 196.232-156.898s7.32 81.926-184.779 170.871c-37.929 17.562-76.441 32.256-113.583 43.353-104.346 31.174-197.885 33.95-237.348-7.873-47.413-50.248 55.684-110.134 55.684-110.134z" />
                          <path d="m444.216 535.321s-90.464 70.605 29.263 83.571c50.441 5.463 135.729-20.991 227.576-64.334 142.969-67.466 131.831-126.885 131.831-126.885s25.119 57.148-118.812 135.786c-28.42 15.527-57.997 29.08-87.23 39.984-82.126 30.632-161.539 40.348-204.938 14.138-52.141-31.491 22.31-82.26 22.31-82.26z" />
                          <path d="m396.333 411.625s-101.705 73.781 32.9 87.33c56.709 5.709 152.596-21.935 255.856-67.227 160.734-70.5 148.213-132.592 148.213-132.592s28.24 59.719-133.577 141.893c-31.951 16.225-65.203 30.388-98.069 41.782-92.332 32.01-181.613 42.163-230.405 14.774-58.62-32.907 25.082-85.96 25.082-85.96z" />
                        </g>
                        <path d="m301.159 277.36c-68.738-69.014-110.795-40.082-48.982-39.889 32.688.103 64.297 3.532 134.511 71.043 70.215 67.511 106.793 19.382 85.677 48.155s-119.325-27.22-171.206-79.309z" />
                        <path d="m310.557 145.439c-25.34-74.2189-19.002-49.2398 64.299-67.8983 83.301-18.6584 126.432-83.7293 151.771-9.5106 25.34 74.2189 8.495 135.8059-74.806 154.4649-20.881 4.677-42.009 17.395-62.427 14.61-61.033-8.323-59.85-36.052-78.837-91.666z" />
                        <path d="m519.197 162.308c-14.909-97.2639 14.493-3.223 31.713-27.471 15.425-21.721 33.054-21.682 38.643-26.143 16.621-13.2688 19.271-50.0122 22.862-61.6053 2.462-7.9491 5.268-4.2746 13.719 27.6997 21.816 82.5386 1.894 202.6026-26.124 224.9696-28.019 22.366-65.595-38.167-80.813-137.45z" />
                        <path d="m518.206 127c1.098-5.59 2.708-10.714 4.189-14.656 8.515-22.6671 23.087-21.5077 40.754-35.971 21.212-17.3657 54.997-49.536 57.555-21.5331 3.777 41.3515-5.028 63.4421-27.262 63.5831-7.204.046-33.32 37.67-50.276 33.664-5.143-1.215-8.352-8.749-13.224-13.791-5.875-6.08-12.747-6.156-11.736-11.296z" />
                        <path d="m196.532 476.74c-45.716-54.608-75.657-39.942-14.072-27.615 32.568 6.518 62.86 14.831 108.576 69.44 45.715 54.609 99.537 32.791 68.11 45.983-22.751 9.55-60.419 23.595-104.23-9.82-16.707-12.742-45.764-62.912-58.384-77.988z" />
                        <path d="m385.073 164.12c-50.85-75.6076 23.294-8.015 45.513-34.562 19.902-23.78 49.293-30.2288 57.416-36.0034 24.156-17.173 18.748-48.78 21.634-59.7654 1.979-7.5324 7.639-5.5007 30.272 18.049 58.426 60.7918 57.321 168.2138 16.601 197.1618-40.719 28.948-119.53-7.703-171.436-84.88z" />
                        <path d="m313.29 255.056c-50.68-48.752-84.66-32.974-78.54-40.721 6.119-7.748 20.075-36.366 70.756 12.386 50.68 48.752 112.065 46.44 105.946 54.187-6.12 7.748-47.481 22.9-98.162-25.852z" />
                        <path d="m273.092 311.851c-5.495 38.526 26.111 109.674-33.905 58.905-56.937-48.165-60.057-162.492 34.348-132.526 28.824 9.149 111.016 48.338 106.134 55.732-3.052 4.622-21.217-11.4-40.38-19.6-11.49-4.917-64.391 24.827-66.197 37.489z" />
                        <path d="m242.967 218.309c-23.407 24.209-30.091 82.169-56.051 12.598-18.937-50.75 62.357-72.22 79.883-52.601 17.527 19.619 107.077 103.639 97.612 107.362-5.917 2.328-53.747-46.807-75.186-56.863-5.672-2.661-13.847-6.566-21.872-9.416-10.164-3.609-20.087-5.526-24.386-1.08z" />
                        <path d="m459.846 64.1995c-13.773-69.87886 15.789-39.1101 57.847-38.5306s80.685-29.24976 94.459 40.6291c13.774 69.879-9.155 126.057-51.213 125.478-10.543-.146-21.112 6.674-31.511.113-31.085-19.613-59.26-75.327-69.582-127.6895z" />
                        <path d="m332.45 246.689c-68.966-85.562 37.366-11.618 75.565-45.219 34.217-30.098 80.867-40.391 94.3-47.991 39.948-22.605 59.746-68.8098 65.727-82.1539 4.102-9.1496-11.3 1.7972 20.765 27.844 82.771 67.2369 66.509 195.3159-.831 233.4199-67.339 38.104-185.128 1.437-255.526-85.9z" />
                        <path d="m642.22 144.924c-22.582-66.1432 7.122-70.7727-16.486-28.65-12.484 22.275-38.229 39.308-15.647 105.451 22.583 66.144-10.684 83.366 18.551 76.818 29.236-6.549 36.165-87.475 13.582-153.619z" />
                        <path d="m339.763 317.205c-35.285-42.817 38.962-6.498 87.847-25.38 43.79-16.913 90.679-22.653 106.113-26.918 45.9-12.685 57.609-33.635 68.633-41.145 7.559-5.15 14.558-4.058 32.981 10.657 47.559 37.986-20.672 110.124-98.043 131.506-77.372 21.382-156.634.908-197.531-48.72z" />
                        <path d="m306.182 210.951c1.216-6.333 3.931-12.507 6.664-17.404 15.714-28.166 54.784-35.911 97.316-61.371 51.067-30.568 161.381-110.1237 175.084-68.382 13.702 41.742-22.743 78.669-81.777 92.421-19.127 4.456-77.048 58.541-123.321 64.862-14.036 1.918-24.857-3.747-39.338-5.87-17.464-2.562-35.745 1.568-34.628-4.256z" />
                        <path d="m366.481 131.181c.337-5.065 1.651-9.928 3.065-13.759 8.131-22.0283 32.728-26.4192 58.306-44.9727 30.712-22.2767 78.419-73.53378 90.171-39.113 11.752 34.4207 8.581 54.7404-28.439 63.0326-11.995 2.6866-45.464 43.6561-74.796 46.5501-8.896.878-16.258-4.223-25.726-6.636-11.417-2.909-22.891-.446-22.581-5.102z" />
                        <path d="m460 397c-3.682 2.128.152-6.851 5-21 4.472-13.051 16.636-19.171 32.44-21.69 44.098-7.028 50.712-12.431 78.748-30.58 20.605-13.339 33.412-16.229 38.871-34.609 4.344-14.624 59.448-46.515 46.941-36.121-18.616 15.471 12.058 67.71-43.241 103.508-29.829 19.31-75.721 27.259-111.666 30.485-30.69 2.754-22.281-4.332-47.093 10.007z" />
                        <path d="m320.841 295.742c2.806-7.033 16.493-7.104 20.458-11.872 22.807-27.419 63.88-21.939 112.866-36.109 58.816-17.014 157.648-67.1 160.895-12.605 3.247 54.496-10.906 81.85-73.481 75.993-20.273-1.898-91.856 40.357-139.786 30.494-14.538-2.991-23.953-13.744-37.924-21.682-16.847-9.572-45.609-17.751-43.028-24.219z" />
                        <path d="m546.054 381.135s9.008-16.164 23.204-16.448c19.007-.381 22.492-2.964 36.571-11.151 10.348-6.017 15.992-6.621 20.899-16.837 3.904-8.128 29.944-19.697 29.944-19.697s-10.494 42.993-38.264 59.142c-14.98 8.711-34.853 9.476-49.98 8.333-12.916-.975-22.374-3.342-22.374-3.342z" />
                        <path d="m657.614 134.202c42.382-4.044 59.791 40.685 40.742-11.258-27.639-75.3645-116.1-82.4359-105.741-52.0934 6.799 19.9124 20.283 47.8784 5.507 99.6804-10.087 35.362 7.372 36.92 7.372 36.92s20.127-70.197 52.12-73.249z" />
                        <path d="m491.465 396.041s-4.099-15.031 19.535-29.041 47.288-12.245 75-27c6.502-3.462 11.143-5.816 14.622-7.684 11.351-6.094 10.339-7.013 21.226-24.338 19.152-30.478 36.652-36.978 36.652-36.978s-9.29 14.63 4 54.5c4.5 13.5-37.194 45.455-62 46.5s-39.5 36-53 26c-21.859-16.192-56.035-1.959-56.035-1.959z" />
                      </g>
                    </svg>

                    <span className="sr-only sm:hidden">Ridván</span>
                    <span className="hidden sm:ml-3 sm:block">Ridván</span>
                  </a>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
        <Waveform />
        <div className="relative">{children}</div>
      </div>
      <div className="py-10 pb-40 border-t border-slate-200 bg-slate-50 sm:py-16 sm:pb-32 lg:hidden">
        <div className="px-4 mx-auto sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          <h2 className="flex items-center mt-8 font-mono text-sm font-medium leading-7 text-slate-900">
            <svg
              aria-hidden="true"
              viewBox="0 0 11 12"
              className="w-auto h-3 fill-slate-300"
            >
              <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
            </svg>
            <span className="ml-2.5">Talk given by</span>
          </h2>
          <div className="flex mt-2 text-sm font-bold leading-7 text-slate-900">
            <span className="after:ml-6 after:text-slate-400 after:content-['/']">
              Farzam Arbab
            </span>
            <span className="ml-6">Association for Bahá’í Studies</span>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 right-0 bottom-0 z-10 rounded-lg lg:left-112 xl:left-120">
        <AudioPlayer />
      </div>
    </>
  )
}
