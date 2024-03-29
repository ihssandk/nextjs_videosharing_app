import React from 'react';
import {useEffect} from "react";
import Image from 'next/image';
import Link from "next/link";
import {GoVerified} from "react-icons/go";
import useAuthStore from '../store/authStore';
import { allUsersQuery } from '../utils/queries';
import {IUser} from "../types"

const SuggestedAccounts = () => {
  const {fetchAllUsers, allUsers}= useAuthStore();
  useEffect(()=>{
    fetchAllUsers();
  }, [fetchAllUsers])
  return (
    <div className= "xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        <div>
          { allUsers.slice(0,6).map((user : IUser)=>(
            <Link href={`/profile/${user._id}`} key={user._id}>
              <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
                  <div className="w-8 h-8">
                    <Image src={user.image}
                    width={34}
                    height={34}
                    className="rounded-full "
                    alt="user profile"
                    layout="responsive"
                    />
                  </div>
                  <div className="hidden xl:block">
               <p className="flex gap-1 items-center text-md text-primary lowercase">{user.userName.replaceAll(' ', "")}
               <GoVerified  className="text-pink-400"/>
               </p>
                  </div>
              </div>
            
            </Link>
          ))}
        </div>
      </p>
    </div>
  )
}

export default SuggestedAccounts