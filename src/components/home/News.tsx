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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {loading ? (
           Array.from({ length: 4 }).map((_, index) => (
            <NewsSkeletonCard key={index}/>
           ))
        ) : (
          news.map((item: { id: number; [key: string]: any }, index: number) => (
            <NewsCard 
              key={`news-${item.id || index}`}
              title={item.news_title}
              description={item.news_content}
              image={item.news_img}
              headline={item.news_headlone}
              {...item}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default News 