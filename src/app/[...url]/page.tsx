import { ragChat } from '@/lib/rag-chat'
import { redis } from '@/lib/redis'

interface Props {
  params: {
    url: string | string[] | undefined
  }
}

const remodelUrl = ({ url }: { url: string[] }) => {
  const decodedUrl = url.map(part => decodeURIComponent(part))

  return decodedUrl.join('//')
}

const Page = async ({ params }: Props) => {
  console.log(params)
  const remodeledUrl = remodelUrl({ url: params.url as string[] })
  const isIndexed = await redis.sismember('indexed-urls', remodeledUrl)

  if (!isIndexed) {
    await ragChat.context.add({
      type: 'html',
      source: remodeledUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    })

    await redis.sadd('indexed-urls', remodeledUrl)
  }

  return <>page</>
}

export default Page
