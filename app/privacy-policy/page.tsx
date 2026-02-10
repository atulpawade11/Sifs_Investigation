import PageBanner from "../../components/common/PageBanner";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Banner */}
      <PageBanner
        title="Privacy Policy"
        subtitle="SIFS India"
        bgImage="/about/about-banner.png"
      />

      {/* Overlapping Card Wrapper */}
      <div className="relative z-10 -mt-12 pb-20 px-4">
        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Main Content Area */}
          <div className="p-8 md:p-16 text-sm text-gray-700 leading-relaxed space-y-12">
            
            {/* 1. Intro */}
            <p className="text-base text-gray-800 leading-relaxed">
              SIFS India is intent on protecting your privacy and keeping your trust
              in reference to your personal details (including name, email address,
              or phone number) we collect and receive from you, which also include
              the details connected to your previous use of SIFS India services.
              Cautiously go through the privacy policy to understand how we collect,
              use, and share your personal details. SIFS India shall not be held
              liable for disclosure of the student information in accordance with
              this privacy commitment or in terms of any other agreements with you.
            </p>

            {/* 2. Personal Details Collection */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-6">
                Personal Details Collection
              </h2>
              <div className="space-y-4">
                <p>
                  SIFS India may collect and use your personal details submitted by
                  you, such as your contact details (name, email ID, postal address,
                  telephone number, academic and professional details).
                </p>
                <p>
                  If you need to access certain content or additional features of the
                  services, then you need to register by submitting a registration
                  form, in which additional details may be requested.
                </p>
                <p className="font-medium text-gray-900">
                  We may disclose the student's information to third parties, without
                  limitation, for the following reasons, and you hereby give your
                  irrevocable consent for the same:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-gray-600">
                  <li>To comply with legal requirements, legal process, legal or regulatory directive or instruction</li>
                  <li>To enforce the terms and conditions of the products or services</li>
                  <li>To protect or defend our rights, interests, and property, or that of our associates and affiliates</li>
                  <li>Our employees, for fraud prevention purposes, or as permitted or required by law</li>
                </ul>
              </div>
            </div>

            {/* 3. Using Personal Details */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">
                Using Personal Details
              </h2>
              <div className="space-y-4">
                <p>
                  The personal details given by you to SIFS India are used to fulfill
                  your requirements for products and services. We use your details
                  also to improve our services, respond to your requests, inquiries,
                  and comments, and notify you about changes and updates.
                </p>
                <p>
                  Your personal information will also help us provide you with
                  special offers, promotions, and any other information regarding
                  our services. Your comments and feedback help SIFS India enhance,
                  evaluate, and improve our services while working safely and
                  securely.
                </p>
                <p>
                  SIFS India uses reasonable precautions to keep the personal
                  information disclosed to us secure and will not disclose this
                  information to other individuals or organizations unless required
                  by law.
                </p>
              </div>
            </div>

            {/* 4. Information Sharing and Disclosure */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">
                Information Sharing and Disclosure
              </h2>
              <div className="space-y-4">
                <p>
                  When required, SIFS India may sometimes share your personal details
                  with relevant agents, representatives, applicable suppliers, and
                  service providers, our affiliates, to assist us in a better way in
                  accordance with the terms of this confidentiality statement.
                </p>
                <p>
                  We may also share your information with our affiliated group
                  companies globally that wish to send any information about their
                  services that may be of your interest, as determined by your
                  choices.
                </p>
                <p>
                  Other than sharing, we disclose your details until and unless
                  required to do so by law or court orders, just to defend against
                  legal claims, to detect, investigate, and help in preventing fraud,
                  and to protect your rights and properties.
                </p>
              </div>
            </div>

            {/* 5. Privacy and Security */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">
                Privacy and Security
              </h2>
              <div className="space-y-4">
                <p>
                  Access to your personal details is given to those who reasonably
                  require it and whom we trust; otherwise, SIFS India takes special
                  care and precautions to secure your personal details.
                </p>
                <p>
                  We also take the required safety measures against the misuse,
                  disclosure, alteration, deletion, and unauthorized access to your
                  personal details.
                </p>
              </div>
            </div>

            {/* 6. Changes to Privacy Policy */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">
                Changes to Privacy Policy
              </h2>
              <p>
                Changes to our privacy policy will be made from time to time;
                therefore, always check the privacy policy page whenever you visit
                our site.
              </p>
            </div>

            {/* 7. Contact */}
            <div className="pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-black mb-4">Contact</h2>
              <p className="text-lg">
                Any query regarding the privacy policy, please contact us at{" "}
                <a
                  href="mailto:info@sifsindia.com"
                  className="text-blue-600 font-semibold underline underline-offset-4"
                >
                  info@sifsindia.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}