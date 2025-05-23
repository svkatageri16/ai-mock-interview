import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import {Button} from "@/components/ui/button";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/InterviewCard";

const Page = () => {
    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>
                        Get Interview ready with AI-powered mock interview and feedback.
                    </h2>
                    <p className="text-lg">
                        Practice on real interview questions and get real time feedback with PrepWise
                        you mock interview buddy.
                    </p>
                    <Button asChild className="btn-primarymax-sm:w-full">
                <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>.
                <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Your interviews</h2>

                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an interview</h2>

                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id} />
                    ))}
                    {/*<p>You haven&apos;t taken any interviews yet!</p>*/}
                </div>
            </section>
        </>
    )
}
export default Page
