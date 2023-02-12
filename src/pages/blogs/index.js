import { useState, useCallback } from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import InfiniteScroll from 'react-infinite-scroller'
import LoadingSpinners from '../../components/LoadingSpinners'
import BlogContainer from '@/components/BlogComponents/BlogContainer'

export default function Blogs() {
  const [blogList, setBlogList] = useState([])
  const [moreItems, setMoreItems] = useState(true)

  const getBlogList = useCallback((page) => {
    setTimeout(async() => {
      await axios.get(`https://gorest.co.in/public/v2/posts?page=${page}&per_page=10/`)
      .then(response => {
        const newBlogList = blogList.concat(response.data)
        setBlogList(newBlogList)
        if(response.data.length === 0) {
          setMoreItems(false)
        } else {
          setMoreItems(true)
        }
      })
      .catch(error => {
        if(error) {
          console.log(error)
        }
      })

    }, 1500);
  },[blogList])

  return (
    <Layout title="Blogs Page">
        <h1>WELCOME TO BLOG</h1>
        <InfiniteScroll
        threshold={0}
        pageStart={0}
        loadMore={getBlogList}
        hasMore={moreItems}
        loader={<LoadingSpinners />}>
          <BlogContainer list={blogList}/>
        </InfiniteScroll>
        {moreItems ? null : <div><h3>no data anymore..</h3></div> }      
    </Layout>
  )
}
