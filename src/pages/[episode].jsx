import { useMemo } from 'react'
import Head from 'next/head'
import { parse } from 'rss-to-json'

import { useAudioPlayer } from '@/components/AudioProvider'
import { Container } from '@/components/Container'
import { PlayButton } from '@/components/player/PlayButton'

export default function Episode({ episode }) {
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
    <>
      <Head>
        <title>{episode.title} - Farzam Arbab</title>
        <meta name="description" content={episode.description} />
        <meta key="episode" name="twitter:image" content="/poster.jpg"></meta>
        <meta key="episode" name="image" property="og:image" content="/poster.jpg" />
      </Head>
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex gap-6 items-center">
              <PlayButton player={player} size="large" />
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {episode.title}
                </h1>
                <time
                  dateTime={date.toISOString()}
                  className="font-mono text-sm leading-7 -order-1 text-slate-500"
                >
                  {episode.description.split(" ")[0]}
                </time>
              </div>
            </div>
            <p className="mt-3 ml-24 text-lg font-medium leading-8 text-slate-700">
              {episode.description.split(" ").slice(1).join(" ")}
            </p>
          </header>
          <hr className="my-12 border-gray-200" />
          <div
            className="prose prose-slate mt-14 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2:nth-of-type(3n)]:before:bg-violet-200"
            dangerouslySetInnerHTML={{ __html: episode.content }}
          />
        </Container>
      </article>
    </>
  )
}

export async function getStaticProps({ params }) {
  let feed = await parse('https://raw.githubusercontent.com/Lastofthefirst/farzam/main/feed')
  let episode = feed.items
    .map(({ id, title, description, content, enclosures, published }) => ({
      id: id.toString(),
      title: `${id}: ${title}`,
      description,
      content,
      published,
      audio: enclosures.map((enclosure) => ({
        src: enclosure.url,
        type: enclosure.type,
      }))[0],
    }))
    .find(({ id }) => id === params.episode)

  if (!episode) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      episode,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  let feed = await parse('https://raw.githubusercontent.com/Lastofthefirst/farzam/main/feed')
  console.log(feed.items.map(el=>el.id))
  return {
    paths: feed.items.map(({ id }) => ({
      params: {
        episode: id.toString(),
      },
    })),
    fallback: 'blocking',
  }
}
