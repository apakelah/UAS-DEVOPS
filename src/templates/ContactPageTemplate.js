import React from 'react'
import Header from "../components/Header"
import { TextImageSplit, SectionHeading } from "../components/Sections"

function ContactPageTemplate({
  heading,
  subheading,
  contactform,
  office
}) {
  return (
    <div>
      <Header heading={heading} subheading={subheading} />

      <TextImageSplit image={contactform.image}>
        <SectionHeading>{contactform.heading}</SectionHeading>
        <p className="mt-6 text-gray-500 text-lg">
          {contactform.description}
        </p>
        <form action="https://getform.io/f/azywwyzb" method="POST">
          <div className="mt-6">
            <div className="grid grid-cols-6 gap-6">
              {/* Form fields omitted for brevity (tetap sama seperti sebelumnya) */}
            </div>
          </div>

          <div className="mt-2 py-3 text-right">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-green-900 bg-yellow-300 hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Kirim
            </button>
          </div>
        </form>
      </TextImageSplit>

      <TextImageSplit image={office.image} imageLeft={true}>
        <p className="text-green-700 font-semibold tracking-wide">
          {office.tagline}
        </p>
        <SectionHeading>{office.location}</SectionHeading>
        <div className="mt-6 sm:flex sm:flex-row text-gray-500">
          <div className="sm:w-1/2 whitespace-pre-line">{office.address}</div>
          <div className="mt-6 sm:mt-0 sm:w-1/2 whitespace-pre-line">{office.phone}</div>
        </div>
      </TextImageSplit>
    </div>
  )
}

export default ContactPageTemplate