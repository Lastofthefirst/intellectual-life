import { useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { parse } from 'rss-to-json'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import posterImage from '@/images/poster.jpg'

export default function Home({ episodes }) {
  return (
    <>
      <Head>
        <title>
          The Intellectual Life of the Bahá’í Community - Our contributions to
          the advancement of knowledge and civilization.
        </title>

        <meta
          name="description"
          content="A talk from Dr. Farzam Arbab about, our contributions to the advancement of knowledge and civilization."
        />
    
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Sections
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {episodes.map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </>
  )
}

function EpisodeEntry({ episode }) {
  let date = new Date(episode.published)

  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.id}`,
    }),
    [episode]
  )
  let player = useAudioPlayer(audioPlayerData)

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`episode-${episode.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={`/${episode.id}`}>
              <a>{episode.title}</a>
            </Link>
          </h2>
          <time
            dateTime={date.toISOString()}
            className="font-mono text-sm leading-7 -order-1 text-slate-500"
          >
            {episode.description.split(' ')[0]}
          </time>
          <p className="mt-1 text-base leading-7 text-slate-700">
            {episode.description.split(' ').slice(1).join(' ')}
          </p>
          <div className="flex gap-4 items-center mt-4">
            <button
              type="button"
              onClick={() => player.toggle()}
              className="flex items-center text-sm font-bold leading-6 text-green-600 hover:text-green-700 active:text-green-900"
            >
              <span className="sr-only">
                {player.playing ? 'Pause' : 'Play'}
                episode {episode.title}
              </span>
              <svg
                className="h-2.5 w-2.5 fill-current"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                {player.playing ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
                  />
                ) : (
                  <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
                )}
              </svg>

              <span className="ml-3" aria-hidden="true">
                Listen
              </span>
            </button>
            <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <Link href={`/${episode.id}`}>
              <a className="flex items-center text-sm font-bold leading-6 text-green-600 hover:text-green-700 active:text-green-900">
                Show notes
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </article>
  )
}

export async function getStaticProps() {
  const feed = await parse(
    'https://raw.githubusercontent.com/Lastofthefirst/farzam/main/feed'
  )

  return {
    props: {
      episodes: feed.items.map(
        ({ id, title, description, enclosures, published }) => ({
          id,
          title: `${id}: ${title}`,
          published,
          description,
          audio: enclosures.map((enclosure) => ({
            src: enclosure.url,
            type: enclosure.type,
          }))[0],
        })
      ),
    },
    revalidate: 10,
  }
}
