import PageBanner from "../../components/common/PageBanner";

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Banner */}
      <PageBanner
        title="Terms & Conditions"
        subtitle="SIFS India"
        bgImage="/about/about-banner.png"
      />

      {/* Overlapping Card Wrapper */}
      <div className="relative z-10 -mt-12 pb-20 px-4">
        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Main Content Area */}
          <div className="p-8 md:p-16 text-sm text-gray-700 leading-relaxed space-y-10">
            
            {/* Intro Section */}
            <div className="space-y-4">
              <p>
                SIFS INDIA reserves the right to change prices, to cancel, alter, or update services, to amend timetables at any time prior to allotment, and to make additions or amendments to these terms and conditions without notifying you.
              </p>
              <p>
                Clients are requested to take a few moments to read the following terms and conditions prior to engaging in any service via this website. These terms and conditions govern the use of this website.
              </p>
              <p>
                Should you have any questions or wish to clarify the meaning of any of these terms and conditions, please contact us at <span className="font-semibold text-black">contact@sifsindia.com</span>.
              </p>
            </div>

            {/* 1. Institute Statutes */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Institute Statutes, Regulations and Policies</h2>
              <p>
                By paying your service fees, you agree to comply with the SIFS India Statutes, Regulations, and Policies as revised periodically with the Statements and Codes of Policy, Practice, and Procedure that are made under them.
              </p>
            </div>

            {/* 2. Fees and Payment */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Fees and Payment</h2>
              <p>
                The client must ensure that the lab fees for the service and all other charges related to the service are paid by the deadline notified. SIFS India will not be responsible for any non-payment, even in the case of payment made by a third party. SIFS India reserves the right to refuse your service to the specific service if you have not paid all compulsory fees and other charges before the service commences.
              </p>
            </div>

            {/* 3. Cancellation and Refund */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Cancellation and Refund in Service</h2>
              <p>
                If any client can cancel his or her service before 24 hours, he or she will be entitled to a full refund.
              </p>
            </div>

            {/* 4. Cancellation by Us */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Cancellation by Us</h2>
              <p className="mb-4">
                SIFS India will be entitled to terminate the terms and conditions and cease to provide clients with any service with immediate effect if they:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Fail to pay the required fees;</li>
                <li>Act in an aggressive, bullying, offensive, threatening, or harassing manner towards any employee of SIFS India;</li>
                <li>Cheat or plagiarize any work that the client is required to prepare or submit in connection with SIFS India;</li>
                <li>Steal or act in a fraudulent or deceitful manner towards SIFS India, employees, or any other client who may be on our premises;</li>
                <li>Intentionally or recklessly damage the property or the property of employees or other trainees attending SIFS India premises;</li>
                <li>Intoxicated under alcohol or illegal drugs while on our premises;</li>
                <li>Commit any criminal offence on our premises or where the victim is our employee or trainee;</li>
                <li>Breach any of these terms and conditions.</li>
              </ul>
            </div>

            {/* Visual/Audio Recordings */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">Visual and/or Audio Recordings</h2>
              <p>
                SIFS India may make visual and/or audio recordings of clients during their service period for promotional, management, or educational purposes. If you do not consent to this, you must notify the lab in writing before the commencement of the service.
              </p>
            </div>

            

            {/* More Information */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">For More Information</h2>
              <p className="mb-4">
                SIFS India works for the betterment of client service and always looks forward to improving its services. Therefore, we welcome feedback. If you wish to provide feedback, email <span className="font-semibold">contact@sifsindia.com</span>. Grievances are taken very seriously and will be addressed in a timely and thoughtful manner.
              </p>
              <p>
                If you wish to change or update the data we hold about you, please e-mail at <span className="font-semibold text-blue-600 underline">contact@sifsindia.com</span>.
              </p>
            </div>

            {/* Address Footer */}
            <div className="pt-8 border-t border-gray-100 grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-black mb-4">Head Office Address</h2>
                <address className="not-italic text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-900">Sherlock Institute of Forensic Science India,</p>
                  <p>A-14, Mahendru Enclave,</p>
                  <p>Model Town Metro, Delhi-110009, India</p>
                </address>
              </div>
              <div className="flex items-end justify-md-end">
                <p className="text-xs text-gray-500 italic">
                  "Please write the name of your service in the subject-line of your email or on the envelope"
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}