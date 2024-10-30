import React from "react"

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Terms and Conditions</h1>
      <p className="mb-6">
        Welcome to Farhan Travels. These terms and conditions outline the rules
        and regulations for the use of our website and services. By accessing
        this website, we assume you accept these terms and conditions. Do not
        continue to use Farhan Travels if you do not agree to all the terms and
        conditions stated on this page.
      </p>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">1. Definitions</h2>
        <p>
          &quot;Company&quot;, &quot;We&quot;, &quot;Our&quot;, or
          &quot;Us&quot; refers to Farhan Travels. <br />
          &quot;User&quot;, &quot;You&quot;, or &quot;Your&quot; refers to the
          individual using our services or accessing our website. <br />
          &quot;Service&quot; refers to the booking services provided by Booking
          Expert for flights and hotels.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Use of Service</h2>
        <p>
          By using our services, you agree to provide accurate and complete
          information. You must be at least 18 years old to use our services.
          You agree not to use the service for any unlawful purpose or in any
          way that might harm, damage, or disparage any other party.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Booking and Payment</h2>
        <p>
          All bookings made through Farhan Travels are subject to availability
          and acceptance by the service providers (airlines, hotels, etc.).
          Prices and availability are subject to change without notice. Payments
          must be made in full at the time of booking. We accept various payment
          methods as indicated on our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">
          Cancellations and Refunds
        </h2>
        <p>
          Cancellation and refund policies vary depending on the service
          provider. Please review the specific terms and conditions provided at
          the time of booking. Farhan Travels will assist with the cancellation
          process, but we are not responsible for the policies of airlines,
          hotels, or other service providers.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Changes to Bookings</h2>
        <p>
          If you need to make changes to your booking, please contact us as soon
          as possible. Changes are subject to availability and may incur
          additional charges as determined by the service provider.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">User Accounts</h2>
        <p>
          When you create an account with us, you must provide accurate
          information. You are responsible for maintaining the confidentiality
          of your account and password, and you are responsible for all
          activities that occur under your account. Please notify us immediately
          of any unauthorized use of your account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Intellectual Property</h2>
        <p>
          The content on our website, including text, graphics, logos, and
          images, is the property of Farhan Travels or its licensors and is
          protected by intellectual property laws. You may not use any content
          from our website without our express written permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Limitation of Liability</h2>
        <p>
          Farhan Travels will not be liable for any direct, indirect,
          incidental, special, or consequential damages arising from your use of
          the service or any booking made through the service. Our total
          liability to you in connection with any booking is limited to the
          amount paid by you for that booking.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Privacy</h2>
        <p>
          Your use of our services is also governed by our Privacy Policy.
          Please review our Privacy Policy to understand our practices regarding
          your personal data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Changes to Terms</h2>
        <p>
          We may revise these terms and conditions from time to time. Any
          changes will be posted on this page. By continuing to use our services
          after we post any changes, you accept the modified terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance
          with the laws of Bangladesh. Any disputes relating to these terms and
          conditions will be subject to the exclusive jurisdiction of the courts
          of Bangladesh.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">12. Contact Us</h2>
        <p className="mb-2">
          If you have any questions about these terms and conditions, please
          contact us:
        </p>
        <p className="ml-4">
          Email:{" "}
          <a
            href="mailto:support@farhantravels.com"
            className="text-blue-500 underline"
          >
            support@farhantravels.com
          </a>
          <br />
          Address: House# 74, Road# 7, Block# H, Banani, Dhaka-1213, Bangladesh
        </p>
      </section>
    </div>
  )
}

export default TermsAndConditionsPage
