'use client'
import { useEffect, useState } from 'react'
import NewsCard from '@/components/common/NewsCard'
import NewsSkeletonCard from '@/components/common/NewsSkeletonCard'
import { cricketApi } from '@/services/api'

const News = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await cricketApi.getTopNews()
        setNews(response)
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <section>
      <h2 className="text-3xl font-bold text-left">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-10">
        {loading ? (
          <>
            <NewsSkeletonCard />
            <NewsSkeletonCard />
            <NewsSkeletonCard />
            <NewsSkeletonCard />
          </>
        ) : (
          news.map((item: { id: number; [key: string]: any }, index: number) => (
            <NewsCard 
              key={`news-${item.id || index}`}
              title={item.tit}
              description={item.Content}
              image={item.Images}
              headline={item.Headline}
              {...item}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default News 