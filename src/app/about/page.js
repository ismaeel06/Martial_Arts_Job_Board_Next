import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'About | MartialArtsJobsBoard.com',
  description: 'Learn more about MartialArtsJobsBoard.com - The #1 Job Board for Martial Arts Instructors',
};

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'David Chen',
      role: 'Founder & CEO',
      bio: '4th Dan Black Belt in Taekwondo with 15 years running martial arts academies. Founded MartialArtsJobsBoard.com to solve hiring challenges he experienced firsthand.',
      image: '/icon.png' // Placeholder - would be replaced with actual team member images
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      bio: 'BJJ Purple Belt and former HR Director. Expert in matching martial arts schools with qualified instructors through data-driven approaches.',
      image: '/icon.png' 
    },
    {
      name: 'Michael Tanaka',
      role: 'Technical Director',
      bio: 'Judo Black Belt and software engineer who built our platform from the ground up with focus on user experience and powerful filtering tools.',
      image: '/icon.png'
    }
  ];

  const testimonials = [
    {
      quote: "We found our head instructor within just 3 days of posting. The quality of applicants was far better than what we've seen on general job sites.",
      author: "James Lee",
      role: "Owner, Dragon Karate Academy",
      image: '/icon.png'
    },
    {
      quote: "The video application feature is a game-changer. Being able to see teaching style before interviews saved us so much time in our hiring process.",
      author: "Michelle Rodriguez",
      role: "Director, Elite MMA Center",
      image: '/icon.png'
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
              About MartialArtsJobsBoard.com
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              The #1 platform connecting martial arts schools with qualified instructors since 2020
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                We believe that behind every great martial arts school is an exceptional 
                instructor who can inspire students and transform lives.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our mission is to elevate the martial arts industry by connecting the best 
                schools with the most qualified instructors, creating fulfilling careers and 
                thriving dojos.
              </p>
              <p className="text-lg text-gray-700">
                By focusing exclusively on martial arts, we&apos;ve built a platform that understands 
                the unique needs of school owners and instructors alike, making hiring more 
                efficient and successful.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 rounded-lg bg-[#D88A22] blur-xl opacity-30"></div>
                <div className="relative bg-gray-100 rounded-lg p-8 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-white p-3 rounded-full shadow-md mb-4">
                      <Image
                        src="/icon.png"
                        alt="MartialArtsJobsBoard.com"
                        width={60}
                        height={60}
                      />
                    </div>
                    <h3 className="text-2xl font-bold">By Martial Artists, For Martial Artists</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#D88A22] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p>Founded by martial arts school owners who understand the industry</p>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#D88A22] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p>Tailored features that solve real problems in martial arts hiring</p>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#D88A22] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p>We&apos;ve helped over 500 schools find their perfect instructor match</p>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#D88A22] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p>Dedicated to supporting all martial arts styles and traditions</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Team Section - Modified to single founder with image left, text right */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Meet Our Founder</h2>
            <div className="h-1 w-24 bg-[#D88A22] mx-auto"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
    {/* Left: Founder Image */}
    <div className="md:w-2/5 flex items-center justify-center p-8">
      <div className="relative">
        <div className="absolute rounded-xl bg-[#D88A22] opacity-30"  style={{ 
    top: "-8px", 
    left: "-8px", 
    right: "-8px", 
    bottom: "-4px"
  }}></div>
        <div className="relative p-2 inline-block bg-white rounded-xl border-gray-300">
          <Image
            src="/founder.png"
            alt="Robert Torres"
            width={260}
            height={260}
            className="rounded-lg object-cover"
            style={{ height: 'auto' }}
          />
        </div>
      </div>
    </div>
              {/* Right: Founder Bio */}
              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Robert Torres</h3>
                <p className="text-[#D88A22] font-medium mb-4">Founder & CEO</p>
                <p className="text-gray-600 mb-4">
7th Degree Black Belt. 20+ years building, scaling, and coaching martial arts schools. Robert Torres created MartialArtsJobsBoard.com to solve the biggest challenge every school faces: hiring reliable, qualified instructors. 
                </p>
                <p className="text-gray-600">
                This platform bridges that gap, connecting schools with passionate instructors to build rock-solid teams for long-term success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> 

      {/* Team Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Founder</h2>
            <div className="h-1 w-24 bg-[#D88A22] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center transform transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex justify-center">
                  <div className="rounded-full bg-black p-2 inline-block">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-[#D88A22] font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What School Owners Say</h2>
            <div className="h-1 w-24 bg-[#D88A22] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-zinc-900 rounded-lg p-8 shadow-md">
                <div className="flex items-start mb-6">
                  <div className="mr-4">
                    <svg className="w-10 h-10 text-[#D88A22]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg mb-4">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-bold">{testimonial.author}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <p className="text-5xl font-bold text-[#D88A22] mb-2">500+</p>
              <p className="text-xl">Schools Served</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-[#D88A22] mb-2">2,800+</p>
              <p className="text-xl">Instructors Hired</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-[#D88A22] mb-2">15+</p>
              <p className="text-xl">Martial Arts Styles</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-[#D88A22] mb-2">93%</p>
              <p className="text-xl">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Whether you&apos;re looking to hire top martial arts talent or find your next teaching opportunity, we&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/post-job" className="px-8 py-3">
              Post a Job
            </Button>
            <Button href="/find-jobs" variant="secondary" className="px-8 py-3">
              Find Jobs
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutPage;
