import React, { useEffect, useState } from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "company", title: "Company Overview and Regulatory Disclosure" },
  { id: "scope", title: "Scope of Services" },
  { id: "account", title: "Account Registration and Verification" },
  {
    id: "responsibilities",
    title: "User Responsibilities and Content Warranties",
  },
  { id: "fees", title: "Brokerage Engagement and Fees" },
  { id: "noncircumvention", title: "Non-Circumvention and Attribution" },
  { id: "notification", title: "Mandatory Deal Notification" },
  { id: "thirdparty", title: "Use of Third-Party Services" },
  { id: "liability", title: "Limitations of Liability" },
  { id: "indemnity", title: "Indemnity" },
  { id: "privacy", title: "Data Privacy and Protection" },
  { id: "termination", title: "Suspension and Termination" },
  { id: "dispute", title: "Dispute Resolution" },
  { id: "law", title: "Governing Law and Jurisdiction" },
  { id: "modifications", title: "Modifications and Notifications" },
  { id: "entire", title: "Entire Agreement and Severability" },
];

const TermsAndConditions: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 150; // 150px from top

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if section is within 150px of the top
          if (rect.top <= threshold && rect.bottom > threshold) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="terms-conditions">
      <h2 className="header">Terms of Service</h2>
      <p className="effective">Effective: September 29, 2025</p>
      {/* summary */}
      <div className="content summary">
        <h2 className="">Quick Summary of Our Terms</h2>
        <ul>
          <li>
            <strong>Who We Are:</strong> We are a registered company in Nigeria
            (RC No. 7816689) and a LASRERA-licensed real estate brokerage. We
            provide a marketplace where agents, owners, and developers can list
            properties, and brokerage services where we help with viewings,
            negotiations, offers, and closings.
          </li>

          <li>
            <strong>Using Our Platform:</strong> You must provide accurate
            information (property details, documents, ID, etc.), you must not
            post fake, misleading, or unlawful listings, and you must keep your
            listings updated (for example, mark as “sold” or “let” when
            completed).
          </li>

          <li>
            <strong>Fees & Commissions:</strong> When you engage us as your
            broker, sales attract 5% of the property sale price, lettings
            attract 10% of the annual rent, and short lets or joint ventures are
            charged by agreement. Our commission is payable once a binding
            agreement is signed or the buyer/tenant takes possession.
          </li>

          <li>
            <strong>No Side Deals:</strong> If we introduce you to a buyer,
            seller, landlord, or tenant through our platform, you must not
            bypass us. Any deal done within 12 months of first contact must go
            through 1502 Properties, otherwise you will still owe us our full
            commission.
          </li>

          <li>
            <strong>Your Privacy:</strong> We comply with the Nigeria Data
            Protection Act (NDPA) 2023. You can access, update, or delete your
            data, and we will not share your personal information without your
            consent except where required by law. See our{" "}
            <a href="/privacy-policy">Privacy Policy</a> for details.
          </li>

          <li>
            <strong>Third-Party Services:</strong> We may link you to payment
            gateways, mapping tools, or verification services, but these
            services are independent, and we are not responsible for how they
            work or for any losses you may incur from using them.
          </li>

          <li>
            <strong>Disputes:</strong> If there’s ever a disagreement, we will
            first try to resolve it by discussion; if not, we proceed to
            mediation; and as a last step, disputes will be handled by
            arbitration in Lagos, Nigeria.
          </li>

          <li>
            <strong>Termination:</strong> We may suspend or remove your account
            if you break the rules or act fraudulently. You can close your
            account at any time, but you must settle any fees owed.
          </li>

          <li>
            <strong>Important Limits:</strong> We provide the platform “as is”
            and do not guarantee every listing’s accuracy. Our liability is
            limited to the fees you’ve paid us in the last 12 months, and we are
            not responsible for indirect losses such as lost profit or goodwill.
          </li>

          <li>
            <strong>Updates:</strong> We may update these Terms from time to
            time. If we do, we’ll notify you and post the new version on our
            platform.
          </li>
        </ul>
      </div>
      <h2 className="advance">1502 Properties Terms of Service</h2>
      <div className="terms-layout">
        {/* Left: Table of Contents */}
        <aside className="toc">
          {/* <h2>Contents</h2> */}
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={activeSection === s.id ? "active-link" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(s.id);
                  }}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right: Terms text */}
        <div className="content">
          <section id="intro">
            <h3>Introduction</h3>
            <p>
              These Terms and Conditions ("Terms" or "Agreement") govern your
              access to and use of the online platform operated by 1502
              Properties Limited ("1502 Properties", "we", "our", or "us"). By
              accessing or using our website, platform, mobile application, or
              services (collectively, the "Platform"), you agree to be bound by
              these Terms, including our Privacy Policy. If you do not agree
              with any part of these Terms, you must not use the Platform.
            </p>
          </section>

          <section id="company">
            <h3>Company Overview and Regulatory Disclosure</h3>
            <p>
              1502 Properties Limited is a company registered under the laws of
              the Federal Republic of Nigeria with RC No. 7816689. We operate
              as:
            </p>
            <ul>
              <li>
                A digital real estate marketplace, enabling third-party agents,
                property owners, marketers, and developers to list, promote, and
                advertise properties;
              </li>
              <li>
                A licensed brokerage firm authorised by the Lagos State Real
                Estate Regulatory Authority (LASRERA) to offer regulated real
                estate agency services within Lagos State.
              </li>
            </ul>
            <p>
              We may expand regulated operations to other jurisdictions in the
              future, subject to licensing and applicable law.
            </p>
          </section>

          <section id="scope">
            <h3>Scope of Services</h3>
            <h4>Marketplace Services</h4>
            <ul>
              <li>Property listings and advertising tools.</li>
              <li>Search and filter functions for users.</li>
              <li>Enquiry forms and agent contact facilitation.</li>
            </ul>
            <p>
              For these services, we act solely as an information intermediary
              and do not represent either party in any transaction.
            </p>
            <h4>Brokerage Services</h4>
            <ul>
              <li>Coordination of property viewings.</li>
              <li>Negotiation and offer handling.</li>
              <li>
                Facilitation of Letters of Offer (LOIs), memoranda of
                understanding, or contracts.
              </li>
              <li>Closing and transaction support.</li>
            </ul>
            <p>
              For these services, we act as a regulated real estate broker or
              agent, and you appoint us as such when engaging any of these
              features.
            </p>
          </section>

          <section id="account">
            <h3>Account Registration and Verification</h3>
            <p>
              To use certain features of the Platform, you may be required to
              register an account and provide valid government-issued
              identification, proof of title or listing authority, and contact
              information and business details. We reserve the right to conduct
              KYC (Know Your Customer) and AML (Anti-Money Laundering) checks in
              compliance with applicable laws, and to suspend or terminate
              accounts where suspicious activity or policy violations occur.
            </p>
          </section>

          <section id="responsibilities">
            <h3>User Responsibilities and Content Warranties</h3>
            <ul>
              <li>
                You have legal authority to list or transact in the relevant
                property.
              </li>
              <li>
                All content (photos, descriptions, documents) you upload is
                accurate, lawful, and non-infringing.
              </li>
              <li>
                You will promptly update the listing status (e.g., sold, let,
                under offer).
              </li>
              <li>
                You will not use the Platform for illegal, deceptive, or harmful
                purposes.
              </li>
            </ul>
            <p>
              We reserve the right to modify, remove, or disable access to any
              content that violates these Terms or any applicable law, with or
              without notice.
            </p>
          </section>

          <section id="fees">
            <h3>Brokerage Engagement and Fees</h3>
            <p>
              By engaging our brokerage services, you acknowledge that 1502
              Properties is appointed as your exclusive or non-exclusive agent
              for that transaction.
            </p>
            <p>Our standard commission rates are:</p>
            <ul>
              <li>Sales: 5% of the gross sale price.</li>
              <li>Lettings: 10% of annual rent.</li>
              <li>
                Short Lets &amp; Joint Ventures: As separately agreed in writing
                by the parties.
              </li>
            </ul>
            <p>
              Commission is earned and becomes payable upon the earliest of:
              execution of a binding sale, lease, or tenancy agreement; buyer or
              tenant taking possession of the property; or payment of purchase
              price or rent.
            </p>
            <p>
              All fees are exclusive of VAT (7.5%) and Withholding Tax (WHT).
              Invoices must be settled within 7 business days of issuance. Late
              payments may attract interest at the CBN Monetary Policy Rate
              (MPR) + 5% per annum, calculated daily.
            </p>
          </section>

          <section id="noncircumvention">
            <h3>Non-Circumvention and Attribution</h3>
            <p>
              You agree not to circumvent 1502 Properties in any transaction
              resulting from an introduction via the Platform. For 12 months
              from first contact facilitated by us (e.g., enquiry, chat,
              viewing, offer), all transactions must be routed through us.
              Breach of this clause incurs liquidated damages equivalent to the
              full commission payable.
            </p>
          </section>

          <section id="notification">
            <h3>Mandatory Deal Notification</h3>
            <p>
              You must notify us in writing within 5 business days of any deal
              (sale, lease, tenancy, etc.) resulting from a Platform connection.
              Failure to do so constitutes a material breach of these Terms.
            </p>
          </section>

          <section id="thirdparty">
            <h3>Use of Third-Party Services</h3>
            <p>
              We may provide links or access to third-party services such as
              payment gateways, mapping and analytics providers, identity
              verification, or escrow services. These third parties operate
              independently of us, and we disclaim liability for any direct or
              indirect loss resulting from their services.
            </p>
          </section>

          <section id="liability">
            <h3>Limitations of Liability</h3>
            <ul>
              <li>
                The Platform is provided on an "as is" and "as available" basis,
                without warranties of any kind.
              </li>
              <li>
                We do not guarantee the accuracy, completeness, or availability
                of any listing or content.
              </li>
              <li>
                Our liability to you shall not exceed the total fees paid by you
                to us in the 12 months preceding the claim.
              </li>
              <li>
                We disclaim liability for any indirect, consequential, or
                special damages, including loss of profit, data, goodwill, or
                business opportunity.
              </li>
            </ul>
          </section>

          <section id="indemnity">
            <h3>Indemnity</h3>
            <p>
              You agree to indemnify and hold harmless 1502 Properties, its
              directors, officers, employees, and agents from and against any
              and all claims, liabilities, damages, losses, and expenses
              (including reasonable legal fees) arising out of or related to
              your use of the Platform, your breach of these Terms, or your
              violation of any applicable law or third-party rights.
            </p>
          </section>

          <section id="privacy">
            <h3>Data Privacy and Protection</h3>
            <p>
              We collect and process personal data in compliance with the
              Nigeria Data Protection Act (NDPA), 2023. You have rights to
              access, correct, or delete your data; restrict or object to
              processing; and withdraw consent for marketing communications. For
              more information, refer to our Privacy Policy.
            </p>
          </section>

          <section id="termination">
            <h3>Suspension and Termination</h3>
            <p>
              We may suspend or terminate your access to the Platform
              immediately and without notice if you engage in fraudulent
              activity, breach these Terms, or violate any applicable law. You
              may terminate your account at any time by written notice, subject
              to payment of any accrued fees or commissions. Obligations
              relating to outstanding fees, indemnity, and liability limitations
              survive termination.
            </p>
          </section>

          <section id="dispute">
            <h3>Dispute Resolution</h3>
            <p>
              All disputes arising under or in connection with these Terms shall
              first undergo good-faith negotiation, then mediation by a mutually
              agreed mediator within 14 days, and finally arbitration in Lagos,
              Nigeria, under the Arbitration and Mediation Act, 2023. The
              arbitral tribunal shall consist of one arbitrator and may be
              conducted virtually or in person. Each party shall bear its own
              costs, and tribunal fees shall be shared equally unless otherwise
              directed.
            </p>
          </section>

          <section id="law">
            <h3>Governing Law and Jurisdiction</h3>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the Federal Republic of Nigeria. International users
              agree to submit to the exclusive jurisdiction of Nigerian courts
              and arbitration in Nigeria.
            </p>
          </section>

          <section id="modifications">
            <h3>Modifications and Notifications</h3>
            <p>
              We may update these Terms from time to time. We will notify users
              of material changes by posting an updated version with a new
              "Effective Date" on the Platform and/or sending email or
              in-platform notification. Your continued use of the Platform after
              such modifications constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section id="entire">
            <h3>Entire Agreement and Severability</h3>
            <p>
              These Terms, together with our Privacy Policy and any referenced
              policies, constitute the entire agreement between you and 1502
              Properties. If any provision is found to be invalid or
              unenforceable, the remaining provisions shall continue in full
              force and effect.
            </p>
          </section>
        </div>
      </div>{" "}
    </div>
  );
};

export default TermsAndConditions;
