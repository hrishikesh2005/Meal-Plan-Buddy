"use client"

// change logo later
import Image from "next/image"
import Link from "next/link"
import {SignedIn,SignedOut,useUser ,SignOutButton} from "@clerk/nextjs"

export default function NavBar(){
    const {isLoaded,isSignedIn, user}=useUser()
    console.log("user info",user)
    console.log("isloaded",isLoaded)
    console.log("issigned",isSignedIn)
    if (!isLoaded) return <p> Loading...</p>
    return (
        <nav>
            <div>
                <Link href="/">
                    <Image src="/logo.png" width={60} height={60} alt="Logo"   />
                </Link>
            </div>
            <div >
                {""}
                <SignedIn>
                    <Link href="/mealplan"> MealPlan</Link>
                    {user?.imageUrl ? (
                        <Link href="/profile">
                            <Image 
                                src={user.imageUrl} 
                                alt="Profile Picture" 
                                width={40} 
                                height={40}
                                /> 
                        </Link>): 
                        <div> No Image</div>}
                    
                    <SignOutButton>
                        <button>Sign Out</button>
                    </SignOutButton>
                </SignedIn>

                <SignedOut></SignedOut>
            </div>
        </nav>
    )
}