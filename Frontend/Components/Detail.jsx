import React,{useState,useEffect, use} from 'react'
import gsap from 'gsap'
import { useParams,Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'

function Detail() {
    const [searchParams] = useSearchParams();
    const slug = searchParams.get("slug");
    const [detail,setDetail] = useState({});
    const [imgurl,setImgUrl] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const {data} =  await axios.get(`http://localhost:8080/shop/detail?slug=${slug}`)
            console.log(slug)
            setDetail(data[0])
            setImgUrl(data[0].images)
        }
        fetchData();
    },[slug])

  return (
    <div className='py-35 flex detail'>
        <div className="w-1/2">
            {/* {detail.images[0]} */}
            {detail.images?.map((item,idx)=>{
                return(
                    <img src={item} className='w-full object-cover' alt="" />
                );
            })}
        </div>
        <div className="w-1/2 px-20 py-5  ">
        <div className="w-50">
            <h3 className=''>{detail.name}</h3>
        </div>
            
        </div>
    </div>
  )
}

export default Detail
