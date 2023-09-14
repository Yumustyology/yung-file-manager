import React from 'react'
import UserInfo from './UserInfo'
import StorageInfo from './StorageInfo'
import StorageDetailList from './StorageDetailList'
import StorageUpgradeMsg from './StorageUpgradeMsg'
import { useSession } from 'next-auth/react'

function Storage() {
  const { data: session } = useSession();
  return session && (
    <div className="bg-gray-200 p-5
         order-first md:order-last"
    >
      <div>
        <UserInfo />
        <StorageInfo />
        <StorageDetailList />
        <StorageUpgradeMsg />
      </div>
    </div>
  )
}

export default Storage