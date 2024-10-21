import Dashboard from '@/components/Dashboard';
import Main from '@/components/Main';
import React from 'react'

export const metadata = {
    title: "VibeCheck - Dashboard",
};

export default function DashboardPage() {

  return (
    <Main>
      <Dashboard/>
    </Main>
  )
}
