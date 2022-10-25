import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination} from 'swiper';
import 'swiper/css/bundle'
import {RiShareBoxLine} from 'react-icons/ri'

export default function Listing() {
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkedCopied] = useState(false);
    SwiperCore.use([Autoplay, Navigation, Pagination]);
    useEffect(()=>{
        async function fetchListing(){
            const docRef = doc(db, 'listings', params.listingId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        fetchListing();
    },[params.listingId]);
    if(loading){
        return <Spinner />
    }
  return (
    <main>
        <Swiper 
            slidesPerView={1} 
            navigation 
            pagination={{type: 'progressbar'}} 
            effect='fade' 
            modules={[EffectFade]}
            autoplay={{delay:3000}}
        >
            {listing.imgUrls.map((url,index) => (
                <SwiperSlide key={index}>
                    <div 
                        className='relative w-full overflow-hidden h-[300px]' 
                        style={{
                            background: `url(${listing.imgUrls[index]}) center no-repeat`, 
                            backgroundSize: 'cover',
                        }}>

                    </div>
                </SwiperSlide> 
            ))}
        </Swiper>
        <div className='fixed top-[8%] right-[3%] z-10 cursor-pointer bg-white w-12 h-12 border-2 border-gray-400 rounded-lg flex justify-center items-center  opacity-50 shadow-md hover:shadow-lg hover:opacity-100 transition duration-150 ease-in-out' onClick={()=>{
            navigator.clipboard.writeText(window.location.href)
            setShareLinkedCopied(true)
            setTimeout(()=>{
                setShareLinkedCopied(false)
            }, 2000);
        }}>
            <RiShareBoxLine className='text-3xl text-slate-500'/>
        </div>
        {shareLinkCopied && (
            <p className='fixed top-[8%] right-[10%] font-semibold shadow-lg rounded-md bg-white z-10 p-2'>Link Copied</p>
        )}
    </main>
  )
}
