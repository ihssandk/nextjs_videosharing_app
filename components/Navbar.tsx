import React, { useState , useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {AiOutlineLogout} from 'react-icons/ai';
import {BiSearch} from 'react-icons/bi';
import {IoMdAdd} from 'react-icons/io';
import Logo from '../utils/tiktfu-logo.png';
import {GoogleLogin, googleLogout} from '@react-oauth/google';
import { createOrGetUser } from '../utils';
import useAuthStore from "../store/authStore";
import { IUser } from '../types';


const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();
  
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if(searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-black-400 py-4 px-4">
        <Link href="/">
        <div className="w-[200px] md:w-[180px] "> 
                <Image
                className="cursor-pointer"
                src={Logo}
                alt="tiktfu"
                layout ="responsive"
                />
                </div>    
        </Link>
        <div className="relative hidden md:block">
          <form
          onSubmit = {handleSearch}
          className="absolute md:static top-10 -left-20 bg-white">
              
              <input type ="text" value ={searchValue}  onChange={(e) => setSearchValue(e.target.value)} placeholder="See that you are not alone ..." className="bg-gray p-3 md:text-md font-light border-2 border-red-100 focus:outline-none focus:border-2 focus:border-red-300 rounded-full w-[300px] md:w-[350px] md:top-0"/>
              <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-red-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch className="text-red-200"/>
          </button>
            </form>
        </div>
        <div>
          { user ? (
            <div className= "flex gap-5 md:gap-10">
              <Link href="/upload">
                <button className ="rounded-full border-primary-200 hover:border-pink-300 border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2"> 
                  <IoMdAdd  className="text-xl"/>
                  <span className="hidden md:block">Upload</span>
                </button>
              </Link>
              {user.image && (
               <Link href="/">
               <>
                   <Image 
                   width ={50}
                   height={50}
                   className = "rounded-full cursor-pointer"
                   src={user.image}
                   alt="profile pic"
                   />
               </>
           </Link>
              )}
              <button
              type = "button"
              className="px-2"
              onClick= {()=> {
                googleLogout();
                removeUser();
              }}> 
              <AiOutlineLogout className = "text-red-200 hover:text-red-500" fontSize={28} />
              </button>




            </div>
          ) :(
            <GoogleLogin 
            onSuccess = {(response)=> createOrGetUser(response, addUser)}
            onError = {()=>console.log("error")}
            
            />
          )
          }
        </div>
    </div>
  )
}

export default Navbar