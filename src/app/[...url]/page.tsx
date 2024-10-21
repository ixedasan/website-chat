import { cookies } from 'next/headers'

import { ragChat } from '@/lib/rag-chat'
import { redis } from '@/lib/redis'
import Chat from '@/components/Chat'

type Props = {
  params: {
    url: string | string[] | undefined
  }
}

const parseUrl = ({ url }: { url: string[] }): string => {
  return url.map(segment => decodeURIComponent(segment)).join('//')
}

const Page = async ({ params }: Props) => {
  const userSession = cookies().get('sessionId')?.value
  const fullUrl = parseUrl({ url: params.url as string[] })
  const chatId = (fullUrl + '--' + userSession).replace(/\//g, '')

  const urlExists = await redis.sismember('indexed-urls', fullUrl)

  const messageHistory = await ragChat.history.getMessages({
    amount: 10,
    sessionId: chatId,
  })

  if (!urlExists) {
    await ragChat.context.add({
      type: 'html',
      source: fullUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    })

    await redis.sadd('indexed-urls', fullUrl)
  }

  return <Chat sessionId={chatId} initialMessages={messageHistory} />
}

export default Page
