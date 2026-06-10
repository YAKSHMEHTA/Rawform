import React,{useState,useEffect, useRef,useLayoutEffect} from 'react'
import gsap from 'gsap'
import { useParams,Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Detail() {
    const imgRefs = useRef([]);
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

    const containerRef = useRef(null);

    useLayoutEffect(() => {
    const images = gsap.utils.toArray(".img");

    images.forEach((img) => {
        gsap.fromTo(
        img,
        {
            clipPath: "inset(0 100% 0 0)"
        },
        {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            ease: "power2.inOut",
            scrollTrigger: {
            trigger: img,
            start: "top 80%",
            markers: true,
            }
        }
        );
    });

    }, [detail]);


  return (
    <div className='py-35 flex detail'>
        <div className="w-1/2" ref={containerRef}>
            {/* {detail.images[0]} */}
            {detail.images?.map((item,idx)=>{
                return(
                    <img ref={(el) => (imgRefs.current[idx] = el)} 
                    src={item} key={idx} className='w-full object-cover img' alt="" style={{clipPath:"(0 100% 0 0)"}} />
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
