const styles = `
.pp-page{
  --ink:#14181a;
  --charcoal:#23281f;
  --sand:#efe9dc;
  --paper:#faf8f3;
  --brass:#a9824c;
  --brass-light:#c9a06a;
  --slate:#6b6f63;
  --line: rgba(20,24,26,0.14);
  --line-soft: rgba(20,24,26,0.08);

  background:var(--paper);
  color:var(--ink);
  font-family:'Inter', sans-serif;
  font-size:16px;
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
}
.pp-page *{box-sizing:border-box;}
.pp-page a{color:inherit;}

/* Hero */
.pp-hero{
  padding:96px 6vw 64px;
  border-bottom:1px solid var(--line);
  background:linear-gradient(180deg, var(--sand) 0%, var(--paper) 100%);
}
.pp-hero-inner{max-width:900px;}
.pp-eyebrow{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  letter-spacing:0.16em;
  text-transform:uppercase;
  color:var(--brass);
  display:flex; align-items:center; gap:12px;
  margin-bottom:28px;
}
.pp-eyebrow::before{
  content:"";
  width:34px; height:1px;
  background:var(--brass);
  display:inline-block;
}
.pp-h1{
  font-family:'Libre Caslon Display', serif;
  font-weight:400;
  font-size:clamp(40px, 6vw, 68px);
  line-height:1.05;
  letter-spacing:-0.01em;
  color:var(--ink);
  margin-bottom:28px;
}
.pp-hero p{
  max-width:620px;
  color:var(--charcoal);
  font-size:17px;
  margin-bottom:8px;
}
.pp-meta{
  margin-top:36px;
  display:flex; gap:36px; flex-wrap:wrap;
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  letter-spacing:0.06em;
  text-transform:uppercase;
  color:var(--slate);
}
.pp-meta strong{color:var(--ink); display:block; font-size:13px; margin-bottom:4px; letter-spacing:0.02em;}

/* Layout */
.pp-layout{
  display:grid;
  grid-template-columns:260px 1fr;
  max-width:1280px;
  margin:0 auto;
  padding:0 6vw;
}

.pp-rail{
  padding:64px 32px 64px 0;
  border-right:1px solid var(--line);
}
.pp-rail-title{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  letter-spacing:0.12em;
  text-transform:uppercase;
  color:var(--slate);
  margin-bottom:20px;
}
.pp-rail nav{position:sticky; top:24px; display:flex; flex-direction:column;}
.pp-rail a{
  text-decoration:none;
  color:var(--charcoal);
  font-size:14px;
  padding:10px 0;
  border-bottom:1px solid var(--line-soft);
  display:flex; align-items:baseline; gap:12px;
  transition:color .2s ease, padding-left .2s ease;
}
.pp-rail a:hover{color:var(--brass); padding-left:4px;}
.pp-rail a .pp-code{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  color:var(--brass);
  min-width:20px;
}

.pp-content{padding:64px 0 40px 56px;}

.pp-clause{
  padding-bottom:56px;
  margin-bottom:56px;
  border-bottom:1px solid var(--line);
}
.pp-clause:last-of-type{border-bottom:none;}

.pp-clause-head{
  display:flex;
  align-items:baseline;
  gap:20px;
  margin-bottom:22px;
}
.pp-clause-num{
  font-family:'IBM Plex Mono', monospace;
  font-size:13px;
  color:var(--brass);
  letter-spacing:0.08em;
  white-space:nowrap;
}
.pp-clause h2{
  font-family:'Libre Caslon Display', serif;
  font-weight:400;
  font-size:26px;
  color:var(--ink);
  letter-spacing:-0.01em;
}
.pp-clause p{
  color:var(--charcoal);
  margin-bottom:16px;
  max-width:680px;
}
.pp-clause ul{
  list-style:none;
  margin:20px 0 20px;
  max-width:680px;
  padding:0;
}
.pp-clause ul li{
  position:relative;
  padding-left:22px;
  margin-bottom:11px;
  color:var(--charcoal);
}
.pp-clause ul li::before{
  content:"—";
  position:absolute; left:0; top:0;
  color:var(--brass);
}
.pp-note{
  margin-top:24px;
  padding:18px 22px;
  background:var(--sand);
  border-left:2px solid var(--brass);
  font-size:14px;
  color:var(--charcoal);
  max-width:680px;
}

/* Contact plaque */
.pp-plaque{
  background:var(--ink);
  color:var(--paper);
  padding:64px 6vw;
  margin-top:16px;
}
.pp-plaque-inner{
  max-width:1280px; margin:0 auto;
  display:grid;
  grid-template-columns:260px 1fr;
}
.pp-plaque .pp-rail-title{color:var(--brass-light); border:none;}
.pp-plaque-body{padding-left:56px; border-left:1px solid rgba(250,248,243,0.14);}
.pp-plaque h2{
  font-family:'Libre Caslon Display', serif;
  font-weight:400;
  font-size:32px;
  margin-bottom:8px;
}
.pp-plaque .pp-sub{color:rgba(250,248,243,0.55); font-size:14px; margin-bottom:32px;}
.pp-plaque-grid{
  display:grid;
  grid-template-columns:repeat(3, minmax(0,1fr));
  gap:28px;
}
.pp-plaque-item .pp-label{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  letter-spacing:0.1em;
  text-transform:uppercase;
  color:var(--brass-light);
  margin-bottom:10px;
}
.pp-plaque-item a{
  text-decoration:none;
  font-size:16px;
  color:var(--paper);
}
.pp-plaque-item a:hover{color:var(--brass-light);}

/* Responsive */
@media (max-width: 860px){
  .pp-layout{grid-template-columns:1fr; padding:0 6vw;}
  .pp-rail{border-right:none; border-bottom:1px solid var(--line); padding:32px 0;}
  .pp-rail nav{position:static; flex-direction:row; flex-wrap:wrap; gap:8px 18px;}
  .pp-rail a{border-bottom:none; padding:4px 0;}
  .pp-content{padding:40px 0;}
  .pp-plaque-inner{grid-template-columns:1fr;}
  .pp-plaque-body{padding-left:0; border-left:none; margin-top:28px; padding-top:28px; border-top:1px solid rgba(250,248,243,0.14);}
  .pp-plaque-grid{grid-template-columns:1fr; gap:20px;}
}
`;

const sections = [
  { id: "s1", num: "01", title: "Information We Collect" },
  { id: "s2", num: "02", title: "How We Use Your Information" },
  { id: "s3", num: "03", title: "Information Sharing" },
  { id: "s4", num: "04", title: "Data Security" },
  { id: "s5", num: "05", title: "Marketing Communications" },
  { id: "s6", num: "06", title: "Cookies" },
  { id: "s7", num: "07", title: "Third-Party Links" },
  { id: "s8", num: "08", title: "Your Rights" },
  { id: "s9", num: "09", title: "Children's Privacy" },
  { id: "s10", num: "10", title: "Changes to this Policy" },
  { id: "s11", num: "11", title: "Contact Us" },
];

export default function PrivacyPolicy() {
  return (
    <div className="pp-page">
      <style>{styles}</style>

      <header className="pp-hero">
        <div className="pp-hero-inner">
          <div className="pp-eyebrow">Legal Document · Ref. 1502/PP</div>
          <h1 className="pp-h1">Privacy Policy</h1>
          <p>
            Welcome to 1502 Properties Limited ("1502 Properties," "we," "our,"
            or "us"). We are committed to protecting your privacy and ensuring
            that your personal information is handled securely and responsibly.
          </p>
          <div className="pp-meta">
            <div>
              <strong>Effective Date</strong>10 July 2026
            </div>
            <div>
              <strong>Entity</strong>1502 Properties Limited
            </div>
            <div>
              <strong>Jurisdiction</strong>Federal Republic of Nigeria
            </div>
          </div>
        </div>
      </header>

      <div className="pp-layout">
        <aside className="pp-rail">
          <div className="pp-rail-title">Contents</div>
          <nav>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                <span className="pp-code">{s.num}</span>
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="pp-content">
          <section className="pp-clause" id="s1">
            <div className="pp-clause-head">
              <span className="pp-clause-num">01</span>
              <h2>Information We Collect</h2>
            </div>
            <p>
              When you interact with our website, social media platforms, or
              submit an enquiry, we may collect the following information:
            </p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Property preferences</li>
              <li>Investment requirements</li>
              <li>Budget information</li>
              <li>Any additional information you voluntarily provide</li>
            </ul>
            <p>
              We may also collect technical information such as your IP address,
              browser type, device information, and website usage through
              cookies and analytics tools.
            </p>
          </section>

          <section className="pp-clause" id="s2">
            <div className="pp-clause-head">
              <span className="pp-clause-num">02</span>
              <h2>How We Use Your Information</h2>
            </div>
            <p>We use your information to:</p>
            <ul>
              <li>Respond to your enquiries</li>
              <li>Recommend suitable properties based on your requirements</li>
              <li>Arrange property inspections</li>
              <li>Provide property information and investment briefs</li>
              <li>Communicate with you regarding listings and services</li>
              <li>Improve our website and customer experience</li>
              <li>Comply with applicable legal and regulatory obligations</li>
            </ul>
          </section>

          <section className="pp-clause" id="s3">
            <div className="pp-clause-head">
              <span className="pp-clause-num">03</span>
              <h2>Information Sharing</h2>
            </div>
            <p>
              1502 Properties Limited does not sell or rent your personal
              information. Your information may only be shared:
            </p>
            <ul>
              <li>
                With property owners or authorized representatives where
                necessary to facilitate a transaction
              </li>
              <li>
                With trusted service providers assisting us in operating our
                business
              </li>
              <li>Where required by law or regulatory authorities</li>
            </ul>
            <div className="pp-note">
              All third parties are expected to maintain appropriate
              confidentiality and security standards.
            </div>
          </section>

          <section className="pp-clause" id="s4">
            <div className="pp-clause-head">
              <span className="pp-clause-num">04</span>
              <h2>Data Security</h2>
            </div>
            <p>
              We implement reasonable administrative, technical, and
              organizational measures to safeguard your personal information
              against unauthorized access, loss, misuse, or disclosure.
            </p>
            <p>
              While we strive to protect your information, no method of internet
              transmission or electronic storage is completely secure.
            </p>
          </section>

          <section className="pp-clause" id="s5">
            <div className="pp-clause-head">
              <span className="pp-clause-num">05</span>
              <h2>Marketing Communications</h2>
            </div>
            <p>With your consent, we may send you:</p>
            <ul>
              <li>New property listings</li>
              <li>Investment opportunities</li>
              <li>Market updates</li>
              <li>Company announcements</li>
              <li>Promotional offers</li>
            </ul>
            <p>
              You may unsubscribe from these communications at any time by
              contacting us or following the unsubscribe instructions included
              in our communications.
            </p>
          </section>

          <section className="pp-clause" id="s6">
            <div className="pp-clause-head">
              <span className="pp-clause-num">06</span>
              <h2>Cookies</h2>
            </div>
            <p>
              Our website may use cookies and similar technologies to improve
              functionality, analyze website traffic, and enhance your browsing
              experience.
            </p>
            <p>
              You may choose to disable cookies through your browser settings;
              however, some website features may not function properly.
            </p>
          </section>

          <section className="pp-clause" id="s7">
            <div className="pp-clause-head">
              <span className="pp-clause-num">07</span>
              <h2>Third-Party Links</h2>
            </div>
            <p>
              Our website may contain links to external websites. We are not
              responsible for the privacy practices or content of those
              third-party websites.
            </p>
          </section>

          <section className="pp-clause" id="s8">
            <div className="pp-clause-head">
              <span className="pp-clause-num">08</span>
              <h2>Your Rights</h2>
            </div>
            <p>Depending on applicable laws, you may have the right to:</p>
            <ul>
              <li>Request access to your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data where permitted</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Request information about how your data is processed</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the details
              below.
            </p>
          </section>

          <section className="pp-clause" id="s9">
            <div className="pp-clause-head">
              <span className="pp-clause-num">09</span>
              <h2>Children's Privacy</h2>
            </div>
            <p>
              Our services are intended for individuals aged 18 years and above.
              We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="pp-clause" id="s10">
            <div className="pp-clause-head">
              <span className="pp-clause-num">10</span>
              <h2>Changes to this Privacy Policy</h2>
            </div>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be published on this page together with the updated effective
              date.
            </p>
          </section>

          <section className="pp-clause" id="s11">
            <div className="pp-clause-head">
              <span className="pp-clause-num">11</span>
              <h2>Contact Us</h2>
            </div>
            <p>
              If you have any questions regarding this Privacy Policy or how we
              handle your personal information, please contact us using the
              details below.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

// import React from "react";

// const styles = `
// .pp-page{
//   --ink:#14181a;
//   --charcoal:#23281f;
//   --sand:#efe9dc;
//   --paper:#faf8f3;
//   --brass:#a9824c;
//   --brass-light:#c9a06a;
//   --slate:#6b6f63;
//   --line: rgba(20,24,26,0.14);
//   --line-soft: rgba(20,24,26,0.08);

//   background:var(--paper);
//   color:var(--ink);
//   font-family:'Inter', sans-serif;
//   font-size:16px;
//   line-height:1.65;
//   -webkit-font-smoothing:antialiased;
// }
// .pp-page *{box-sizing:border-box;}
// .pp-page a{color:inherit;}

// /* Top bar */
// .pp-topbar{
//   position:sticky; top:0; z-index:40;
//   background:var(--paper);
//   border-bottom:1px solid var(--line);
//   display:flex; align-items:center; justify-content:space-between;
//   padding:20px 6vw;
// }
// .pp-word{
//   font-family:'Libre Caslon Display', serif;
//   font-size:18px;
//   letter-spacing:0.02em;
// }
// .pp-word span{color:var(--brass);}
// .pp-back{
//   font-family:'IBM Plex Mono', monospace;
//   font-size:11px;
//   letter-spacing:0.1em;
//   text-transform:uppercase;
//   text-decoration:none;
//   border:1px solid var(--line);
//   padding:9px 16px;
//   color:var(--charcoal);
//   transition:background .2s ease, color .2s ease, border-color .2s ease;
// }
// .pp-back:hover{background:var(--ink); color:var(--paper); border-color:var(--ink);}

// /* Hero */
// .pp-hero{
//   padding:96px 6vw 64px;
//   border-bottom:1px solid var(--line);
//   background:linear-gradient(180deg, var(--sand) 0%, var(--paper) 100%);
// }
// .pp-hero-inner{max-width:900px;}
// .pp-eyebrow{
//   font-family:'IBM Plex Mono', monospace;
//   font-size:12px;
//   letter-spacing:0.16em;
//   text-transform:uppercase;
//   color:var(--brass);
//   display:flex; align-items:center; gap:12px;
//   margin-bottom:28px;
// }
// .pp-eyebrow::before{
//   content:"";
//   width:34px; height:1px;
//   background:var(--brass);
//   display:inline-block;
// }
// .pp-h1{
//   font-family:'Libre Caslon Display', serif;
//   font-weight:400;
//   font-size:clamp(40px, 6vw, 68px);
//   line-height:1.05;
//   letter-spacing:-0.01em;
//   color:var(--ink);
//   margin-bottom:28px;
// }
// .pp-hero p{
//   max-width:620px;
//   color:var(--charcoal);
//   font-size:17px;
//   margin-bottom:8px;
// }
// .pp-meta{
//   margin-top:36px;
//   display:flex; gap:36px; flex-wrap:wrap;
//   font-family:'IBM Plex Mono', monospace;
//   font-size:12px;
//   letter-spacing:0.06em;
//   text-transform:uppercase;
//   color:var(--slate);
// }
// .pp-meta strong{color:var(--ink); display:block; font-size:13px; margin-bottom:4px; letter-spacing:0.02em;}

// /* Layout */
// .pp-layout{
//   display:grid;
//   grid-template-columns:260px 1fr;
//   max-width:1280px;
//   margin:0 auto;
//   padding:0 6vw;
// }

// .pp-rail{
//   padding:64px 32px 64px 0;
//   border-right:1px solid var(--line);
// }
// .pp-rail-title{
//   font-family:'IBM Plex Mono', monospace;
//   font-size:11px;
//   letter-spacing:0.12em;
//   text-transform:uppercase;
//   color:var(--slate);
//   margin-bottom:20px;
// }
// .pp-rail nav{position:sticky; top:96px; display:flex; flex-direction:column;}
// .pp-rail a{
//   text-decoration:none;
//   color:var(--charcoal);
//   font-size:14px;
//   padding:10px 0;
//   border-bottom:1px solid var(--line-soft);
//   display:flex; align-items:baseline; gap:12px;
//   transition:color .2s ease, padding-left .2s ease;
// }
// .pp-rail a:hover{color:var(--brass); padding-left:4px;}
// .pp-rail a .pp-code{
//   font-family:'IBM Plex Mono', monospace;
//   font-size:11px;
//   color:var(--brass);
//   min-width:20px;
// }

// .pp-content{padding:64px 0 40px 56px;}

// .pp-clause{
//   padding-bottom:56px;
//   margin-bottom:56px;
//   border-bottom:1px solid var(--line);
// }
// .pp-clause:last-of-type{border-bottom:none;}

// .pp-clause-head{
//   display:flex;
//   align-items:baseline;
//   gap:20px;
//   margin-bottom:22px;
// }
// .pp-clause-num{
//   font-family:'IBM Plex Mono', monospace;
//   font-size:13px;
//   color:var(--brass);
//   letter-spacing:0.08em;
//   white-space:nowrap;
// }
// .pp-clause h2{
//   font-family:'Libre Caslon Display', serif;
//   font-weight:400;
//   font-size:26px;
//   color:var(--ink);
//   letter-spacing:-0.01em;
// }
// .pp-clause p{
//   color:var(--charcoal);
//   margin-bottom:16px;
//   max-width:680px;
// }
// .pp-clause ul{
//   list-style:none;
//   margin:20px 0 20px;
//   max-width:680px;
//   padding:0;
// }
// .pp-clause ul li{
//   position:relative;
//   padding-left:22px;
//   margin-bottom:11px;
//   color:var(--charcoal);
// }
// .pp-clause ul li::before{
//   content:"—";
//   position:absolute; left:0; top:0;
//   color:var(--brass);
// }
// .pp-note{
//   margin-top:24px;
//   padding:18px 22px;
//   background:var(--sand);
//   border-left:2px solid var(--brass);
//   font-size:14px;
//   color:var(--charcoal);
//   max-width:680px;
// }

// /* Contact plaque */
// .pp-plaque{
//   background:var(--ink);
//   color:var(--paper);
//   padding:64px 6vw;
//   margin-top:16px;
// }
// .pp-plaque-inner{
//   max-width:1280px; margin:0 auto;
//   display:grid;
//   grid-template-columns:260px 1fr;
// }
// .pp-plaque .pp-rail-title{color:var(--brass-light); border:none;}
// .pp-plaque-body{padding-left:56px; border-left:1px solid rgba(250,248,243,0.14);}
// .pp-plaque h2{
//   font-family:'Libre Caslon Display', serif;
//   font-weight:400;
//   font-size:32px;
//   margin-bottom:8px;
// }
// .pp-plaque .pp-sub{color:rgba(250,248,243,0.55); font-size:14px; margin-bottom:32px;}
// .pp-plaque-grid{
//   display:grid;
//   grid-template-columns:repeat(3, minmax(0,1fr));
//   gap:28px;
// }
// .pp-plaque-item .pp-label{
//   font-family:'IBM Plex Mono', monospace;
//   font-size:11px;
//   letter-spacing:0.1em;
//   text-transform:uppercase;
//   color:var(--brass-light);
//   margin-bottom:10px;
// }
// .pp-plaque-item a{
//   text-decoration:none;
//   font-size:16px;
//   color:var(--paper);
// }
// .pp-plaque-item a:hover{color:var(--brass-light);}

// .pp-footer{
//   padding:28px 6vw;
//   display:flex; justify-content:space-between; align-items:center;
//   font-family:'IBM Plex Mono', monospace;
//   font-size:11px;
//   letter-spacing:0.06em;
//   text-transform:uppercase;
//   color:var(--slate);
//   border-top:1px solid var(--line);
// }

// /* Responsive */
// @media (max-width: 860px){
//   .pp-layout{grid-template-columns:1fr; padding:0 6vw;}
//   .pp-rail{border-right:none; border-bottom:1px solid var(--line); padding:32px 0;}
//   .pp-rail nav{position:static; flex-direction:row; flex-wrap:wrap; gap:8px 18px;}
//   .pp-rail a{border-bottom:none; padding:4px 0;}
//   .pp-content{padding:40px 0;}
//   .pp-plaque-inner{grid-template-columns:1fr;}
//   .pp-plaque-body{padding-left:0; border-left:none; margin-top:28px; padding-top:28px; border-top:1px solid rgba(250,248,243,0.14);}
//   .pp-plaque-grid{grid-template-columns:1fr; gap:20px;}
//   .pp-footer{flex-direction:column; gap:8px; align-items:flex-start;}
// }
// `;

// const sections = [
//   { id: "s1", num: "01", title: "Information We Collect" },
//   { id: "s2", num: "02", title: "How We Use Your Information" },
//   { id: "s3", num: "03", title: "Information Sharing" },
//   { id: "s4", num: "04", title: "Data Security" },
//   { id: "s5", num: "05", title: "Marketing Communications" },
//   { id: "s6", num: "06", title: "Cookies" },
//   { id: "s7", num: "07", title: "Third-Party Links" },
//   { id: "s8", num: "08", title: "Your Rights" },
//   { id: "s9", num: "09", title: "Children's Privacy" },
//   { id: "s10", num: "10", title: "Changes to this Policy" },
//   { id: "s11", num: "11", title: "Contact Us" },
// ];

// export default function PrivacyPolicy({ homeHref = "/" }) {
//   return (
//     <div className="pp-page">
//       <style>{styles}</style>

//       <div className="pp-topbar">
//         <div className="pp-word">
//           1502 <span>PROPERTIES</span>
//         </div>
//         <a className="pp-back" href={homeHref}>
//           ← Back to site
//         </a>
//       </div>

//       <header className="pp-hero">
//         <div className="pp-hero-inner">
//           <div className="pp-eyebrow">Legal Document · Ref. 1502/PP</div>
//           <h1 className="pp-h1">Privacy Policy</h1>
//           <p>
//             Welcome to 1502 Properties Limited ("1502 Properties," "we," "our,"
//             or "us"). We are committed to protecting your privacy and ensuring
//             that your personal information is handled securely and responsibly.
//           </p>
//           <div className="pp-meta">
//             <div>
//               <strong>Effective Date</strong>10 July 2026
//             </div>
//             <div>
//               <strong>Entity</strong>1502 Properties Limited
//             </div>
//             <div>
//               <strong>Jurisdiction</strong>Federal Republic of Nigeria
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="pp-layout">
//         <aside className="pp-rail">
//           <div className="pp-rail-title">Contents</div>
//           <nav>
//             {sections.map((s) => (
//               <a key={s.id} href={`#${s.id}`}>
//                 <span className="pp-code">{s.num}</span>
//                 {s.title}
//               </a>
//             ))}
//           </nav>
//         </aside>

//         <main className="pp-content">
//           <section className="pp-clause" id="s1">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">01</span>
//               <h2>Information We Collect</h2>
//             </div>
//             <p>
//               When you interact with our website, social media platforms, or
//               submit an enquiry, we may collect the following information:
//             </p>
//             <ul>
//               <li>Full name</li>
//               <li>Email address</li>
//               <li>Phone number</li>
//               <li>Property preferences</li>
//               <li>Investment requirements</li>
//               <li>Budget information</li>
//               <li>Any additional information you voluntarily provide</li>
//             </ul>
//             <p>
//               We may also collect technical information such as your IP address,
//               browser type, device information, and website usage through
//               cookies and analytics tools.
//             </p>
//           </section>

//           <section className="pp-clause" id="s2">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">02</span>
//               <h2>How We Use Your Information</h2>
//             </div>
//             <p>We use your information to:</p>
//             <ul>
//               <li>Respond to your enquiries</li>
//               <li>Recommend suitable properties based on your requirements</li>
//               <li>Arrange property inspections</li>
//               <li>Provide property information and investment briefs</li>
//               <li>Communicate with you regarding listings and services</li>
//               <li>Improve our website and customer experience</li>
//               <li>Comply with applicable legal and regulatory obligations</li>
//             </ul>
//           </section>

//           <section className="pp-clause" id="s3">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">03</span>
//               <h2>Information Sharing</h2>
//             </div>
//             <p>
//               1502 Properties Limited does not sell or rent your personal
//               information. Your information may only be shared:
//             </p>
//             <ul>
//               <li>
//                 With property owners or authorized representatives where
//                 necessary to facilitate a transaction
//               </li>
//               <li>
//                 With trusted service providers assisting us in operating our
//                 business
//               </li>
//               <li>Where required by law or regulatory authorities</li>
//             </ul>
//             <div className="pp-note">
//               All third parties are expected to maintain appropriate
//               confidentiality and security standards.
//             </div>
//           </section>

//           <section className="pp-clause" id="s4">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">04</span>
//               <h2>Data Security</h2>
//             </div>
//             <p>
//               We implement reasonable administrative, technical, and
//               organizational measures to safeguard your personal information
//               against unauthorized access, loss, misuse, or disclosure.
//             </p>
//             <p>
//               While we strive to protect your information, no method of internet
//               transmission or electronic storage is completely secure.
//             </p>
//           </section>

//           <section className="pp-clause" id="s5">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">05</span>
//               <h2>Marketing Communications</h2>
//             </div>
//             <p>With your consent, we may send you:</p>
//             <ul>
//               <li>New property listings</li>
//               <li>Investment opportunities</li>
//               <li>Market updates</li>
//               <li>Company announcements</li>
//               <li>Promotional offers</li>
//             </ul>
//             <p>
//               You may unsubscribe from these communications at any time by
//               contacting us or following the unsubscribe instructions included
//               in our communications.
//             </p>
//           </section>

//           <section className="pp-clause" id="s6">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">06</span>
//               <h2>Cookies</h2>
//             </div>
//             <p>
//               Our website may use cookies and similar technologies to improve
//               functionality, analyze website traffic, and enhance your browsing
//               experience.
//             </p>
//             <p>
//               You may choose to disable cookies through your browser settings;
//               however, some website features may not function properly.
//             </p>
//           </section>

//           <section className="pp-clause" id="s7">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">07</span>
//               <h2>Third-Party Links</h2>
//             </div>
//             <p>
//               Our website may contain links to external websites. We are not
//               responsible for the privacy practices or content of those
//               third-party websites.
//             </p>
//           </section>

//           <section className="pp-clause" id="s8">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">08</span>
//               <h2>Your Rights</h2>
//             </div>
//             <p>Depending on applicable laws, you may have the right to:</p>
//             <ul>
//               <li>Request access to your personal information</li>
//               <li>Correct inaccurate information</li>
//               <li>Request deletion of your data where permitted</li>
//               <li>Withdraw consent for marketing communications</li>
//               <li>Request information about how your data is processed</li>
//             </ul>
//             <p>
//               To exercise these rights, please contact us using the details
//               below.
//             </p>
//           </section>

//           <section className="pp-clause" id="s9">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">09</span>
//               <h2>Children's Privacy</h2>
//             </div>
//             <p>
//               Our services are intended for individuals aged 18 years and above.
//               We do not knowingly collect personal information from children.
//             </p>
//           </section>

//           <section className="pp-clause" id="s10">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">10</span>
//               <h2>Changes to this Privacy Policy</h2>
//             </div>
//             <p>
//               We may update this Privacy Policy from time to time. Any changes
//               will be published on this page together with the updated effective
//               date.
//             </p>
//           </section>

//           <section className="pp-clause" id="s11">
//             <div className="pp-clause-head">
//               <span className="pp-clause-num">11</span>
//               <h2>Contact Us</h2>
//             </div>
//             <p>
//               If you have any questions regarding this Privacy Policy or how we
//               handle your personal information, please contact us using the
//               details below.
//             </p>
//           </section>
//         </main>
//       </div>

//       <div className="pp-plaque">
//         <div className="pp-plaque-inner">
//           <div className="pp-rail-title">1502 / Deed of Contact</div>
//           <div className="pp-plaque-body">
//             <h2>1502 Properties Limited</h2>
//             <div className="pp-sub">
//               For enquiries regarding this Privacy Policy, reach us directly.
//             </div>
//             <div className="pp-plaque-grid">
//               <div className="pp-plaque-item">
//                 <div className="pp-label">Website</div>
//                 <a
//                   href="https://www.1502properties.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   www.1502properties.com
//                 </a>
//               </div>
//               <div className="pp-plaque-item">
//                 <div className="pp-label">Email</div>
//                 <a href="mailto:info@1502properties.com">
//                   info@1502properties.com
//                 </a>
//               </div>
//               <div className="pp-plaque-item">
//                 <div className="pp-label">Phone</div>
//                 <a href="tel:+2348096068042">0809 606 8042</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <footer className="pp-footer">
//         <span>© 2026 1502 Properties Limited. All rights reserved.</span>
//         <span>Document Ref. 1502/PP — Effective 10 July 2026</span>
//       </footer>
//     </div>
//   );
// }
